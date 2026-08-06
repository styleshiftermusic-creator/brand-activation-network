"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldAlert, Terminal, Loader2, ChevronRight } from "lucide-react";

function ConfirmInviteContent() {
    const searchParams = useSearchParams();
    const nextUrl = searchParams.get("next");
    const [isRedirecting, setIsRedirecting] = useState(false);

    const handleConfirm = () => {
        if (nextUrl) {
            setIsRedirecting(true);
            window.location.href = nextUrl;
        }
    };

    if (!nextUrl) {
        return (
            <div className="bg-black/40 backdrop-blur-2xl border border-red-500/20 rounded-xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(239,68,68,0.1)] max-w-md w-full">
                <div className="flex flex-col items-center text-center">
                    <ShieldAlert className="h-12 w-12 text-red-500 mb-4 animate-pulse" />
                    <h2 className="text-lg font-bold text-red-400 tracking-widest uppercase mb-2">OPERATOR TIMEOUT</h2>
                    <p className="text-zinc-500 text-xs leading-relaxed font-mono">
                        INVALID OR MISSING PARAMETERS. SECURITY PROTOCOL BLOCKED ACCESS. PLEASE ENSURE YOU ARE CLICKING A VALID INVITATION LINK.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full">
            <div className="flex flex-col items-center">
                <Terminal className="h-10 w-10 text-[var(--primary)] mb-4 animate-pulse opacity-80" />
                <h2 className="text-sm font-bold text-[var(--primary)] tracking-widest uppercase mb-2">VERIFY HUMAN OPERATOR</h2>
                <p className="text-zinc-400 text-xs text-center leading-relaxed font-mono mb-8">
                    TO PREVENT AUTOMATED EMAIL SCANNERS FROM PRE-EXPIRED INVITATION TOKENS, MANUAL CONFIRMATION IS REQUIRED.
                </p>

                <button
                    onClick={handleConfirm}
                    disabled={isRedirecting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:opacity-90 active:scale-[0.98] text-white font-mono text-xs font-bold uppercase rounded-lg tracking-wider transition-all duration-200 cursor-pointer shadow-[0_0_15px_rgba(157,78,221,0.2)] disabled:opacity-50"
                >
                    {isRedirecting ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            ROUTING UPLINK...
                        </>
                    ) : (
                        <>
                            INITIALIZE SECURE CLEARANCE
                            <ChevronRight className="h-4 w-4" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}

export default function ConfirmInvitePage() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-6 font-mono selection:bg-[var(--primary)]/30">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('/noise.svg')] opacity-20 mix-blend-overlay z-50"></div>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-40 opacity-80"></div>

            {/* Subtle Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-lg z-10 animate-fade-in-up flex flex-col items-center">
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-base font-bold text-white tracking-[0.2em] uppercase text-center">BRAND ACTIVATION NETWORK</h1>
                    <p className="text-zinc-500 text-[10px] tracking-widest mt-1.5 uppercase text-center">Gateway Terminal</p>
                </div>

                <Suspense fallback={
                    <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] max-w-md w-full flex flex-col items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary)]" />
                        <p className="text-zinc-500 text-xs font-mono mt-4 tracking-widest uppercase">LOADING OPERATOR SECURE GATEWAY...</p>
                    </div>
                }>
                    <ConfirmInviteContent />
                </Suspense>
            </div>
        </div>
    );
}
