import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const dynamic = "force-dynamic";

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
        const parsed = subscribeSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
        }

        const { email } = parsed.data;

        // Save Lead to Supabase (Reusing the webinar_registrations table for leads)
        const { error } = await supabase.from('webinar_registrations').insert([
            {
                full_name: 'Lead Magnet Download',
                email: email,
                event_name: 'OPA Playbook Download'
            }
        ]);

        if (error) {
            console.error("Supabase Insertion Error:", error);
            // Even if Supabase fails (e.g. duplicate email), we can proceed to send the email if desired,
            // or return error. Usually for lead magnets, we want to deliver it even if they already exist.
        }

        console.log("LIVE BACKEND: Successfully registered new lead magnet download:", email);

        // Attempt to send emails
        if (process.env.RESEND_API_KEY) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);

                const emailPromises = [];

                // 1. Admin Alert
                if (process.env.ADMIN_EMAIL) {
                    emailPromises.push(
                        resend.emails.send({
                            from: 'Workshop Engine <onboarding@resend.dev>',
                            to: process.env.ADMIN_EMAIL,
                            subject: '🎉 New Lead Magnet Download!',
                            html: `
                                <div style="font-family: sans-serif; padding: 20px;">
                                    <h2>New OPA Playbook Lead</h2>
                                    <p><strong>Email:</strong> ${email}</p>
                                </div>
                            `
                        })
                    );
                }

                // 2. User Playbook Delivery
                // We construct the absolute URL for the playbook download link.
                // Assuming domain is brandactivationnetwork.com
                const origin = req.headers.get('origin') || 'https://brandactivationnetwork.com';
                const playbookUrl = `${origin}/blueprints/opa-marketing-playbook.md`;

                emailPromises.push(
                    resend.emails.send({
                        from: 'Workshop Engine <onboarding@resend.dev>',
                        to: email,
                        subject: 'Here is your OPA Marketing Playbook',
                        html: `
                            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
                                <h2>Your Playbook has arrived.</h2>
                                <p>Hey there,</p>
                                <p>You requested the <strong>OPA Marketing Playbook</strong>. Inside you'll find the exact templates and workflows required to command other people's audiences.</p>
                                <div style="margin: 30px 0;">
                                    <a href="${playbookUrl}" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                        Download The Playbook
                                    </a>
                                </div>
                                <p>If the button above doesn't work, go here to view it:</p>
                                <p><a href="${playbookUrl}">${playbookUrl}</a></p>
                                <p>Talk soon,<br>The Brand Activation Network Team</p>
                            </div>
                        `
                    })
                );

                await Promise.all(emailPromises);
                console.log("Lead magnet emails sent successfully.");
            } catch (emailError) {
                console.error("Error sending lead magnet emails:", emailError);
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
