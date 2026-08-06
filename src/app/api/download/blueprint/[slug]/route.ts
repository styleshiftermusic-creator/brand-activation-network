import { NextRequest, NextResponse } from "next/server";
import { readFileSync, existsSync } from "fs";
import { join } from "path";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    // 1. Enforce Authentication
    const supabase = await createSupabaseServerClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    const slug = (await params).slug;
    
    try {
        // 2. Sanitize slug to prevent path traversal
        const safeSlug = slug.replace(/[^a-zA-Z0-9_\-\.]/g, "");
        const filePath = join(process.cwd(), "public", "blueprints", safeSlug);
        
        if (!existsSync(filePath)) {
            return new NextResponse("File not found", { status: 404 });
        }
        
        const fileBuffer = readFileSync(filePath);
        
        // Determine content type
        let contentType = "application/octet-stream";
        if (safeSlug.endsWith(".pdf")) contentType = "application/pdf";
        else if (safeSlug.endsWith(".json")) contentType = "application/json";
        else if (safeSlug.endsWith(".md")) contentType = "text/markdown";
        
        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Disposition": `attachment; filename="${safeSlug}"`,
                "Content-Type": contentType,
            },
        });
    } catch (error) {
        console.error("Error serving download:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
