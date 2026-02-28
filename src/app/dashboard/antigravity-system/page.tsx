"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState, useEffect } from "react";
import { Play, Download, Lock, CheckCircle2, FileText, LayoutTemplate, MessageSquare } from "lucide-react";

// Mock Data for the 7 Modules (AntiGravity / Mission Control theme)
const MODULES = [
    {
        id: "M-01",
        title: "Initialize Blueprint (The Constitution)",
        duration: "45:00",
        status: "COMPLETED", // "COMPLETED", "ACTIVE", "LOCKED"
        description: "The foundational architectural protocol for the Brand Activation Network. Learn the non-negotiable rules for scaling your agency using our high-ticket, autonomous system.",
        resources: [
            { type: "PDF", name: "The Constitution '26", icon: <FileText className="w-4 h-4" /> },
            { type: "Notion", name: "Agency OS Template", icon: <LayoutTemplate className="w-4 h-4" /> }
        ]
    },
    {
        id: "M-02",
        title: "Deploy AntiGravity 'Fighter Jet' Architecture",
        duration: "01:12:00",
        status: "ACTIVE",
        description: "Executing the multi-agent UI/UX deployment sequence. We've moved past MVP; this module covers how to engineer a 'Fighter Jet' aesthetic for premium client acquisition.",
        resources: [
            { type: "Figma", name: "UI Sniper Kit", icon: <LayoutTemplate className="w-4 h-4" /> },
            { type: "Text", name: "Fighter Jet Prompts", icon: <MessageSquare className="w-4 h-4" /> }
        ]
    },
    {
        id: "M-03",
        title: "Establish MCP Links & Webhooks",
        duration: "55:00",
        status: "LOCKED",
        description: "Connecting the external synapses. How to wire up Stripe, Resend, and your Supabase database to achieve full operational automation.",
        resources: []
    },
    { id: "M-04", title: "Architect Database & Logic (Supabase)", duration: "01:30:00", status: "LOCKED", description: "Deep dive into PostgreSQL row-level security and schema generation for a multi-tenant SaaS architecture.", resources: [] },
    { id: "M-05", title: "Execute 'UI Sniping' Protocol", duration: "42:00", status: "LOCKED", description: "Stealing like an artist. How to ethically source and reverse-engineer million-dollar SaaS interfaces for your own agency.", resources: [] },
    { id: "M-06", title: "Configure Autonomous Triggers", duration: "01:05:00", status: "LOCKED", description: "Setting up the 'if this, then that' logical gates that allow your agency to fulfill services without human intervention.", resources: [] },
    { id: "M-07", title: "Final Integration & Review", duration: "38:00", status: "LOCKED", description: "The final walkthrough. Connecting all 6 prior modules into a single, cohesive, client-facing product.", resources: [] },
];

