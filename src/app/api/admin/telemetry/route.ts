import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET() {
    // 1. Verify the requesting user is authenticated
    const supabaseUser = await createSupabaseServerClient();
    const { data: { user } } = await supabaseUser.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Use the service role key to bypass RLS and read lead data
    const supabaseAdmin = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data, error } = await supabaseAdmin
        .from("webinar_registrations")
        .select("registered_at")
        .gte("registered_at", sevenDaysAgo.toISOString())
        .order("registered_at", { ascending: true });

    if (error) {
        console.error("[TELEMETRY_API] Supabase error:", error.message);
        return NextResponse.json({ error: "Failed to fetch telemetry" }, { status: 500 });
    }

    return NextResponse.json({ registrations: data ?? [] });
}
