import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from 'resend';

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        console.error("Missing critical environment variables for Stripe Webhook Automation.");
        return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    // Initialize Clients dynamically at runtime to prevent Next.js build-time static generation failures
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        apiVersion: "2023-10-16" as any,
    });

    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        }
    );

    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err: unknown) {
        const error = err as Error;
        console.error(`Webhook signature verification failed: ${error.message}`);
        return NextResponse.json({ error: `Webhook Error: ${error.message}` }, { status: 400 });
    }

    // Process the completed checkout
    if (event.type === "checkout.session.completed") {
        const session = event.data.object as Stripe.Checkout.Session;

        const customerEmail = session.customer_details?.email;
        const customerName = session.customer_details?.name;

        if (customerEmail) {
            console.log(`Processing successful checkout for ${customerEmail}`);

            // Generate a secure invite via Supabase. 
            // This creates the user account and sends them an automatic email to log in and set their password.
            const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(customerEmail, {
                data: { name: customerName || "Architect" },
                redirectTo: "https://brandactivationnetwork.com/dashboard",
            });

            if (error) {
                console.error("Error provisioning user via Supabase Admin:", error);
                return NextResponse.json({ success: false, message: 'Provider Error', details: error.message }, { status: 500 });
            } else {
                console.log("Successfully provisioned and sent invite to:", customerEmail);
            }

            // --- ADMIN NOTIFICATION ---
            if (process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL) {
                try {
                    const resend = new Resend(process.env.RESEND_API_KEY);
                    await resend.emails.send({
                        from: 'The Master Blueprint <onboarding@brandactivationnetwork.com>', // Needs custom domain to be fully reliable if sending to non-owner
                        to: process.env.ADMIN_EMAIL,
                        subject: '💰 New Course Purchase!',
                        html: `
                            <div style="font-family: sans-serif; padding: 20px;">
                                <h2>A new user has purchased the course!</h2>
                                <p><strong>Name:</strong> ${customerName || 'N/A'}</p>
                                <p><strong>Email:</strong> ${customerEmail}</p>
                                <p><em>They have been provisioned in Supabase and sent a login invite.</em></p>
                            </div>
                        `
                    });
                    console.log("Admin purchase notification sent.");
                } catch (emailErr) {
                    console.error("Failed to send admin purchase notification:", emailErr);
                }
            } else {
                console.warn("RESEND_API_KEY or ADMIN_EMAIL missing. Admin notification skipped.");
            }
        }
    }

    // Acknowledge receipt to Stripe to avoid retries
    return NextResponse.json({ received: true });
}
