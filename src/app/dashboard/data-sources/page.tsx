"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Download, BookOpen, Database, Sparkles, FileText, Bot, CreditCard, Mail } from "lucide-react";

const DATA_SOURCES = [
    {
        id: "DS-01",
        title: "Client Acquisition Protocol",
        format: "Notion System",
        size: "24.5 MB",
        icon: <Database className="w-5 h-5 text-blue-400" />,
        bgClass: "bg-blue-500/10",
        hoverText: "group-hover:text-blue-400",
        hoverBorder: "group-hover:border-blue-500/20",
        hoverBg: "group-hover:bg-blue-500/10"
    },
    {
        id: "DS-02",
        title: "High-Ticket Closing Scripts",
        format: "PDF Document",
        size: "4.2 MB",
        icon: <FileText className="w-5 h-5 text-emerald-400" />,
        bgClass: "bg-emerald-500/10",
        hoverText: "group-hover:text-emerald-400",
        hoverBorder: "group-hover:border-emerald-500/20",
        hoverBg: "group-hover:bg-emerald-500/10"
    },
    {
        id: "DS-03",
        title: "Auto-Outreach AI Prompts",
        format: "TXT / JSON",
        size: "1.1 MB",
        icon: <Bot className="w-5 h-5 text-amber-400" />,
        bgClass: "bg-amber-500/10",
        hoverText: "group-hover:text-amber-400",
        hoverBorder: "group-hover:border-amber-500/20",
        hoverBg: "group-hover:bg-amber-500/10"
    }
];

export default function DataSourcesPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            {/* Deep Ambient Glows */}
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto z-10 relative">
                <div className="max-w-5xl mx-auto animate-fade-in-up">
                    <header className="mb-10 border-b border-white/10 pb-6">
                        <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Secure Data Sources</h1>
                        <p className="text-zinc-500 font-mono text-sm max-w-2xl">
                            Access premium assets, datasets, and foundational materials mapped directly to your
                            Brand Activation Network account.
                        </p>
                    </header>

                    {/* HERO ASSET: The Million Dollar File 2026 */}
                    <div className="mb-12 relative group rounded-2xl overflow-hidden border border-[var(--primary)]/30 bg-black/40 backdrop-blur-xl">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />

                        {/* Subtle Glow Background */}
                        <div className="absolute inset-0 bg-[var(--primary)]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 lg:p-12 items-center md:items-start">
                            {/* Book Cover Mockup (CSS) */}
                            <div className="w-48 h-64 flex-shrink-0 rounded-lg shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8),0_0_20px_var(--primary)] border border-white/10 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden transform group-hover:-translate-y-2 group-hover:rotate-1 transition-all duration-500 flex flex-col justify-between p-6">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--primary)]/20 blur-[30px] rounded-full -translate-y-1/2 translate-x-1/2" />
                                <div className="z-10 text-center space-y-2 mt-4">
                                    <div className="text-[10px] font-mono tracking-[0.3em] text-[var(--primary)] uppercase">Exclusive</div>
                                    <h3 className="text-xl font-bold tracking-tighter text-white leading-tight">The Million Dollar File<br />2026</h3>
                                </div>
                                <div className="z-10 w-full flex justify-center pb-2">
                                    <Sparkles className="h-6 w-6 text-[var(--primary)]/50" />
                                </div>
                            </div>

                            {/* Hero Asset Details */}
                            <div className="flex-1 space-y-6 text-center md:text-left">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] text-[10px] font-mono uppercase tracking-widest mb-4">
                                        <BookOpen className="w-3 h-3" />
                                        Primary Masterpiece
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                                        The Million Dollar File <span className="text-[var(--primary)] opacity-80 font-mono text-2xl">[&apos;26]</span>
                                    </h2>
                                    <p className="text-zinc-400 leading-relaxed max-w-xl">
                                        The core architectural doctrine for scaling seven-figure agencies via autonomous AI networks.
                                        This compendium contains the exact data models, prompts, and playbooks used in top-tier systems.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
                                    <button className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_var(--primary)] flex items-center justify-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Access Framework
                                    </button>
                                    <div className="text-xs font-mono text-zinc-500 uppercase flex gap-4">
                                        <span>Size: 1.2 GB</span>
                                        <span>Format: ZIP Archive</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* System Integrations */}
                    <div className="mb-12">
                        <h3 className="text-lg font-medium text-white mb-6 tracking-tight">Active Integrations</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Stripe */}
                            <div className="group relative p-5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-2xl hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all duration-500 hover:-translate-y-1">
                                <div className="absolute inset-0 border border-white/[0.02] pointer-events-none rounded-xl" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white tracking-tight">Stripe</h4>
                                        <p className="text-xs font-mono text-zinc-500 mt-1">Monetization Engine</p>
                                    </div>
                                </div>
                                <div className="w-full h-1 mt-4 bg-black/40 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-indigo-500/50 shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                                </div>
                            </div>

                            {/* Supabase */}
                            <div className="group relative p-5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-2xl hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all duration-500 hover:-translate-y-1">
                                <div className="absolute inset-0 border border-white/[0.02] pointer-events-none rounded-xl" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                                        <Database className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white tracking-tight">Supabase</h4>
                                        <p className="text-xs font-mono text-zinc-500 mt-1">PostgreSQL Telemetry</p>
                                    </div>
                                </div>
                                <div className="w-full h-1 mt-4 bg-black/40 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                </div>
                            </div>

                            {/* Resend */}
                            <div className="group relative p-5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-2xl hover:border-zinc-400/30 hover:bg-zinc-400/5 transition-all duration-500 hover:-translate-y-1">
                                <div className="absolute inset-0 border border-white/[0.02] pointer-events-none rounded-xl" />
                                <div className="flex items-center gap-4 relative z-10">
                                    <div className="p-3 rounded-lg bg-zinc-500/10 text-zinc-400 group-hover:scale-110 transition-transform duration-500">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-white tracking-tight">Resend</h4>
                                        <p className="text-xs font-mono text-zinc-500 mt-1">Transactional Ops</p>
                                    </div>
                                </div>
                                <div className="w-full h-1 mt-4 bg-black/40 rounded-full overflow-hidden">
                                    <div className="w-full h-full bg-zinc-400/50 shadow-[0_0_10px_rgba(161,161,170,0.5)]"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Standard Vault Grid */}
                    <div className="mb-6">
                        <h3 className="text-lg font-medium text-white mb-6 tracking-tight">Auxiliary Datasets</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {DATA_SOURCES.map((source) => (
                                <div key={source.id} className="group relative p-5 rounded-xl border border-white/5 bg-black/40 backdrop-blur-2xl hover:border-white/10 hover:bg-white/[0.02] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] overflow-hidden">
                                    <div className="absolute inset-0 border border-white/[0.02] pointer-events-none rounded-xl" />
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className={`p-2 rounded-lg ${source.bgClass}`}>
                                                {source.icon}
                                            </div>
                                            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">{source.id}</span>
                                        </div>
                                        <h4 className="font-medium text-white mb-1 tracking-tight group-hover:text-[var(--primary)] transition-colors">{source.title}</h4>
                                        <div className="flex items-center justify-between mt-4 text-xs font-mono text-zinc-500">
                                            <span>{source.format}</span>
                                            <span>{source.size}</span>
                                        </div>
                                        <button className={`w-full mt-4 py-2 rounded-lg border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 ${source.hoverText} ${source.hoverBorder} ${source.hoverBg}`}>
                                            <Download className="w-3 h-3" /> Download
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
