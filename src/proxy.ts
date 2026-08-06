import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return supabaseResponse;
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
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

    // 1. Protect /audio/* and /blueprints/* files — block with 401 if not authenticated
    // These are the actual course assets that must never leak
    if ((pathname.startsWith("/audio") || pathname.startsWith("/blueprints")) && !user) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Protect /api/course-content — block with 401 if not authenticated
    // Study guides + quiz answers must stay server-side only
    if (pathname.startsWith("/api/course-content") && !user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 3. Protect /dashboard/* UI pages — redirect to /login if not authenticated
    if (pathname.startsWith("/dashboard") && !user) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    // 4. Protect /admin/* UI pages — restrict to admin users
    if (pathname.startsWith("/admin")) {
        if (!user) {
            const url = request.nextUrl.clone();
            url.pathname = "/login";
            return NextResponse.redirect(url);
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profile?.role !== "admin") {
            const url = request.nextUrl.clone();
            url.pathname = "/dashboard";
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        "/audio/:path*",
        "/blueprints/:path*",
        "/api/course-content/:path*",
        "/dashboard/:path*",
        "/admin/:path*",
    ],
};
