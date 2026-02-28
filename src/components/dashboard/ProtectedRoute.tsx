"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AuthScreen } from "./AuthScreen";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check active session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
            setIsLoading(false);
        });

        // Listen for auth state changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
            setIsLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Show a sleek loading state while verifying the initial session
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden font-mono selection:bg-[var(--primary)]/30">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-50"></div>
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-40 opacity-80"></div>
                <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)] z-10" />
                <p className="text-[var(--primary)] text-xs mt-4 tracking-widest uppercase z-10 animate-pulse">Establishing Secure Uplink...</p>
            </div>
        );
    }

    // TEMP BYPASS FOR LOCAL QA TESTING
    if (process.env.NODE_ENV === 'development') {
        return <>{children}</>;
    }

    // If no active session, intercept the route and render the AuthScreen
    if (!isAuthenticated) {
        return <AuthScreen />;
    }

    // Otherwise, render the requested dashboard content
    return <>{children}</>;
}
