"use client";

import { useState } from "react";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Download, Sparkles, FileSpreadsheet, FileText, Bot, Briefcase, Target, Presentation, BookOpen, Info, X } from "lucide-react";

const BLUEPRINTS = [
    {
        id: "BP-01",
        title: "Pledge Loan Calculator",
        description: "Pre-built spreadsheet to calculate exact pledge loan amounts, interest rates, and payoff timelines for credit union accounts.",
        format: "Google Sheet",
        category: "Finance",
        icon: <FileSpreadsheet className="w-5 h-5" />,
        color: "emerald",
        downloadUrl: "/blueprints/pledge-loan-calculator.md",
        fileName: "Pledge-Loan-Calculator.md",
        howToUse: [
            "Download the spreadsheet file and open it in Google Sheets or Excel.",
            "Make a private copy to your own drive.",
            "Input your total available cash in the 'Starting Capital' field.",
            "The calculator will automatically generate your 80-85% paydown target and monthly autopay schedule."
        ]
    },
    {
        id: "BP-02",
        title: "Business Funding Checklist",
        description: "Step-by-step checklist covering credit score requirements, documentation, and the exact sequence to secure business funding.",
        format: "PDF",
        category: "Finance",
        icon: <FileText className="w-5 h-5" />,
        color: "emerald",
        downloadUrl: "/blueprints/business-funding-checklist.md",
        fileName: "Business-Funding-Checklist.md",
        howToUse: [
            "Download and print this PDF (or keep it on your tablet).",
            "Verify all personal credit requirements are met (2 cards, $10k+ limits) before checking the first box.",
            "Ensure your LLC is properly seasoned.",
            "Do not apply for business funding until every box in the 'Pre-Flight' section is checked."
        ]
    },
    {
        id: "BP-03",
        title: "Investment Blueprint Template",
        description: "Financial model for allocating business capital across real estate, index funds, and scaling your operations.",
        format: "Notion Template",
        category: "Finance",
        icon: <Briefcase className="w-5 h-5" />,
        color: "blue",
        downloadUrl: "/blueprints/investment-blueprint-template.md",
        fileName: "Investment-Blueprint-Template.md",
        howToUse: [
            "Download the document to access the private Notion template link.",
            "Duplicate the template into your own Notion workspace.",
            "Input your total business funding amount.",
            "Allocate funds strictly according to the 'Knowledge', 'Marketing', and 'Operations' buckets outlined."
        ]
    },
    {
        id: "BP-04",
        title: "OPA Marketing Playbook",
        description: "The complete Other People's Audiences playbook — podcast pitches, shout-out page scripts, and content factory workflow.",
        format: "Notion System",
        category: "Marketing",
        icon: <Target className="w-5 h-5" />,
        color: "amber",
        downloadUrl: "/blueprints/opa-marketing-playbook.md",
        fileName: "OPA-Marketing-Playbook.md",
        howToUse: [
            "Duplicate the Notion workspace into your account.",
            "Review the DM scripts for Instagram Shout-Out pages.",
            "Customize the 'Power 5' podcast pitch template with your own story.",
            "Use the built-in CRM to track your outreach and follow-ups."
        ]
    },
    {
        id: "BP-05",
        title: "High-Ticket Sales Scripts",
        description: "Word-for-word closing scripts, objection handlers, and the Webinar → Application → Close pipeline framework.",
        format: "PDF",
        category: "Sales",
        icon: <Presentation className="w-5 h-5" />,
        color: "purple",
        downloadUrl: "/blueprints/high-ticket-sales-scripts.md",
        fileName: "High-Ticket-Sales-Scripts.md",
        howToUse: [
            "Download the PDF and keep it open during your sales calls.",
            "Review the '4 Levers of Trust' transition script before every pitch.",
            "Use the Objection Handling matrix when prospects say 'I need to think about it'.",
            "Never quote time on a call. Only quote the transformation."
        ]
    },
    {
        id: "BP-06",
        title: "AI Agent Prompt Library",
        description: "Production-ready prompts for content generation, outreach automation, lead scoring, and client onboarding agents.",
        format: "JSON / TXT",
        category: "AI Systems",
        icon: <Bot className="w-5 h-5" />,
        color: "cyan",
        downloadUrl: "/blueprints/ai-agent-prompt-library.json",
        fileName: "AI-Agent-Prompt-Library.json",
        howToUse: [
            "Download the Prompt Library file.",
            "Copy the specific role prompt you need (e.g., 'Lead Generation Agent').",
            "Paste the text exactly as written into ChatGPT, Claude, or your own AI Agent builder.",
            "Replace the bracketed information [LIKE THIS] with your specific business details."
        ]
    },
];

