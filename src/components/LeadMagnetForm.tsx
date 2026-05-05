"use client";

import { useState } from "react";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { WaitlistModal } from "@/components/WaitlistModal";

export function LeadMagnetForm() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <>
            <section className="mt-32 w-full max-w-4xl mx-auto px-6">
                <div className="relative rounded-3xl overflow-hidden border border-emerald-500/20 bg-black/40 backdrop-blur-xl p-10 md:p-14 text-center group">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-[var(--primary)]/8 pointer-events-none" />
                    <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none transition-transform group-hover:scale-110 duration-700" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px] pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center">
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase font-bold tracking-widest mb-6">
                            <ShieldCheck className="w-3 h-3" />
                            Free Blueprint
                        </span>

                        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 leading-tight">
                            The BAN{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-emerald-300">
                                Credit Sweep
                            </span>
                        </h2>

                        <p className="text-zinc-400 max-w-lg mx-auto mb-3 text-lg font-light leading-relaxed">
                            Remove unauthorized hard inquiries from all 3 bureaus in as little as <strong className="text-white">24 hours</strong> — using the exact phone scripts and FCRA legal framework our members use every day.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-xs text-zinc-500 font-mono uppercase tracking-wider">
                            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-emerald-500 inline-block" />Method 1: Phone (24hr)</span>
                            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-[var(--primary)] inline-block" />Method 2: 609 Letter (7-Day)</span>
                            <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-amber-500 inline-block" />2 Complete Scripts Included</span>
                        </div>

                        <button
                            id="lead-magnet-cta"
                            onClick={() => setModalOpen(true)}
                            className="group/btn relative px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all duration-300 shadow-[0_0_30px_-10px_rgba(52,211,153,0.5)] hover:shadow-[0_0_50px_-10px_rgba(52,211,153,0.9)] hover:-translate-y-0.5 flex items-center gap-3 text-base"
                        >
                            Get Free Access
                            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-200" />
                        </button>

                        <p className="mt-5 text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
                            Free Download • No Credit Card Required • 100% Private
                        </p>
                    </div>
                </div>
            </section>

            <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} variant="blueprint" />
        </>
    );
}
