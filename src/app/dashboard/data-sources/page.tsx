"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Download, BookOpen, Database, Sparkles, FileText, Bot, Lock, ShieldCheck, Landmark, ArrowRight } from "lucide-react";
import Link from "next/link";

const DATA_SOURCES = [
    {
        id: "DS-01",
        title: "Pledge Loan Calculator",
        format: "Spreadsheet",
        size: "2.5 KB",
        icon: <FileText className="w-5 h-5 text-[var(--brand-secondary-light)]" />,
        bgClass: "bg-[var(--brand-secondary)]/10",
        hoverText: "group-hover:text-[var(--brand-secondary-light)]",
        hoverBorder: "group-hover:border-[var(--brand-secondary)]/20",
        hoverBg: "group-hover:bg-[var(--brand-secondary)]/10",
        href: "/api/download/blueprint/pledge-loan-calculator.md",
        fileName: "Pledge-Loan-Calculator.md",
    },
    {
        id: "DS-02",
        title: "Business Funding Checklist",
        format: "PDF Document",
        size: "3.1 KB",
        icon: <FileText className="w-5 h-5 text-[var(--brand-info)]" />,
        bgClass: "bg-[var(--brand-info)]/10",
        hoverText: "group-hover:text-[var(--brand-info)]",
        hoverBorder: "group-hover:border-[var(--brand-info)]/20",
        hoverBg: "group-hover:bg-[var(--brand-info)]/10",
        href: "/api/download/blueprint/business-funding-checklist.md",
        fileName: "Business-Funding-Checklist.md",
    },
    {
        id: "DS-03",
        title: "OPA Marketing Playbook",
        format: "Notion System",
        size: "4.2 KB",
        icon: <Database className="w-5 h-5 text-[var(--brand-warning)]" />,
        bgClass: "bg-[var(--brand-warning)]/10",
        hoverText: "group-hover:text-[var(--brand-warning)]",
        hoverBorder: "group-hover:border-[var(--brand-warning)]/20",
        hoverBg: "group-hover:bg-[var(--brand-warning)]/10",
        href: "/api/download/blueprint/opa-marketing-playbook.md",
        fileName: "OPA-Marketing-Playbook.md",
    },
    {
        id: "DS-04",
        title: "High-Ticket Sales Scripts",
        format: "PDF Document",
        size: "4.9 KB",
        icon: <FileText className="w-5 h-5 text-[var(--brand-primary)]" />,
        bgClass: "bg-[var(--brand-primary)]/10",
        hoverText: "group-hover:text-[var(--brand-primary)]",
        hoverBorder: "group-hover:border-[var(--brand-primary)]/20",
        hoverBg: "group-hover:bg-[var(--brand-primary)]/10",
        href: "/api/download/blueprint/high-ticket-sales-scripts.md",
        fileName: "High-Ticket-Sales-Scripts.md",
    },
    {
        id: "DS-05",
        title: "Investment Blueprint Template",
        format: "Notion Template",
        size: "4.0 KB",
        icon: <Database className="w-5 h-5 text-[var(--brand-primary)]" />,
        bgClass: "bg-[var(--brand-primary)]/10",
        hoverText: "group-hover:text-[var(--brand-primary)]",
        hoverBorder: "group-hover:border-[var(--brand-primary)]/20",
        hoverBg: "group-hover:bg-[var(--brand-primary)]/10",
        href: "/api/download/blueprint/investment-blueprint-template.md",
        fileName: "Investment-Blueprint-Template.md",
    },
    {
        id: "DS-06",
        title: "AI Agent Prompt Library",
        format: "JSON / TXT",
        size: "5.3 KB",
        icon: <Bot className="w-5 h-5 text-[var(--brand-danger)]" />,
        bgClass: "bg-[var(--brand-danger)]/10",
        hoverText: "group-hover:text-[var(--brand-danger)]",
        hoverBorder: "group-hover:border-[var(--brand-danger)]/20",
        hoverBg: "group-hover:bg-[var(--brand-danger)]/10",
        href: "/api/download/blueprint/ai-agent-prompt-library.json",
        fileName: "AI-Agent-Prompt-Library.json",
    },
    {
        id: "DS-07",
        title: "BAN Credit Sweep Blueprint",
        format: "HTML Blueprint",
        size: "12.8 KB",
        icon: <ShieldCheck className="w-5 h-5 text-[var(--brand-secondary-light)]" />,
        bgClass: "bg-[var(--brand-secondary)]/10",
        hoverText: "group-hover:text-[var(--brand-secondary-light)]",
        hoverBorder: "group-hover:border-[var(--brand-secondary)]/20",
        hoverBg: "group-hover:bg-[var(--brand-secondary)]/10",
        href: "/api/download/playbook",
        fileName: "BAN-Credit-Sweep-Blueprint.html",
    }
];