const COLOR_MAP: Record<string, { bg: string; text: string; border: string; glow: string }> = {
    emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", glow: "shadow-[0_0_20px_rgba(16,185,129,0.15)]" },
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", glow: "shadow-[0_0_20px_rgba(59,130,246,0.15)]" },
    amber: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", glow: "shadow-[0_0_20px_rgba(245,158,11,0.15)]" },
    purple: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", glow: "shadow-[0_0_20px_rgba(168,85,247,0.15)]" },
    cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", border: "border-cyan-500/30", glow: "shadow-[0_0_20px_rgba(6,182,212,0.15)]" },
};

function downloadFile(url: string, fileName: string) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function downloadAllBlueprints() {
    // Download each file with a small delay between them
    BLUEPRINTS.forEach((bp, index) => {
        setTimeout(() => {
            downloadFile(bp.downloadUrl, bp.fileName);
        }, index * 500);
    });
}

export default function BlueprintsPage() {
    const [selectedBlueprint, setSelectedBlueprint] = useState<typeof BLUEPRINTS[0] | null>(null);

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
                                    <button
                                        onClick={downloadAllBlueprints}
                                        className="w-full sm:w-auto px-8 py-3 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white font-medium transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_var(--primary)] flex items-center justify-center gap-2"
                                    >
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
                                            <div className="flex flex-col gap-2 mt-auto">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="text-[10px] font-mono text-zinc-600 uppercase">{bp.format}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => setSelectedBlueprint(bp)}
                                                        className={`flex-1 py-1.5 px-3 rounded-lg border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5`}
                                                    >
                                                        <Info className="w-3 h-3" /> Instructions
                                                    </button>
                                                    <button
                                                        onClick={() => downloadFile(bp.downloadUrl, bp.fileName)}
                                                        className={`flex-1 py-1.5 px-3 rounded-lg border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] hover:bg-[var(--primary)]/20 transition-all text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5`}
                                                    >
                                                        <Download className="w-3 h-3" /> Get
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </main>

            {/* Instructions Modal */}
            {selectedBlueprint && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                        onClick={() => setSelectedBlueprint(null)}
                    />

                    {/* Modal Content */}
                    <div className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl p-6 lg:p-8 animate-fade-in-up">
                        <button
                            onClick={() => setSelectedBlueprint(null)}
                            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 mb-6">
                            <div className={`p-2 rounded-lg ${COLOR_MAP[selectedBlueprint.color]?.bg || 'bg-white/10'} ${COLOR_MAP[selectedBlueprint.color]?.text || 'text-white'}`}>
                                {selectedBlueprint.icon}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white tracking-tight">{selectedBlueprint.title}</h3>
                                <div className="text-xs font-mono text-zinc-500 uppercase mt-1">Instructions & Breakdown</div>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/5 rounded-xl p-5 mb-6">
                            <ul className="space-y-4">
                                {selectedBlueprint.howToUse.map((step, i) => (
                                    <li key={i} className="flex gap-3 text-sm text-zinc-300 leading-relaxed">
                                        <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-bold font-mono mt-0.5">
                                            {i + 1}
                                        </span>
                                        <span>{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setSelectedBlueprint(null)}
                                className="px-5 py-2.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => {
                                    downloadFile(selectedBlueprint.downloadUrl, selectedBlueprint.fileName);
                                    setSelectedBlueprint(null);
                                }}
                                className="px-5 py-2.5 rounded-lg bg-[var(--primary)] hover:bg-[var(--primary)]/90 text-white text-sm font-medium transition-all shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download Asset
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
