"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { AuthScreen } from "./AuthScreen";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
    const [isRecovery, setIsRecovery] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const checkOnboarding = async (userId: string) => {
            const { data } = await supabase.from('profiles').select('onboarding_completed').eq('id', userId).single();
            setIsOnboarded(data?.onboarding_completed || false);
            setIsLoading(false);
        };

        // Check active session on mount
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
            if (session) checkOnboarding(session.user.id);
            else setIsLoading(false);
        });

        // Listen for auth state changes (login, logout, token refresh)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
            if (session) checkOnboarding(session.user.id);
            else setIsLoading(false);
        });

        if (typeof window !== "undefined" && window.location.hash.includes("type=recovery")) {
            setIsRecovery(true);
        }

        return () => subscription.unsubscribe();
    }, []);

    // Show a sleek loading state while verifying the initial session
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center relative overflow-hidden font-mono selection:bg-[var(--primary)]/30">
                {/* CRT Scanline Overlay */}
                <div className="absolute inset-0 pointer-events-none bg-[url('/noise.svg')] opacity-20 mix-blend-overlay z-50"></div>
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-40 opacity-80"></div>
                <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)] z-10" />
                <p className="text-[var(--primary)] text-xs mt-4 tracking-widest uppercase z-10 animate-pulse">Establishing Secure Uplink...</p>
            </div>
        );
    }

    // Auth enforced in all environments

    // If no active session or in password recovery mode, intercept the route and render the AuthScreen
    if (!isAuthenticated || isRecovery) {
        return <AuthScreen />;
    }

    // Force onboarding if incomplete
    if (isOnboarded === false && !pathname.includes("/dashboard/onboarding")) {
        router.push("/dashboard/onboarding");
        return null;
    }

    // Otherwise, render the requested dashboard content
    return <>{children}</>;
}