function downloadFile(url: string, fileName: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export default function DataSourcesPage() {
    return (
        <div className="min-h-screen bg-[var(--brand-bg)] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            <div className="fixed top-0 right-0 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto z-10 relative">
                <div className="max-w-5xl mx-auto animate-fade-in-up">
                    <header className="mb-10 border-b border-white/10 pb-6">
                        <h1 className="text-3xl font-medium tracking-tight text-white mb-2">The Million Dollar File</h1>
                        <p className="text-zinc-500 font-mono text-sm max-w-2xl">
                            Access premium assets, datasets, and foundational materials mapped directly to your Brand Activation Network account.
                        </p>
                    </header>

                    {/* HERO ASSET */}
                    <div className="mb-12 relative group rounded-2xl overflow-hidden border border-[var(--primary)]/30 bg-black/40 backdrop-blur-xl">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                        <div className="absolute inset-0 bg-[var(--primary)]/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 p-8 lg:p-12 items-center md:items-start">
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
                                        The core architectural doctrine for scaling seven-figure agencies via autonomous AI networks. This compendium contains the exact data models, prompts, and playbooks used in top-tier systems.
                                    </p>
                                </div>
                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/10">
                                    <button disabled className="w-full opacity-50 cursor-not-allowed sm:w-auto px-8 py-3 rounded-lg border border-[var(--primary)]/30 text-white font-medium flex items-center justify-center gap-2">
                                        <Lock className="w-4 h-4" />
                                        Framework Releasing Q4
                                    </button>
                                    <div className="text-xs font-mono text-zinc-500 uppercase flex gap-4">
                                        <span>Size: 1.2 GB</span>
                                        <span>Format: ZIP Archive</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BAN Credit Unions Live Engine Banner */}
                    <div className="mb-8 p-6 rounded-2xl border border-[var(--brand-secondary)]/30 bg-black/40 backdrop-blur-xl relative overflow-hidden group hover:border-[var(--brand-secondary)]/50 transition-all shadow-[0_0_30px_-10px_var(--brand-glow-secondary)0.15)]">
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand-secondary)]/10 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3.5 rounded-xl bg-[var(--brand-secondary)]/10 border border-[var(--brand-secondary)]/30 text-[var(--brand-secondary-light)]">
                                    <Landmark className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--brand-secondary)]/20 text-[var(--brand-secondary-light)] border border-[var(--brand-secondary)]/30 uppercase font-semibold">Live Interactive Tool</span>
                                        <span className="text-xs font-mono text-zinc-500 uppercase">Interactive Software</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white tracking-tight">BAN Credit Unions Database App</h3>
                                    <p className="text-xs font-mono text-zinc-400 mt-1 max-w-xl">
                                        Interactive eligibility search engine, bureau pulled intelligence, and Pledge Loan product matrix for Module 1 & 2 execution.
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/dashboard/credit-unions"
                                className="px-6 py-3 rounded-xl bg-[var(--brand-secondary)] hover:bg-[var(--brand-secondary-light)] text-black font-mono text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-[0_0_25px_var(--brand-glow-secondary)0.3)] hover:shadow-[0_0_35px_var(--brand-glow-secondary)0.5)] flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                            >
                                <span>Launch App</span>
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    {/* Vault Grid */}
                    <div className="mb-6">
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
                                        <button
                                            onClick={() => downloadFile(source.href, source.fileName)}
                                            className={`w-full mt-4 py-2.5 rounded-lg border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 ${source.hoverText} ${source.hoverBorder} ${source.hoverBg}`}
                                        >
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
