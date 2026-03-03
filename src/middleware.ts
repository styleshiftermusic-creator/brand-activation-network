import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // Refresh the session (important for token refresh)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // Protect /dashboard/* routes — redirect to home if not authenticated
    if (pathname.startsWith("/dashboard") && !user) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    // Protect /audio/* files — block with 401 if not authenticated
    if (pathname.startsWith("/audio") && !user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // Protect /api/course-content — block with 401 if not authenticated
    if (pathname.startsWith("/api/course-content") && !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/audio/:path*",
        "/api/course-content/:path*",
    ],
};
