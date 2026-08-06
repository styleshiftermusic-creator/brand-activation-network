import { ChallengeClient } from "./ChallengeClient";
import Image from "next/image";
import Link from "next/link";
import { Zap } from "lucide-react";

export const metadata = {
    title: "Live Event Room — The Master Blueprint Challenge",
    description: "Welcome to the live event room. Watch the challenge videos and access your daily resources.",
};

export default function ChallengeLiveRoom() {
    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col relative overflow-hidden font-sans selection:bg-[var(--primary)]/30">
            
            {/* Ambient Background Glows */}
            <div className="fixed top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Top Navigation */}
            <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-5 border-b border-white/5 bg-black/40 backdrop-blur-xl">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Zap className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="font-semibold text-sm tracking-tight hidden sm:block">Brand Activation Network</span>
                </Link>
                
                <div className="flex items-center gap-3">
                    <div className="px-3 py-1.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                        <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                        Live Event
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 w-full max-w-[1400px] mx-auto px-6 py-8 md:py-12 flex flex-col">
                
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">The Master Blueprint Challenge</h1>
                    <p className="text-zinc-400">Complete all 3 days to unlock the ultimate scaling framework.</p>
                </div>

                {/* Client Component handles the tabs, video player, and VIP upsell */}
                <ChallengeClient />

            </main>
        </div>
    );
}
