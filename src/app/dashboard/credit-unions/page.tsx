"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Landmark, Sparkles, ShieldCheck, Info, BookOpen } from "lucide-react";
import Link from "next/link";
import { CreditUnionsDirectory } from "@/components/dashboard/CreditUnionsDirectory";

export default function CreditUnionsPage() {
    return (
        <div className="min-h-screen bg-[var(--brand-bg)] flex text-zinc-300 font-sans selection:bg-[var(--brand-secondary)]/30 relative overflow-hidden">
            {/* Deep Ambient Glows */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-[var(--brand-secondary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-[var(--brand-primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-4 md:p-8 lg:p-10 overflow-y-auto z-10 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/10 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--brand-secondary)]/10 border border-[var(--brand-secondary)]/30 text-[var(--brand-secondary-light)] tracking-widest uppercase flex items-center gap-1.5 shadow-[0_0_15px_-3px_var(--brand-glow-secondary)0.3)]">
                                <Sparkles className="w-3 h-3" /> Live Protocol
                            </span>
                            <span className="text-xs font-mono text-zinc-500 tracking-wider hidden sm:inline-flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand-secondary-light)]/80" /> Member Clearance Verified
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3 font-heading">
                            <Landmark className="w-8 h-8 text-[var(--brand-secondary-light)]" />
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
                            className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-[var(--brand-secondary)]/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center gap-2"
                        >
                            <BookOpen className="w-3.5 h-3.5 text-[var(--brand-secondary-light)]" />
                            <span>Module 1 Strategy</span>
                        </Link>
                    </div>
                </header>

                {/* Strategy Context Banner */}
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                    <div className="flex items-center gap-2 text-zinc-300">
                        <Info className="w-4 h-4 text-[var(--brand-secondary-light)] flex-shrink-0" />
                        <span><strong>Execution Protocol:</strong> Target institutions pulling your cleanest bureau (Experian, TransUnion, or Equifax) for your 60–90 day Pledge Loan stacking sequence.</span>
                    </div>
                </div>

                {/* Native Credit Unions Engine */}
                <CreditUnionsDirectory />
            </main>
        </div>
    );
}
