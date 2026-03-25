"use client";

import { Sidebar } from "@/components/dashboard/Sidebar";
import { Lock, Cpu, Orbit, Sparkles } from "lucide-react";

export default function AntiGravitySystemPage() {
    return (
        <div className="min-h-screen bg-[#050505] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            {/* Deep Ambient Glows - Tech / AntiGravity theme */}
            <div className="fixed top-0 left-1/4 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-sky-900/5 rounded-full blur-[150px] pointer-events-none z-0" />

            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto z-10 flex items-center justify-center relative">
                <div className="max-w-3xl w-full">
                    {/* Coming Soon Card */}
                    <div className="relative group rounded-3xl overflow-hidden border border-indigo-500/20 bg-black/40 backdrop-blur-2xl p-12 md:p-20 text-center flex flex-col items-center">
                        
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer pointer-events-none" />
                        
                        {/* Subtle Glow Background */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
                        
                        <div className="relative z-10">
                            {/* Icon Assembly */}
                            <div className="relative w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                                <Orbit className="w-full h-full text-indigo-500/20 absolute animate-[spin_10s_linear_infinite]" />
                                <Cpu className="w-12 h-12 text-indigo-400 absolute" />
                                <div className="absolute -top-1 -right-1 bg-black rounded-full p-1.5 border border-indigo-500/30">
                                    <Lock className="w-4 h-4 text-indigo-300" />
                                </div>
                            </div>

                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono tracking-[0.2em] uppercase mb-6">
                                <Sparkles className="w-3 h-3" /> System Locked
                            </span>

                            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-white mb-6 uppercase">
                                The <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-sky-400">AntiGravity</span> System
                            </h1>

                            <p className="text-zinc-400 text-lg leading-relaxed max-w-xl mx-auto mb-10 font-light">
                                The ultimate AI autonomous agency framework is currently undergoing core stability hardening. This hyper-advanced secondary training module will drop in Q3.
                            </p>

                            <div className="inline-flex flex-col items-center gap-2">
                                <button disabled className="px-10 py-4 bg-white/5 border border-white/10 text-zinc-500 font-mono tracking-widest text-sm uppercase rounded-xl cursor-not-allowed">
                                    Awaiting Clearance
                                </button>
                                <p className="text-[10px] text-zinc-600 font-mono mt-2 uppercase tracking-widest">
                                    ETA: Access Vector Establishing
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
