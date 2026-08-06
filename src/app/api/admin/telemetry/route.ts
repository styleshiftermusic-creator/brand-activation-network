import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
    try {
        // 1. Verify authenticated user
        const supabaseUser = await createSupabaseServerClient();
        const { data: { user }, error: authError } = await supabaseUser.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Restrict to Admin role
        const { data: profile, error: profileError } = await supabaseUser
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (profileError || profile?.role !== 'admin') {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // 3. Service role client — bypasses RLS for admin actions
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const isoStart = sevenDaysAgo.toISOString();

        // 4. Fetch telemetry metrics in parallel
        const [registrationsRes, activityRes, totalMembersRes] = await Promise.all([
            supabaseAdmin
                .from("webinar_registrations")
                .select("registered_at")
                .gte("registered_at", isoStart)
                .order("registered_at", { ascending: true }),

            supabaseAdmin
                .from("user_activity")
                .select("activity_type, target_id, created_at")
                .gte("created_at", isoStart)
                .order("created_at", { ascending: false })
                .limit(1000), // Limit query rows to prevent server side resource starvation

            supabaseAdmin
                .from("webinar_registrations")
                .select("id", { count: "exact", head: true }),
        ]);

        if (registrationsRes.error) throw registrationsRes.error;
        if (activityRes.error) throw activityRes.error;

        // 5. Aggregate activity counts by type
        const activityData = activityRes.data ?? [];
        const activityCounts = activityData.reduce(
            (acc: Record<string, number>, row: { activity_type: string }) => {
                acc[row.activity_type] = (acc[row.activity_type] || 0) + 1;
                return acc;
            },
            {}
        );

        // 6. Top modules viewed
        const moduleViews = activityData
            .filter((r: { activity_type: string }) => r.activity_type === "MODULE_VIEW")
            .reduce((acc: Record<string, number>, r: { target_id: string | null }) => {
                const key = r.target_id ?? "unknown";
                acc[key] = (acc[key] || 0) + 1;
                return acc;
            }, {});

        const topModules = Object.entries(moduleViews)
            .sort(([, a], [, b]) => (b as number) - (a as number))
            .slice(0, 5)
            .map(([module_id, count]) => ({ module_id, count }));

        return NextResponse.json({
            registrations: registrationsRes.data ?? [],
            totalMembers: totalMembersRes.count ?? 0,
            activityCounts,
            topModules,
            recentActivity: activityData.slice(0, 50),
        });
    } catch (err) {
        console.error("Telemetry API Error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
