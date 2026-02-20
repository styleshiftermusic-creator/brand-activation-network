import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { Resend } from 'resend';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.email || !body.name) {
            return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
        }

        const { error } = await supabase.from('webinar_registrations').insert([
            {
                full_name: body.name,
                email: body.email,
                event_name: 'AI Workshop Engine Challenge'
            }
        ]);

        if (error) {
            console.error("Supabase Insertion Error:", error);
            return NextResponse.json({ success: false, error: error.message }, { status: 500 });
        }

        console.log("LIVE BACKEND: Successfully registered new lead into Supabase:", body.email);

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
                            <p><strong>Name:</strong> ${body.name}</p>
                            <p><strong>Email:</strong> ${body.email}</p>
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
        return NextResponse.json({ success: false, error: "Failed to process request" }, { status: 500 });
    }
}
