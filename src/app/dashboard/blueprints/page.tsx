"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { Play, Download, Lock, CheckCircle2, FileText, LayoutTemplate, MessageSquare } from "lucide-react";

// Mock Data for the 7 Modules
const MODULES = [
    {
        id: "M-01",
        title: "Introduction to Brand Activation",
        duration: "15:00",
        status: "COMPLETED",
        description: "Welcome to the Brand Activation course. In this first module, you will learn the fundamental concepts of activating your brand and setting the stage for growth.",
        resources: [
            { type: "PDF", name: "Course Syllabus", icon: <FileText className="w-4 h-4" /> },
            { type: "Notion", name: "Action Plan Template", icon: <LayoutTemplate className="w-4 h-4" /> }
        ]
    },
    {
        id: "M-02",
        title: "Your Brand's DNA",
        duration: "45:00",
        status: "ACTIVE",
        description: "Discover the core identity of your brand. We will cover mission, vision, values, and how to communicate your unique selling proposition effectively.",
        resources: [
            { type: "PDF", name: "Brand DNA Workbook", icon: <FileText className="w-4 h-4" /> }
        ]
    },
    {
        id: "M-03",
        title: "The Perfect Audience Avatar",
        duration: "01:10:00",
        status: "LOCKED",
        description: "Identify and understand your ideal customer. Learn how to create detailed buyer personas and tailor your marketing messages to resonate deeply with them.",
        resources: []
    },
    { id: "M-04", title: "Irresistible Offer Creation", duration: "01:30:00", status: "LOCKED", description: "Craft offers so good people feel stupid saying no. We cover pricing strategies, value stacking, and risk reversal.", resources: [] },
    { id: "M-05", title: "High-Converting Sales Funnels", duration: "02:00:00", status: "LOCKED", description: "Build the automated systems that turn cold traffic into paying customers. Step-by-step walkthroughs of landing pages, VSLs, and email sequences.", resources: [] },
    { id: "M-06", title: "Traffic Generation & Ads", duration: "01:45:00", status: "LOCKED", description: "Master paid advertising and organic outreach to drive targeted visitors to your funnels. Covering Facebook Ads, Google Ads, and cold email.", resources: [] },
    { id: "M-07", title: "Automating Your Fulfillment", duration: "01:20:00", status: "LOCKED", description: "Scale your agency without losing your mind. Learn how to automate client onboarding, service delivery, and reporting.", resources: [] },
];

export default function BlueprintsPage() {
    const [activeModuleId, setActiveModuleId] = useState("M-02"); // Defaulting to the active one for demo

    const activeModule = MODULES.find(m => m.id === activeModuleId) || MODULES[0];

    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            {/* Deep Ambient Glows */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 lg:pl-12 overflow-y-auto z-10 flex flex-col lg:flex-row gap-8">

                {/* LEFT PANE: Cinematic Main Viewer */}
                <div className="flex-1 flex flex-col animate-fade-in-up">
                    <header className="mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] tracking-widest uppercase">
                                Module {activeModule.id.replace('M-', '')}
                            </span>
                            <span className="text-xs font-mono text-zinc-500 tracking-wider hidden sm:block">| ARC PROTOCOL</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white">{activeModule.title}</h1>
                    </header>

                    {/* Video Player Placeholder */}
                    <div className="w-full aspect-video bg-black border border-white/10 rounded-xl mb-6 relative group overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        <button className="relative z-10 h-20 w-20 rounded-full bg-[var(--primary)]/20 border border-[var(--primary)]/50 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:bg-[var(--primary)] transition-all duration-300 group shadow-[0_0_30px_var(--primary)]">
                            <Play className="h-8 w-8 ml-2 fill-current" />
                        </button>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                            <span className="bg-black/60 px-2 py-1 rounded backdrop-blur border border-white/10">00:00 / {activeModule.duration}</span>
                            <span className="bg-[var(--primary)]/20 text-[var(--primary)] px-2 py-1 rounded backdrop-blur border border-[var(--primary)]/30 tracking-widest uppercase">High Definition</span>
                        </div>
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
                                        <button key={idx} className="w-full flex items-center justify-between p-3 rounded-lg border border-white/5 bg-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group text-left">
                                            <div className="flex items-center gap-3">
                                                <div className="text-zinc-500 group-hover:text-[var(--primary)] transition-colors">
                                                    {res.icon}
                                                </div>
                                                <div>
                                                    <div className="text-sm text-zinc-300 group-hover:text-white transition-colors">{res.name}</div>
                                                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{res.type} Format</div>
                                                </div>
                                            </div>
                                            <Download className="w-3 h-3 text-zinc-600 group-hover:text-white transition-colors" />
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
                                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group ${isLocked
                                            ? "opacity-50 border-white/5 cursor-not-allowed"
                                            : isSelected
                                                ? "bg-gradient-to-br from-[var(--primary)]/20 to-black/60 border-[var(--primary)] text-white shadow-[0_0_20px_rgba(var(--primary-rgb),0.1)]"
                                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 text-zinc-300"
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]" />
                                        )}

                                        <div className="flex gap-4">
                                            {/* Status Icon */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                {isCompleted ? (
                                                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-[var(--primary)]' : 'text-green-500'}`} />
                                                ) : isLocked ? (
                                                    <Lock className="w-5 h-5 text-zinc-600" />
                                                ) : (
                                                    <div className="relative">
                                                        <div className="w-5 h-5 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
                                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-[var(--primary)]/20 blur animate-pulse" />
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
