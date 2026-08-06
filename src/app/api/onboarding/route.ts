import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { createSupabaseServerClient } from "@/lib/supabase-server";

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

export async function POST(req: Request) {
    try {
        // 1. Enforce Authentication
        const supabaseUser = await createSupabaseServerClient();
        const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { revenue_bracket, primary_offer, biggest_bottleneck, userName } = body;
        
        // Lock key fields to session identity instead of body inputs
        const userId = user.id;
        const userEmail = user.email;

        // Upsert the profile
        const { error } = await supabase.from('profiles').upsert({
            id: userId,
            revenue_bracket: revenue_bracket || 'Unknown',
            primary_offer: primary_offer || 'Unknown',
            biggest_bottleneck: biggest_bottleneck || 'Unknown',
            onboarding_completed: true,
            updated_at: new Date().toISOString()
        });

        if (error) {
            console.error('Error saving onboarding profile:', error);
            // Protect details, do not return raw DB errors
            return NextResponse.json({ success: false, error: 'Failed to update profile.' }, { status: 500 });
        }

        // Send VIP Welcome Email
        if (process.env.RESEND_API_KEY && userEmail) {
            try {
                const resend = new Resend(process.env.RESEND_API_KEY);
                
                await resend.emails.send({
                    from: 'Brand Activation Network <onboarding@brandactivationnetwork.com>',
                    to: userEmail,
                    subject: 'Welcome to the Private Network. Your Next Steps.',
                    html: `
                        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
                            <h2 style="color: #10b981;">Access Granted.</h2>
                            <p>Hey ${userName || 'there'},</p>
                            <p>You have officially completed your onboarding for the <strong>Brand Activation Network</strong>.</p>
                            <p>We've logged your current bottlenecks and revenue bracket. The Master Blueprint is designed exactly to solve these constraints using leverage, capital, and automated systems.</p>
                            <p><strong>Your next immediate steps:</strong></p>
                            <ol>
                                <li>Head over to the Dashboard and open <strong>Module 1: The Pledge Loan Credit Hack</strong>.</li>
                                <li>Join the private community channels (link inside the dashboard).</li>
                                <li>Commit to the execution. No compromises.</li>
                            </ol>
                            <div style="margin: 30px 0;">
                                <a href="https://brandactivationnetwork.com/dashboard/master-course" style="background-color: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                    Access Your Dashboard →
                                </a>
                            </div>
                            <p>Time to scale without chaos.</p>
                            <p>Talk soon,<br>The BAN Architect Team</p>
                        </div>
                    `
                });
                console.log('VIP Welcome email sent to:', userEmail);
            } catch (emailError) {
                console.error('Failed to send welcome email:', emailError);
            }
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error('Onboarding Error:', err);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
