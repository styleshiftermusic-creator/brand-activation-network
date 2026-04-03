import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const dynamic = "force-dynamic";

// Rate limiting setup (5 requests per 15 minutes per IP)
// Rate limiting setup (5 requests per 15 minutes per IP)
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Only initialize if the environment variables are present, otherwise stay null to prevent build-time errors
const redis = redisUrl && redisToken ? new Redis({
    url: redisUrl,
    token: redisToken,
}) : null;

const ratelimit = redis ? new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
}) : null;

// Zod Schema
const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
    turnstileToken: z.string().min(1, "Bot protection token missing"),
});

export async function POST(req: Request) {
    try {
        // IP Rate Limiting
        const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
        if (ratelimit) {
            const { success } = await ratelimit!.limit(ip);
            if (!success) {
                console.warn(`Rate limit exceeded for IP: ${ip}`);
                return NextResponse.json({ success: false, error: "Too many requests. Please try again later." }, { status: 429 });
            }
        }

        const body = await req.json();
        const parsed = registerSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
        }

        const { name, email, phone, turnstileToken } = parsed.data;

        // Turnstile Token Verification (skip if widget failed on frontend)
        const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
        if (turnstileSecret && turnstileSecret !== "" && turnstileToken !== "TURNSTILE_BYPASSED") {
            const formData = new URLSearchParams();
            formData.append('secret', turnstileSecret);
            formData.append('response', turnstileToken);
            if (ip) formData.append('remoteip', ip);

            const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
                body: formData,
                method: 'POST',
            });
            const outcome = await result.json();
            if (!outcome.success) {
                console.error('Turnstile verification failed:', outcome);
                return NextResponse.json({ success: false, error: "Bot protection verification failed." }, { status: 403 });
            }
        }

        const { error } = await supabase.from('webinar_registrations').insert([
            {
                full_name: name,
                email: email,
                phone: phone || null,
                event_name: 'AI Workshop Engine Challenge'
            }
        ]);

        if (error) {
            console.error("Supabase Insertion Error:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        console.log("LIVE BACKEND: Successfully registered new lead into Supabase:", email);

        // Attempt to send emails
        if (process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);

                const emailPromises = [];

                // 1. Admin Alert
                if (process.env.ADMIN_EMAIL) {
                    emailPromises.push(
                        resend.emails.send({
                            from: 'The Master Blueprint <onboarding@brandactivationnetwork.com>',
                            to: process.env.ADMIN_EMAIL,
                            subject: '🚨 New Workshop Registration!',
                            html: `
                                <div style="font-family: sans-serif; padding: 20px;">
                                    <h2>New Challenge Registration</h2>
                                    <p><strong>Name:</strong> ${name}</p>
                                    <p><strong>Email:</strong> ${email}</p>
                                    <p><em>This lead has been successfully added to your Supabase Database.</em></p>
                                </div>
                            `
                        })
                    );
                }

                // 2. User Welcome Email
                emailPromises.push(
                    resend.emails.send({
                        from: 'The Master Blueprint <onboarding@brandactivationnetwork.com>',
                        to: email,
                        subject: 'Your Spot is Secured: The AI Workshop Engine Challenge',
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
                                <h2>Registration Confirmed.</h2>
                                <p>Hey ${name.split(' ')[0] || 'there'},</p>
                                <p>Your spot for the next <strong>AI Workshop Engine Challenge</strong> is officially secured.</p>
                                <p>In this live event, we'll cover the exact systems, AI agents, and automations required to scale an agency horizontally without infinitely expanding payroll.</p>
                                <h3>Next Steps:</h3>
                                <ol>
                                    <li><strong>Join the Community:</strong> <a href="#" style="color: #6366f1;">Click here</a> to join our private cohort group.</li>
                                    <li><strong>Mark Your Calendar:</strong> Our next kickoff begins this Tuesday. Make sure you are present.</li>
                                </ol>
                                <p>Talk soon,</p>
                                <p>The Brand Activation Network Team</p>
                            </div>
                        `
                    })
                );

                await Promise.all(emailPromises);
                console.log("Welcome email and admin alert dispatched successfully.");
            } catch (emailErr) {
                console.error("Failed to send welcome email / alert:", emailErr);
            }
        } else {
            console.log("Resend API Key not configured, skipping email dispatch.");
        }

        return NextResponse.json({ success: true, message: "Lead captured successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ success: false, error: "Something went wrong. Please try again." }, { status: 500 });
    }
}
