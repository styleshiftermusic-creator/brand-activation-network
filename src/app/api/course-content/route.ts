import { createSupabaseServerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createSupabaseServerClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all modules from public table
    const { data: modules, error } = await supabase
        .from('course_modules')
        .select('id, title, category, audio_src, visuals, study_guide, resources, quiz, order_index')
        .order('order_index');

    if (error) {
        console.error('Supabase fetch error:', error);
        return NextResponse.json({ error: 'Failed to load course content' }, { status: 500 });
    }

    // Transform to the shape expected by the client
    const courseData = modules?.reduce((acc, mod) => {
        acc[mod.id.replace('M-', '')] = {
            title: mod.title,
            category: mod.category,
            audioSrc: mod.audio_src,
            visuals: mod.visuals || [],
            studyGuide: mod.study_guide,
            resources: mod.resources || [],
            quiz: mod.quiz || []
        };
        return acc;
    }, {} as Record<string, unknown>) || {};

    return NextResponse.json(courseData);
}
