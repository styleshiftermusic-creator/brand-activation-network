import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";
import { z } from "zod";

const activitySchema = z.object({
  activity_type: z.enum(["DOWNLOAD", "MODULE_VIEW", "LOGIN", "QUIZ_COMPLETE"]),
  target_id: z.string().optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

export async function POST(req: Request) {
  try {
    const supabase = await createSupabaseServerClient();
    
    // Check session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = activitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, error: parsed.error.issues[0].message }, { status: 400 });
    }

    const { activity_type, target_id, metadata } = parsed.data;

    // Log to DB
    const { error: dbError } = await supabase.from("user_activity").insert([
      {
        user_id: user.id,
        activity_type,
        target_id,
        metadata: metadata || {},
      }
    ]);

    if (dbError) {
      console.error("Activity Logging Error:", dbError);
      return NextResponse.json({ success: false, error: "Failed to log activity" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Internal Server Error:", err);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
