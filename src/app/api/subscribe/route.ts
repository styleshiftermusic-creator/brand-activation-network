import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const dynamic = "force-dynamic";

function getSupabaseAdmin() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );
}

// Rate limiting setup
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = redisUrl && redisToken ? new Redis({
    url: redisUrl,
    token: redisToken,
}) : null;

const ratelimit = redis ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
}) : null;

const subscribeSchema = z.object({
    email: z.string().email("Invalid email address"),
    name: z.string().optional(),
    phone: z.string().optional(),
    revenue: z.string().optional(),
    referredBy: z.string().optional().nullable(),
});

export async function POST(req: Request) {
    try {
        const supabase = getSupabaseAdmin();

        // IP Rate Limiting (degrades gracefully if Redis is unavailable)
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        if (ratelimit) {
            try {
                const { success } = await ratelimit.limit(ip);
                if (!success) {
                    console.warn(`Rate limit exceeded for IP: ${ip}`);
                    return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
                }
            } catch (rateLimitErr) {
                console.warn("Rate limiter unavailable, skipping:", rateLimitErr);
            }
        }

        const body = await req.json();
        const parsed = subscribeSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
        }

        const { email, name, phone, revenue, referredBy } = parsed.data;

        // Save Lead to Supabase
        const { error } = await supabase.from('webinar_registrations').insert([
            {
                full_name: name || 'Lead Magnet Download',
                email: email,
                phone: phone || null,
                event_name: 'BAN Waitlist / Download',
                metadata: { revenue_bracket: revenue || 'unspecified' } // Using JSONB metadata column for flexibility
            }
        ]);

        if (error) {
            console.error("Supabase Insertion Error:", error);
            return NextResponse.json({ success: false, error: "Registration failed. Please try again." }, { status: 500 });
        }

        console.log("LIVE BACKEND: Successfully registered new lead magnet download:", email);

        // Track Referral if present
        if (referredBy && !error) {
            const { error: referralError } = await supabase.from('user_activity').insert({
                user_id: referredBy,
                activity_type: 'REFERRAL_SIGNUP',
                metadata: { referred_email: email, referred_name: name || '', revenue_bracket: revenue || 'unspecified' }
            });
            if (referralError) {
                console.error("Failed to track referral:", referralError);
            }
        }

        // Attempt to send emails
        if (process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);
                const emailPromises = [];

                // Lead Scoring for Subject Line
                let leadScore = "New Lead";
                if (revenue === "50k+") leadScore = "🔥 HIGH VALUE LEAD";
                else if (revenue === "10k-50k") leadScore = "⭐ Qualified Lead";

                // 1. Admin Alert
                if (process.env.ADMIN_EMAIL) {
                    emailPromises.push(
                        resend.emails.send({
                            from: 'The Master Blueprint <onboarding@brandactivationnetwork.com>',
                            to: process.env.ADMIN_EMAIL,
                            subject: `${leadScore}: ${name || email}`,
                            html: `
                                <div style="font-family: sans-serif; padding: 20px; color: #111;">
                                    <h2 style="color: #6366f1;">New Master Blueprint Applicant</h2>
                                    <p><strong>Name:</strong> ${name || 'N/A'}</p>
                                    <p><strong>Email:</strong> ${email}</p>
                                    <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
                                    <p><strong>Monthly Revenue:</strong> <span style="background: #f3f4f6; padding: 2px 8px; border-radius: 4px; font-weight: bold;">${revenue || 'Not Provided'}</span></p>
                                    <hr style="border: 1px solid #eee; margin: 20px 0;" />
                                    <p style="font-size: 12px; color: #666;">This lead has been saved to your Supabase <code>webinar_registrations</code> table.</p>
                                </div>
                            `
                        })
                    );
                }

                // 2. User Playbook Delivery
                // We construct the absolute URL for the playbook download link.
                // Assuming domain is brandactivationnetwork.com
                const origin = req.headers.get('origin') || 'https://brandactivationnetwork.com';
                const playbookUrl = `${origin}/api/download/playbook`;

                emailPromises.push(
                    resend.emails.send({
                        from: 'The Master Blueprint <onboarding@brandactivationnetwork.com>',
                        to: email,
                        subject: 'Your BAN Credit Sweep Blueprint is Here',
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
                                <h2>Your Blueprint Has Arrived.</h2>
                                <p>Hey there,</p>
                                <p>You requested the <strong>BAN Credit Sweep Blueprint</strong>. Inside you'll find two complete methods to remove unauthorized hard inquiries from your credit report — in as little as 24 hours.</p>
                                <p><strong>What's inside:</strong></p>
                                <ul>
                                    <li>Method 1: 24-Hour Phone Script (Experian, Equifax, TransUnion Fraud Depts)</li>
                                    <li>Method 2: 7-Day 609 Letter via Data Breach/Identity Theft framework</li>
                                    <li>Combined Quick-Action Checklist</li>
                                </ul>
                                <div style="margin: 30px 0;">
                                    <a href="${playbookUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                        View Your Blueprint →
                                    </a>
                                </div>
                                <p>If the button above doesn't work, copy and paste this link:</p>
                                <p><a href="${playbookUrl}">${playbookUrl}</a></p>
                                <p>More tools are coming. Stay tuned.</p>
                                <p>Talk soon,<br>The Brand Activation Network Team</p>
                            </div>
                        `
                    })
                );

                const results = await Promise.all(emailPromises);
                console.log("Lead magnet emails sent successfully.");
                results.forEach((r, i) => {
                    if (r.error) {
                        console.error(`Resend email ${i} failed:`, r.error.name, r.error.message);
                    } else {
                        console.log(`Resend email ${i} sent, id:`, r.data?.id);
                    }
                });
            } catch (emailError: unknown) {
                const msg = emailError instanceof Error ? emailError.message : String(emailError);
                console.error("Error sending lead magnet emails:", msg, emailError);
                // Do not fail the request if emails fail
            }
        } else {
            console.warn("RESEND_API_KEY is not set. Emails were not sent.");
        }

        return NextResponse.json({ success: true });

    } catch (err: unknown) {
        console.error("Internal Server Error:", err);
        return NextResponse.json({ success: false, error: "Something went wrong." }, { status: 500 });
    }
}
