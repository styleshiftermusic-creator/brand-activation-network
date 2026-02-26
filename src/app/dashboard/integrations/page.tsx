"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { useState } from "react";
import { CreditCard, Mail, Database, Bot, Webhook, Plus, Trash2, ShieldCheck, Sparkles } from "lucide-react";

// Initial Integrations state
const INITIAL_INTEGRATIONS = [
    { id: "stripe", name: "Stripe Billing", description: "Process payments and manage subscription tiers automatically.", icon: <CreditCard className="w-5 h-5" />, connected: true },
    { id: "resend", name: "Resend", description: "Transactional email delivery for automated onboarding sequences.", icon: <Mail className="w-5 h-5" />, connected: true },
    { id: "supabase", name: "Supabase DB", description: "PostgreSQL edge database and row-level security policies.", icon: <Database className="w-5 h-5" />, connected: true },
    { id: "openai", name: "OpenAI GPT-4", description: "Language models for autonomous marketing copy generation.", icon: <Bot className="w-5 h-5" />, connected: false },
    { id: "anthropic", name: "Anthropic MCP", description: "Model Context Protocol linking for advanced AI reasoning.", icon: <Sparkles className="w-5 h-5" />, connected: false },
];

export default function IntegrationsPage() {
    const [integrations, setIntegrations] = useState(INITIAL_INTEGRATIONS);
    const [webhooks] = useState([
        { id: "wh-01", name: "Zapier Catch Hook", url: "https://hooks.zapier.com/hooks/catch/12345/abcde/" }
    ]);

    const toggleIntegration = (id: string) => {
        setIntegrations(integrations.map(int => int.id === id ? { ...int, connected: !int.connected } : int));
    };

    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto z-10 relative">
                <div className="max-w-5xl mx-auto animate-fade-in-up">
                    <header className="mb-10 border-b border-white/10 pb-6 flex justify-between items-end">
                        <div>
                            <h1 className="text-3xl font-medium tracking-tight text-white mb-2">System Integrations</h1>
                            <p className="text-zinc-500 font-mono text-sm max-w-2xl">
                                Configure external data sources, payment loops, and AI Model Context Protocols (MCP).
                            </p>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-[10px] font-mono uppercase tracking-widest">
                            <ShieldCheck className="w-3 h-3" /> Secure Connections
                        </div>
                    </header>

                    {/* Active Connections Grid */}
                    <div className="mb-12">
                        <h3 className="text-lg font-medium text-white mb-6 tracking-tight">Active Nodes</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                            {integrations.map((int) => (
                                <div key={int.id} className={`relative p-6 rounded-xl border transition-all duration-300 bg-black/40 backdrop-blur-md overflow-hidden group ${int.connected ? 'border-[var(--primary)]/30 shadow-[0_0_20px_rgba(var(--primary-rgb),0.05)]' : 'border-white/5 opacity-70 hover:opacity-100 hover:border-white/20'}`}>
                                    {int.connected && (
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--primary)]/10 blur-[20px] rounded-full -translate-y-1/2 translate-x-1/2" />
                                    )}
                                    <div className="flex justify-between items-start mb-4 relative z-10">
                                        <div className={`p-2 rounded-lg ${int.connected ? 'bg-[var(--primary)]/20 text-[var(--primary)]' : 'bg-white/5 text-zinc-500 group-hover:bg-white/10 group-hover:text-zinc-400 transition-colors'}`}>
                                            {int.icon}
                                        </div>
                                        <button
                                            onClick={() => toggleIntegration(int.id)}
                                            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out relative ${int.connected ? 'bg-[var(--primary)]' : 'bg-zinc-800 group-hover:bg-zinc-700'}`}
                                        >
                                            <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out ${int.connected ? 'translate-x-6' : 'translate-x-0'}`} />
                                        </button>
                                    </div>
                                    <h4 className={`font-medium mb-1 tracking-tight ${int.connected ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300 transition-colors'}`}>{int.name}</h4>
                                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed">{int.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Webhooks Section */}
                    <div>
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-medium text-white tracking-tight flex items-center gap-2">
                                <Webhook className="w-5 h-5 text-zinc-400" />
                                Custom Webhooks
                            </h3>
                            <button className="flex items-center gap-2 text-xs font-mono text-[var(--primary)] hover:text-white transition-colors uppercase tracking-wider">
                                <Plus className="w-3 h-3" /> Add Endpoint
                            </button>
                        </div>

                        <div className="bg-black/40 border border-white/5 rounded-xl backdrop-blur-md overflow-hidden">
                            {webhooks.map((hook, idx) => (
                                <div key={hook.id} className={`p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${idx !== 0 ? 'border-t border-white/5' : ''}`}>
                                    <div>
                                        <div className="text-sm font-medium text-zinc-300 mb-1">{hook.name}</div>
                                        <div className="text-[10px] font-mono text-zinc-600 bg-white/5 border border-white/5 px-2 py-1 rounded inline-block truncate max-w-[200px] sm:max-w-md">
                                            {hook.url}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                        <button className="flex-1 sm:flex-none text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors border border-white/10 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-center">
                                            Test Hook
                                        </button>
                                        <button className="p-1.5 text-zinc-600 hover:text-red-400 transition-colors bg-white/5 border border-white/5 rounded hover:bg-red-500/10 hover:border-red-500/20">
                                            <Trash2 className="w-4 h-4" />
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
