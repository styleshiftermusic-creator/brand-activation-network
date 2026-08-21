"use client";

import { useState } from "react";
import { Lock, PlayCircle, Download, FileText, CheckCircle2, ChevronRight } from "lucide-react";
import { WaitlistModal } from "@/components/WaitlistModal";

// Mock data for the challenge days
const CHALLENGE_DAYS = [
    {
        id: 1,
        title: "Day 1: The Foundation",
        description: "Discover the core principles of the Master Blueprint and how to restructure your agency.",
        videoId: "dQw4w9WgXcQ", // Placeholder YouTube ID
        locked: false,
        worksheetUrl: "#",
    },
    {
        id: 2,
        title: "Day 2: The Automations",
        description: "Deploy the 16-Agent Specialist Stack and automate your fulfillment.",
        videoId: "dQw4w9WgXcQ",
        locked: true, // Dripped
        worksheetUrl: "#",
    },
    {
        id: 3,
        title: "Day 3: The Scale",
        description: "Turn on the high-ticket lead generation machine.",
        videoId: "dQw4w9WgXcQ",
        locked: true, // Dripped
        worksheetUrl: "#",
    }
];

export function ChallengeClient() {
    const [activeDay, setActiveDay] = useState(1);
    const [modalOpen, setModalOpen] = useState(false);
    
    const currentDayData = CHALLENGE_DAYS.find(d => d.id === activeDay) || CHALLENGE_DAYS[0];
    const stripeLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

    return (
        <div className="w-full flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Video & Resources */}
            <div className="flex-1 flex flex-col gap-6">
                
                {/* Tabs */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {CHALLENGE_DAYS.map((day) => (
                        <button
                            key={day.id}
                            onClick={() => !day.locked && setActiveDay(day.id)}
                            disabled={day.locked}
                            className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
                                activeDay === day.id 
                                ? "bg-[var(--brand-primary)]/20 border border-[var(--brand-primary)]/50 text-white shadow-[0_0_20px_-5px_var(--brand-glow-primary),0.4)]"
                                : day.locked
                                    ? "bg-white/[0.02] border border-transparent text-zinc-600 cursor-not-allowed"
                                    : "bg-white/[0.05] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10"
                            }`}
                        >
                            {day.locked ? <Lock className="w-4 h-4" /> : <PlayCircle className="w-4 h-4" />}
                            <span className="font-semibold text-sm tracking-tight">{day.title}</span>
                        </button>
                    ))}
                </div>

                {/* Video Player */}
                <div className="relative w-full aspect-video bg-black rounded-2xl border border-white/10 overflow-hidden shadow-2xl group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
                    
                    {currentDayData.locked ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 backdrop-blur-md">
                            <Lock className="w-12 h-12 text-zinc-500 mb-4" />
                            <h3 className="text-xl font-bold text-white mb-2">Session Locked</h3>
                            <p className="text-zinc-400 text-sm">This session will unlock tomorrow.</p>
                        </div>
                    ) : (
                        <iframe 
                            src={`https://www.youtube.com/embed/${currentDayData.videoId}?rel=0&modestbranding=1`}
                            title={currentDayData.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full z-0"
                        />
                    )}
                </div>

                {/* Video Details & Resources */}
                <div className="flex flex-col md:flex-row gap-6 items-start justify-between bg-black/40 border border-white/5 p-6 rounded-2xl backdrop-blur-xl">
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">{currentDayData.title}</h2>
                        <p className="text-zinc-400 text-sm leading-relaxed">{currentDayData.description}</p>
                    </div>
                    
                    {!currentDayData.locked && (
                        <a 
                            href={currentDayData.worksheetUrl}
                            className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/10 border border-white/10 text-white font-medium transition-colors group"
                        >
                            <FileText className="w-4 h-4 text-[var(--brand-secondary-light)] group-hover:scale-110 transition-transform" />
                            Download Worksheet
                            <Download className="w-4 h-4 text-zinc-500 ml-2" />
                        </a>
                    )}
                </div>
            </div>

            {/* Right Column: The Upsell Panel */}
            <div className="w-full lg:w-[350px] xl:w-[400px] flex-shrink-0">
                <div className="sticky top-8 flex flex-col gap-6">
                    
                    {/* VIP Upsell Card */}
                    <div className="bg-black/60 backdrop-blur-2xl border border-[var(--brand-secondary)]/30 rounded-2xl p-6 relative overflow-hidden group shadow-[0_0_30px_var(--brand-glow-secondary),0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-secondary)]/10 via-transparent to-transparent pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col items-center text-center">
                            <span className="inline-block px-3 py-1 rounded-full bg-[var(--brand-secondary)]/20 text-[var(--brand-secondary-light)] text-[10px] font-mono uppercase tracking-widest mb-4 border border-[var(--brand-secondary)]/30">
                                Skip The Line
                            </span>
                            
                            <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                                Want the entire system <br/> <span className="text-[var(--brand-secondary-light)]">right now?</span>
                            </h3>
                            
                            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                                Don&apos;t wait 3 days. Upgrade to VIP and get instant, lifetime access to the complete Brand Activation Network.
                            </p>
                            
                            <div className="w-full space-y-3 mb-6 text-left">
                                {[
                                    "Unlock all modules instantly",
                                    "Get the 16-Agent Specialist Stack",
                                    "Private community access",
                                    "Lifetime updates included"
                                ].map((benefit, i) => (
                                    <div key={i} className="flex items-start gap-2 text-xs text-zinc-300">
                                        <CheckCircle2 className="w-4 h-4 text-[var(--brand-secondary-light)] flex-shrink-0" />
                                        <span>{benefit}</span>
                                    </div>
                                ))}
                            </div>

                            {stripeLink ? (
                                <a 
                                    href={stripeLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[var(--brand-secondary)] hover:bg-[var(--brand-secondary-light)] text-black font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_var(--brand-glow-secondary),0.4)] hover:shadow-[0_0_30px_var(--brand-glow-secondary),0.6)]"
                                >
                                    Upgrade For $497 <ChevronRight className="w-4 h-4" />
                                </a>
                            ) : (
                                <button 
                                    onClick={() => setModalOpen(true)}
                                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[var(--brand-secondary)] hover:bg-[var(--brand-secondary-light)] text-black font-bold uppercase tracking-wider text-sm transition-all shadow-[0_0_20px_var(--brand-glow-secondary),0.4)] hover:shadow-[0_0_30px_var(--brand-glow-secondary),0.6)]"
                                >
                                    Upgrade For $497 <ChevronRight className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    </div>

                    <WaitlistModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

                    {/* Support Link */}
                    <p className="text-center text-xs text-zinc-600">
                        Need help? <a href="mailto:support@brandactivationnetwork.com" className="hover:text-white underline underline-offset-2">Contact Support</a>
                    </p>
                </div>
            </div>
        </div>
    );
}
