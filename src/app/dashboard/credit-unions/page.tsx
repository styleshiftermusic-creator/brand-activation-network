"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Landmark, ExternalLink, RefreshCw, Sparkles, ShieldCheck, Info, BookOpen } from "lucide-react";
import Link from "next/link";

export default function CreditUnionsPage() {
    const [iframeKey, setIframeKey] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const handleRefresh = () => {
        setIsLoading(true);
        setIframeKey(prev => prev + 1);
    };

    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
            {/* Deep Ambient Glows */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto z-10 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]">
                                <Sparkles className="w-3 h-3" /> Live Protocol
                            </span>
                            <span className="text-xs font-mono text-zinc-500 tracking-wider hidden sm:inline-flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400/80" /> Member Clearance Verified
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
                            <Landmark className="w-8 h-8 text-emerald-400" />
                            BAN Credit Unions
                        </h1>
                        <p className="text-sm text-zinc-400 mt-1 max-w-2xl font-light">
                            Interactive intelligence engine for Credit Union eligibility, bureau pulling data, and Pledge Loan / B-LOC product matching.
                        </p>
                    </div>

                    {/* Quick Action Tools */}
                    <div className="flex items-center gap-2.5 flex-wrap">
                        <Link
                            href="/dashboard/master-course"
                            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
                        >
                            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Module 1 Strategy</span>
                        </Link>
                        <button
                            onClick={handleRefresh}
                            title="Reload Database"
                            className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white transition-all"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-emerald-400' : ''}`} />
                        </button>
                        <a
                            href="https://ban-credit-union-app.web.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black text-emerald-400 text-xs font-mono uppercase tracking-wider font-semibold transition-all duration-300 shadow-[0_0_20px_-5px_rgba(16,185,129,0.3)] flex items-center gap-2"
                        >
                            <span>Open Dedicated Window</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </header>

                {/* Strategy Context Banner */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2 text-zinc-300">
                        <Info className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span><strong>Execution Protocol:</strong> Target institutions pulling your cleanest bureau (Experian, TransUnion, or Equifax) for your 60–90 day Pledge Loan stacking sequence.</span>
                    </div>
                </div>

                {/* Glassmorphic Embedded Container */}
                <div className="w-full h-[calc(100vh-280px)] min-h-[650px] bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col">
                    {/* Top Browser Bezel */}
                    <div className="h-10 bg-black/60 border-b border-white/10 px-4 flex items-center justify-between flex-shrink-0">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            <span className="text-[11px] font-mono text-zinc-500 ml-2">https://ban-credit-union-app.web.app</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                Encrypted Session
                            </span>
                        </div>
                    </div>

                    {/* Loading Skeleton */}
                    {isLoading && (
                        <div className="absolute inset-0 top-10 bg-[#0a0a0a] flex flex-col items-center justify-center gap-3 z-20 pointer-events-none">
                            <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                            <p className="text-xs font-mono uppercase tracking-widest text-zinc-400 animate-pulse">Loading BAN Credit Unions Engine...</p>
                        </div>
                    )}

                    {/* Responsive Iframe */}
                    <iframe
                        key={iframeKey}
                        src="https://ban-credit-union-app.web.app"
                        title="BAN Credit Unions Database App"
                        onLoad={() => setIsLoading(false)}
                        className="w-full flex-1 border-0 bg-transparent"
                        allow="clipboard-read; clipboard-write; fullscreen"
                    />
                </div>
            </main>
        </div>
    );
}
