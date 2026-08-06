"use client";

import { useEffect } from "react";

export function AuthRedirect() {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const hash = window.location.hash;
            // If the URL contains an auth token or an auth error from Supabase
            if (hash && (hash.includes("access_token=") || hash.includes("error="))) {
                // If we are not already on the dashboard, redirect to dashboard preserving the hash
                if (!window.location.pathname.startsWith("/dashboard")) {
                    window.location.href = `/dashboard${hash}`;
                }
            }
        }
    }, []);

    return null;
}
