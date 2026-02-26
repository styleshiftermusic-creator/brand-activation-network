"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { Play, Download, Lock, CheckCircle2, FileText, LayoutTemplate, Briefcase } from "lucide-react";

// The Original Master Course Data
const MODULES = [
    {
        id: "M-01",
        title: "The Pledge Loan Hack",
        duration: "45:00",
        status: "COMPLETED",
        description: "The foundational financial protocol. Learn how to leverage pledge loans to generate liquidity while keeping your assets fully invested and minimizing tax liabilities.",
        resources: [
            { type: "PDF", name: "Pledge Loan Blueprint", icon: <FileText className="w-4 h-4" /> },
            { type: "Notion", name: "Liquidity Calculator", icon: <LayoutTemplate className="w-4 h-4" /> }
        ]
    },
    {
        id: "M-02",
        title: "High-level Tax Strategies",
        duration: "01:12:00",
        status: "COMPLETED",
        description: "Advanced techniques for legally restructuring your income and assets to eliminate unnecessary tax drag on your wealth creation vehicle.",
        resources: [
            { type: "PDF", name: "Entity Structuring Guide", icon: <FileText className="w-4 h-4" /> }
        ]
    },
    {
        id: "M-03",
        title: "Velocity Banking Principles",
        duration: "55:00",
        status: "ACTIVE",
        description: "Mastering the flow of capital. How to use lines of credit and specialized banking products to accelerate debt payoff and amplify cash flow.",
        resources: [
            { type: "Excel", name: "Velocity Banking Spreadsheet", icon: <FileText className="w-4 h-4" /> }
        ]
    },
    { id: "M-04", title: "Marketing & Audience Leverage", duration: "01:30:00", status: "LOCKED", description: "Transitioning from financial architecture to audience building. How to monetize your new financial stability by turning attention into capital.", resources: [] },
    { id: "M-05", title: "High-Ticket Sales Philosophy", duration: "42:00", status: "LOCKED", description: "The psychology of closing premium deals. Stop selling features and start selling transformations using the consultative closing framework.", resources: [] },
    { id: "M-06", title: "Scaling with One-to-Many", duration: "01:05:00", status: "LOCKED", description: "Breaking the time-for-money trap. How to build scalable programs, masterminds, and communities that fulfill without your direct involvement.", resources: [] },
    { id: "M-07", title: "Mindset & Environment", duration: "38:00", status: "LOCKED", description: "The final upgrade. Reprogramming your mental operating system and curating an environment that makes failure impossible.", resources: [] },
];

export default function MasterCoursePage() {
    const [activeModuleId, setActiveModuleId] = useState("M-03"); // Defaulting to the active one for demo

    const activeModule = MODULES.find(m => m.id === activeModuleId) || MODULES[0];

    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-emerald-500/30 relative overflow-hidden">
            {/* Deep Ambient Glows - Emerald color for wealth/finance theme */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 lg:pl-12 overflow-y-auto z-10 flex flex-col lg:flex-row gap-8">

                {/* LEFT PANE: Cinematic Main Viewer */}
                <div className="flex-1 flex flex-col animate-fade-in-up">
                    <header className="mb-6 border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 tracking-widest uppercase">
                                Module {activeModule.id.replace('M-', '')}
                            </span>
                            <span className="text-xs font-mono text-zinc-500 tracking-wider hidden sm:block">| FOUNDATIONAL PROTOCOL</span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white">{activeModule.title}</h1>
                    </header>

                    {/* Video Player Placeholder */}
                    <div className="w-full aspect-video bg-black border border-white/10 rounded-xl mb-6 relative group overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity duration-700 mix-blend-luminosity grayscale" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

                        <button className="relative z-10 h-20 w-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:bg-emerald-500 transition-all duration-300 group shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                            <Play className="h-8 w-8 ml-2 fill-current" />
                        </button>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-zinc-400">
                            <span className="bg-black/60 px-2 py-1 rounded backdrop-blur border border-white/10">00:00 / {activeModule.duration}</span>
                            <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded backdrop-blur border border-emerald-500/30 tracking-widest uppercase">Master Course Vault</span>
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
                                                <div className="text-zinc-500 group-hover:text-emerald-400 transition-colors">
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
                                                ? "bg-gradient-to-br from-emerald-500/20 to-black/60 border-emerald-500 text-white shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 text-zinc-300"
                                            }`}
                                    >
                                        {isSelected && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                                        )}

                                        <div className="flex gap-4">
                                            {/* Status Icon */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                {isCompleted ? (
                                                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-emerald-400' : 'text-green-500'}`} />
                                                ) : isLocked ? (
                                                    <Lock className="w-5 h-5 text-zinc-600" />
                                                ) : (
                                                    <div className="relative">
                                                        <div className="w-5 h-5 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
                                                        <div className="absolute inset-0 w-5 h-5 rounded-full bg-emerald-500/20 blur animate-pulse" />
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
