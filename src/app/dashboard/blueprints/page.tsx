"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Download, Sparkles, FileSpreadsheet, FileText, Bot, Briefcase, Target, Presentation, BookOpen } from "lucide-react";

const BLUEPRINTS = [
    {
        id: "BP-01",
        title: "Pledge Loan Calculator",
        description: "Pre-built spreadsheet to calculate exact pledge loan amounts, interest rates, and payoff timelines for credit union accounts.",
        format: "Google Sheet",
        category: "Finance",
        icon: <FileSpreadsheet className="w-5 h-5" />,
        color: "emerald",
    },
    {
        id: "BP-02",
        title: "Business Funding Checklist",
        description: "Step-by-step checklist covering credit score requirements, documentation, and the exact sequence to secure business funding.",
        format: "PDF",
        category: "Finance",
        icon: <FileText className="w-5 h-5" />,
        color: "emerald",
    },
    {
        id: "BP-03",
        title: "Investment Blueprint Template",
        description: "Financial model for allocating business capital across real estate, index funds, and scaling your operations.",
        format: "Notion Template",
        category: "Finance",
        icon: <Briefcase className="w-5 h-5" />,
        color: "blue",
    },
    {
        id: "BP-04",
        title: "OPA Marketing Playbook",
        description: "The complete Other People's Audiences playbook — podcast pitches, shout-out page scripts, and content factory workflow.",
        format: "Notion System",
        category: "Marketing",
        icon: <Target className="w-5 h-5" />,
        color: "amber",
    },
    {
        id: "BP-05",
        title: "High-Ticket Sales Scripts",
        description: "Word-for-word closing scripts, objection handlers, and the Webinar → Application → Close pipeline framework.",
        format: "PDF",
        category: "Sales",
        icon: <Presentation className="w-5 h-5" />,
        color: "purple",
    },
    {
        id: "BP-06",
        title: "AI Agent Prompt Library",
        description: "Production-ready prompts for content generation, outreach automation, lead scoring, and client onboarding agents.",
        format: "JSON / TXT",
        category: "AI Systems",
        icon: <Bot className="w-5 h-5" />,
        color: "cyan",
    },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]" },
};

export default function BlueprintsPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            {/* Deep Ambient Glows */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-emerald-900/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto z-10 relative">
                <div className="max-w-5xl mx-auto animate-fade-in-up">
                    <header className="mb-10 border-b border-white/10 pb-6">
                        <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Brand Blueprints</h1>
                        <p className="text-zinc-500 font-mono text-sm max-w-2xl">
                            Premium templates, calculators, and playbooks mapped to each module of your Brand Activation curriculum.
                        </p>
                    </header>

                    {/* HERO: Brand Activation Starter Kit */}
                    <div className="mb-12 relative group rounded-2xl overflow-hidden border border-[var(--primary)]/30 bg-black/40 backdrop-blur-xl">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] pointer-events-none" />
                        <div className="absolute inset-0 bg-[var(--primary)]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 lg:p-12 items-center md:items-start">
                            {/* Kit Cover */}
                            <div className="w-48 h-64 flex-shrink-0 rounded-lg shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_20px_var(--primary)] border border-white/10 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden transform group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-500 flex flex-col justify-between p-6">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/20 blur-[30px] rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="z-10 text-center space-y-2 mt-4">
                                    <div className="text-[10px] font-mono tracking-[0.3em] text-[var(--primary)] uppercase">Complete</div>
                                    <h3 className="text-xl font-bold tracking-tighter text-white leading-tight">Starter Kit<br />Bundle</h3>
                                </div>
                                <div className="z-10 w-full flex justify-center pb-2">
                                    <Sparkles className="h-6 w-6 text-[var(--primary)]/50" />
                                </div>
                            </div>

                            {/* Kit Details */}
                            <div className="flex-1 space-y-6 text-center md:text-left">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] text-[10px] font-mono uppercase tracking-widest mb-4">
                                        <BookOpen className="w-3 h-3" />
                                        All-In-One Bundle
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                                        Brand Activation Starter Kit
                                    </h2>
                                    <p className="text-zinc-400 leading-relaxed max-w-xl">
                                        Everything you need to execute the full 7-module curriculum. Includes all calculators,
                                        checklists, scripts, templates, and AI prompt libraries in one download.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
                                    <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_var(--primary)] flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Download Starter Kit
                                    </button>
                                    <div className="text-xs font-mono text-zinc-500 uppercase flex gap-4">
                                        <span>6 Assets</span>
                                        <span>Format: ZIP</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Blueprint Grid */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-6 tracking-tight">Individual Blueprints</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {BLUEPRINTS.map((bp) => {
                                const colors = COLOR_MAP[bp.color] || COLOR_MAP.emerald;
                                return (
                                    <div key={bp.id} className={`group relative p-5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-2xl hover:${colors.border} transition-all duration-500 hover:-translate-y-1 hover:${colors.glow} overflow-hidden`}>
                                        <div className="absolute inset-0 border border-white/[0.02] pointer-events-none rounded-xl" />
                                        <div className="relative z-10">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className={`p-2.5 rounded-lg ${colors.bg} ${colors.text}`}>
                                                    {bp.icon}
                                                </div>
                                                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} uppercase tracking-wider`}>
                                                    {bp.category}
                                                </span>
                                            </div>
                                            <h4 className="font-medium text-white mb-2 tracking-tight group-hover:text-[var(--primary)] transition-colors">{bp.title}</h4>
                                            <p className="text-xs text-zinc-500 leading-relaxed mb-4">{bp.description}</p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <span className="text-[10px] font-mono text-zinc-600 uppercase">{bp.format}</span>
                                                <button className={`py-1.5 px-4 rounded-lg border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-xs font-mono uppercase tracking-wider flex items-center gap-1.5`}>
                                                    <Download className="w-3 h-3" /> Get
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