export default function AntiGravitySystemPage() {
    const [activeModuleId, setActiveModuleId] = useState("M-02"); // Defaulting to the active one for demo
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        setIsPlaying(false);
    }, [activeModuleId]);

    const activeModule = MODULES.find(m => m.id === activeModuleId) || MODULES[0];

    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            {/* Deep Ambient Glows - Slightly different color for this course */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 lg:pl-12 overflow-y-auto z-10 flex flex-col lg:flex-row gap-8">

                {/* LEFT PANE: Cinematic Main Viewer */}
                <div className="flex-1 flex flex-col animate-fade-in-up">
                    <header className="mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 tracking-widest uppercase shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]">
                                Module {activeModule.id.replace('M-', '')}
                            </span>
                            <span className="text-xs font-mono text-zinc-500 tracking-wider hidden sm:block">| ANTIGRAVITY PROTOCOL</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white">{activeModule.title}</h1>
                    </header>

                    {/* Video Player Box with Glassmorphism */}
                    <div className="w-full aspect-video bg-black/40 backdrop-blur-2xl rounded-xl mb-8 relative group overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center transition-transform duration-500 hover:-translate-y-1">
                        {/* Outer Glass Border */}
                        <div className="absolute inset-0 border border-white/10 rounded-xl pointer-events-none z-20" />
                        <div className="absolute inset-0 border border-white/[0.02] m-[1px] rounded-xl pointer-events-none z-20" />

                        {!isPlaying ? (
                            <>
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-50 group-hover:scale-105 transition-all duration-1000 mix-blend-luminosity z-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 z-10" />

                                <button
                                    onClick={() => setIsPlaying(true)}
                                    className="relative z-30 h-20 w-20 rounded-full bg-indigo-500/20 border border-indigo-500/50 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:bg-indigo-500 transition-all duration-300 group shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                                    <Play className="h-8 w-8 ml-2 fill-current" />
                                </button>

                                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-400 z-20">
                                    <span className="bg-black/60 px-2 py-1 rounded backdrop-blur border border-white/10">00:00 / {activeModule.duration}</span>
                                    <span className="bg-indigo-500/20 text-indigo-400 px-2 py-1 rounded backdrop-blur border border-indigo-500/30 tracking-widest uppercase">Mission Control Feed</span>
                                </div>
                            </>
                        ) : (
                            <video
                                src="https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4"
                                autoPlay
                                controls
                                className="absolute inset-0 w-full h-full object-cover z-30 rounded-xl bg-black mix-blend-luminosity opacity-90"
                            />
                        )}
                    </div>

                    {/* Resources & Description */}
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex-1">
                            <h3 className="text-white font-medium mb-3 tracking-tight">Protocol Overview</h3>
                            <p className="text-zinc-400 leading-relaxed text-sm">
                                {activeModule.description}
                            </p>
                        </div>

                        {activeModule.resources && activeModule.resources.length > 0 && (
                            <div className="md:w-64 flex-shrink-0">
                                <h3 className="text-white font-medium mb-3 tracking-tight flex items-center gap-2">
                                    <Download className="w-4 h-4 text-zinc-500" /> Reference Assets
                                </h3>
                                <div className="space-y-2">
                                    {activeModule.resources.map((res, idx) => (
                                        <button key={idx} className="w-full flex items-center justify-between p-3 rounded-lg border border-white/5 bg-black/40 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_15px_-5px_rgba(255,255,255,0.1)] group text-left relative overflow-hidden">
                                            <div className="absolute inset-0 border border-white/[0.02] pointer-events-none rounded-lg" />
                                            <div className="flex items-center gap-3 relative z-10">
                                                <div className="text-zinc-500 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300">
                                                    {res.icon}
                                                </div>
                                                <div>
                                                    <div className="text-sm text-zinc-300 group-hover:text-white transition-colors tracking-tight">{res.name}</div>
                                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{res.type} Format</div>
                                                </div>
                                            </div>
                                            <Download className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:-translate-y-0.5 transition-all duration-300 relative z-10" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                {/* RIGHT PANE: Module Navigation Matrix */}
                <div className="w-full lg:w-80 xl:w-96 flex-shrink-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                    <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-xl p-5 sticky top-10 h-[calc(100vh-80px)] overflow-y-auto hidden-scrollbar">
                        <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-zinc-500 mb-6">Course Matrix</h2>

                        <div className="space-y-3">
                            {MODULES.map((module) => {
                                const isSelected = activeModuleId === module.id;
                                const isLocked = module.status === "LOCKED";
                                const isCompleted = module.status === "COMPLETED";

                                return (
                                    <button
                                        key={module.id}
                                        onClick={() => !isLocked && setActiveModuleId(module.id)}
                                        disabled={isLocked}
                                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 relative overflow-hidden group ${isLocked
                                            ? "opacity-50 border border-white/5 cursor-not-allowed bg-black/20"
                                            : isSelected
                                                ? "bg-gradient-to-br from-indigo-500/10 to-black/60 border border-indigo-500/50 text-white shadow-[0_0_30px_-5px_rgba(99,102,241,0.2)]"
                                                : "bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white-[0.02] text-zinc-300 hover:-translate-y-1 hover:shadow-[0_10px_20px_-10px_rgba(0,0,0,0.5)]"
                                            }`}
                                    >
                                        <div className="absolute inset-0 border border-white/[0.02] rounded-xl pointer-events-none" />

                                        {isSelected && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10" />
                                        )}

                                        <div className="flex gap-4">
                                            {/* Status Icon */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                {isCompleted ? (
                                                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-indigo-400' : 'text-green-500'}`} />
                                                ) : isLocked ? (
                                                    <Lock className="w-5 h-5 text-zinc-600" />
                                                ) : (
                                                    <div className="relative">
                                                        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-indigo-500/20 blur animate-pulse" />
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div>
                                                <div className="text-[10px] font-mono text-zinc-500 mb-1 flex justify-between items-center">
                                                    <span>{module.id}</span>
                                                    <span>{module.duration}</span>
                                                </div>
                                                <h4 className={`text-sm leading-snug tracking-tight font-medium ${isLocked ? 'text-zinc-500' : isSelected ? 'text-white' : 'text-zinc-300'}`}>
                                                    {module.title}
                                                </h4>
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
}
