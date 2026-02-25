import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';
import { z } from 'zod';
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const dynamic = "force-dynamic";

// Rate limiting setup (5 requests per 15 minutes per IP)
const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});
const ratelimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(5, "15 m"),
    analytics: true,
});

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
        if (process.env.UPSTASH_REDIS_REST_URL) {
            const { success, pending, limit, reset, remaining } = await ratelimit.limit(ip);
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

        // Turnstile Token Verification
        const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
        if (turnstileSecret && turnstileSecret !== "") {
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
                event_name: 'AI Workshop Engine Challenge'
            }
        ]);

        if (error) {
            console.error("Supabase Insertion Error:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        console.log("LIVE BACKEND: Successfully registered new lead into Supabase:", email);

        // Attempt to send email alert
        if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);
                await resend.emails.send({
                    from: 'Workshop Engine <onboarding@resend.dev>',
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
                });
                console.log("Email alert dispatched to", process.env.ADMIN_EMAIL);
            } catch (emailErr) {
                console.error("Failed to send email alert:", emailErr);
            }
        } else {
            console.log("Resend API Key or Admin Email not configured, skipping email alert.");
        }

        return NextResponse.json({ success: true, message: "Lead captured successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 });
    }
}
