import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
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
        const { type, metadata } = body;
        const userId = user.id; // Always lock to session user ID

        // 2. Validate Reward Type
        if (!type || !['MODULE_COMPLETE', 'COURSE_COMPLETE'].includes(type)) {
            return NextResponse.json({ success: false, error: 'Invalid reward type' }, { status: 400 });
        }

        // Fetch current profile
        const { data: profile, error: fetchError } = await supabase
            .from('profiles')
            .select('credits, badges')
            .eq('id', userId)
            .single();

        if (fetchError) {
            // Auto-create profile if missing
            await supabase.from('profiles').insert({ id: userId, credits: 0, badges: [] });
            return NextResponse.json({ success: true, newCredits: 0 });
        }

        let creditsToAdd = 0;
        let newBadge = null;

        if (type === 'MODULE_COMPLETE') {
            creditsToAdd = 100;
        } else if (type === 'COURSE_COMPLETE') {
            if (profile.badges && profile.badges.includes("Architect")) {
                // Already rewarded
                return NextResponse.json({ success: true, credits: profile.credits, badges: profile.badges });
            }
            creditsToAdd = 1000;
            newBadge = "Architect";
        }

        const newCredits = (profile.credits || 0) + creditsToAdd;
        let updatedBadges = profile.badges || [];
        
        if (newBadge && !updatedBadges.includes(newBadge)) {
            updatedBadges = [...updatedBadges, newBadge];
        }

        // Update profile
        const { error: updateError } = await supabase.from('profiles').update({
            credits: newCredits,
            badges: updatedBadges
        }).eq('id', userId);

        if (updateError) {
            console.error('Error updating gamification:', updateError);
            return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, credits: newCredits, badges: updatedBadges });
    } catch (err) {
        console.error('Gamification Error:', err);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
