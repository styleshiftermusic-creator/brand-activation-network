import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

// Initialize Stripe Client
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16" as any,
});

// Initialize Supabase Admin Client (Bypasses RLS to forcefully provision accounts)
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);

export async function POST(req: Request) {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: any) {
        console.error(`Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
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
            const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(customerEmail, {
                data: { name: customerName || "Architect" },
                redirectTo: "https://brandactivationnetwork.com/dashboard",
            });

            if (error) {
                console.error("Error provisioning user via Supabase Admin:", error);
                return NextResponse.json({ success: false, message: 'Provider Error' }, { status: 500 });
            } else {
                console.log("Successfully provisioned and sent invite to:", customerEmail);
            }
        }
    }

    // Acknowledge receipt to Stripe to avoid retries
    return NextResponse.json({ received: true });
}
