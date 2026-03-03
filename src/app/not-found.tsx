import Link from "next/link";
import { Terminal, ArrowLeft, AlertTriangle } from "lucide-react";

export const metadata = {
    title: "404 — Signal Lost | Brand Activation Network",
};

export default function NotFound() {
    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-6 font-mono selection:bg-[var(--primary)]/30">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('/noise.svg')] opacity-20 mix-blend-overlay z-50" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-40 opacity-80" />

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-lg z-10 animate-fade-in-up">
                <div className="flex flex-col items-center mb-10">
                    <div className="relative mb-6">
                        <Terminal className="h-16 w-16 text-red-500/70" />
                        <AlertTriangle className="h-6 w-6 text-red-400 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <h1 className="text-6xl font-bold text-white tracking-tight mb-2">404</h1>
                    <p className="text-red-400 text-xs tracking-[0.3em] uppercase">Signal Lost</p>
                </div>

                <div className="bg-black/40 backdrop-blur-2xl border border-red-500/20 rounded-xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div className="text-xs text-red-400/70 font-mono space-y-1 mb-8">
                        <div>{"> SCANNING NETWORK NODES..."}</div>
                        <div>{"> ERROR: REQUESTED COORDINATE NOT FOUND"}</div>
                        <div>{"> STATUS: NODE OFFLINE OR RELOCATED"}</div>
                        <div className="text-zinc-600">{"> RECOMMENDATION: RETURN TO MISSION CONTROL"}</div>
                    </div>

                    <div className="border-t border-white/5 pt-6">
                        <p className="text-zinc-500 text-sm mb-6 leading-relaxed">
                            The page you&apos;re looking for doesn&apos;t exist or has been moved to a different node.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <Link
                                href="/"
                                className="flex-1 py-3 bg-white/5 hover:bg-[var(--primary)]/20 border border-[var(--primary)]/50 text-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300 text-sm tracking-widest uppercase flex items-center justify-center gap-2 rounded-lg"
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Home Base
                            </Link>
                            <Link
                                href="/dashboard"
                                className="flex-1 py-3 bg-[var(--primary)]/20 hover:bg-[var(--primary)]/30 border border-[var(--primary)] text-white transition-all duration-300 text-sm tracking-widest uppercase flex items-center justify-center gap-2 rounded-lg"
                            >
                                <Terminal className="h-4 w-4" />
                                Mission Control
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center mt-6">
                    <span className="text-xs text-zinc-700 font-mono">BRAND ACTIVATION NETWORK — ERROR HANDLER v1.0</span>
                </div>
            </div>
        </div>
    );
}
