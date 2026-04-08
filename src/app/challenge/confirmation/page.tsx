"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    ShieldCheck,
    Zap,
    TrendingUp,
    Users,
    BarChart2,
    Layers,
    Play,
    Clock,
} from "lucide-react";

// ─── Feature Data ──────────────────────────────────────────────────────────────
const WHY_IT_WORKS = [
    {
        icon: <Layers className="w-5 h-5" />,
        title: "Unified Architecture",
        body: "Streamline your entire brand presence into a single, high-performance engine.",
        color: "text-[var(--primary)]",
        glow: "shadow-[0_0_20px_-5px_rgba(157,78,221,0.5)]",
    },
    {
        icon: <Zap className="w-5 h-5" />,
        title: "Automated Triggers",
        body: "Set and forget activation protocols that work while you sleep.",
        color: "text-emerald-400",
        glow: "shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)]",
    },
    {
        icon: <BarChart2 className="w-5 h-5" />,
        title: "Data-Driven Growth",
        body: "Real-time feedback loops that optimize your funnel every 60 seconds.",
        color: "text-sky-400",
        glow: "shadow-[0_0_20px_-5px_rgba(56,189,248,0.4)]",
    },
];

const HOW_YOU_WIN = [
    {
        icon: <TrendingUp className="w-5 h-5" />,
        title: "Rapid Scalability",
        body: "Go from local presence to global authority in record time.",
        color: "text-[var(--primary)]",
    },
    {
        icon: <ShieldCheck className="w-5 h-5" />,
        title: "Authority Dominance",
        body: "Position yourself as the undisputed leader in your niche overnight.",
        color: "text-emerald-400",
    },
    {
        icon: <BarChart2 className="w-5 h-5" />,
        title: "Exponential ROI",
        body: "Maximize every dollar spent with high-conversion activation cycles.",
        color: "text-amber-400",
    },
];

const LOGOS = ["TECHCORP", "GLOBALNET", "VELOCITY", "CYBERDYNAMICS", "AURORA"];

// ─── Urgency Bar ───────────────────────────────────────────────────────────────
function UrgencyBar() {
    const [visible, setVisible] = useState(false);
    useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);
    return (
        <div className={`w-full bg-emerald-500/10 border-b border-emerald-500/20 py-3 flex justify-center items-center gap-3 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}>
            <Clock className="h-4 w-4 text-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-sm font-bold tracking-[0.15em] uppercase">
                Wait! Your Order Is Not Complete
            </span>
        </div>
    );
}

// ─── VSL Player ───────────────────────────────────────────────────────────────
function VSLPlayer() {
    const [playing, setPlaying] = useState(false);

    return (
        <div
            className="w-full aspect-video rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 bg-black shadow-[0_0_60px_-10px_rgba(157,78,221,0.3)]"
            onClick={() => setPlaying(true)}
        >
            {/* Ambient background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-1000 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Inner glass border */}
            <div className="absolute inset-0 border border-white/[0.06] rounded-2xl pointer-events-none z-20" />

            {!playing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <button className="h-20 w-20 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:bg-emerald-500 transition-all duration-300 shadow-[0_0_40px_rgba(52,211,153,0.4)] mb-4 group/btn">
                        <Play className="h-8 w-8 ml-1.5 fill-current" />
                    </button>
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-400 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                        Watch How To 10x Your Activation Speed
                    </span>
                </div>
            ) : (
                <video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    autoPlay
                    controls
                    className="absolute inset-0 w-full h-full object-cover z-30 bg-black rounded-2xl"
                />
            )}

            {/* Progress bar decorative */}
            {!playing && (
                <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center gap-3">
                    <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[95%] bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400">32:41 / 34:52</span>
                </div>
            )}
        </div>
    );
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
function FeatureCard({ icon, title, body, color, glow = "" }: {
    icon: React.ReactNode;
    title: string;
    body: string;
    color: string;
    glow?: string;
}) {
    return (
        <div className={`group flex gap-4 p-4 rounded-xl border border-white/[0.06] bg-black/30 backdrop-blur-md hover:border-white/15 hover:bg-black/50 hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden ${glow ? `hover:${glow}` : ""}`}>
            <div className="absolute inset-0 border border-white/[0.03] rounded-xl pointer-events-none" />
            <div className={`flex-shrink-0 mt-0.5 ${color} transition-transform duration-300 group-hover:scale-110`}>
                {icon}
            </div>
            <div>
                <h4 className="text-sm font-semibold text-white tracking-tight mb-1">{title}</h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{body}</p>
            </div>
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ChallengeConfirmation() {
    return (
        <div className="min-h-screen bg-[#080808] text-white flex flex-col relative overflow-hidden">

            {/* Ambient glows */}
            <div className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[var(--primary)]/8 rounded-full blur-[180px] pointer-events-none z-0" />
            <div className="fixed bottom-0 left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] pointer-events-none z-0" />

            {/* Urgency top bar */}
            <UrgencyBar />

            {/* Nav */}
            <header className="relative z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/5">
                <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white fill-white" />
                    </div>
                    <span className="font-semibold text-sm tracking-tight">Brand Activation Network</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-zinc-500 hidden md:block">Step 2 of 3 · Special Offer</span>
                    <button className="text-xs px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 transition-colors text-zinc-300">
                        Support
                    </button>
                </div>
            </header>

            <main className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto px-5 md:px-8 py-12 gap-10">

                {/* Headline Section */}
                <div className="text-center max-w-2xl">
                    <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-4">
                        Unlock The{" "}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c77dff] via-[#9d4edd] to-[#7b2cbf]">
                            &quot;Master Accelerator&quot;
                        </span>{" "}
                        System
                    </h1>
                    <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                        Watch this short video to see how to 10x your activation speed with our proprietary framework.
                    </p>
                </div>

                {/* VSL */}
                <div className="w-full">
                    <VSLPlayer />
                </div>

                {/* Social Proof Strip */}
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {["A", "B", "C", "D"].map((l, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-[#080808] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-xs font-bold text-white"
                                >
                                    {l}
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-zinc-300">
                            Join <span className="text-white font-semibold">5,000+</span> top-tier students
                        </span>
                    </div>

                    {/* Logo Trust Strip */}
                    <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 w-full border-t border-b border-white/[0.06] py-4">
                        {LOGOS.map((l) => (
                            <span
                                key={l}
                                className="text-[10px] font-mono tracking-[0.2em] text-zinc-600 hover:text-zinc-400 transition-colors uppercase"
                            >
                                {l}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Features Two-Column */}
                <div className="grid md:grid-cols-2 gap-6 w-full">
                    {/* Why it works */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" />
                            <h3 className="text-sm font-semibold tracking-tight text-white uppercase tracking-[0.1em]">Why this works</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            {WHY_IT_WORKS.map((f) => (
                                <FeatureCard key={f.title} {...f} />
                            ))}
                        </div>
                    </div>

                    {/* How you win */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <TrendingUp className="w-4 h-4 text-[var(--primary)]" />
                            <h3 className="text-sm font-semibold tracking-tight text-white uppercase tracking-[0.1em]">How you&apos;ll win</h3>
                        </div>
                        <div className="flex flex-col gap-3">
                            {HOW_YOU_WIN.map((f) => (
                                <FeatureCard key={f.title} {...f} />
                            ))}
                        </div>
                    </div>
                </div>

                {/* CTA Box */}
                <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl p-8 md:p-10 flex flex-col items-center text-center relative overflow-hidden shadow-[0_0_80px_-20px_rgba(157,78,221,0.3)]">
                    <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/5 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 border border-white/[0.04] rounded-2xl pointer-events-none" />

                    <div className="relative z-10 flex flex-col items-center gap-5">
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-xs font-mono tracking-[0.2em] text-zinc-500 uppercase mb-1">One-Time Offer</span>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
                                Limited Time Opportunity
                            </h2>
                            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed mt-2">
                                This upgrade will never be offered again at this price. Join the elite top 1% of the Brand Activation Network today.
                            </p>
                        </div>

                        <Link
                            href={process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK || "#"}
                            className="group w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-base transition-all duration-300 shadow-[0_0_40px_-5px_rgba(52,211,153,0.6)] hover:shadow-[0_0_60px_-5px_rgba(52,211,153,0.8)] hover:-translate-y-0.5 active:scale-95"
                        >
                            YES, UPGRADE MY ORDER NOW
                            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-zinc-600">
                            <span className="flex items-center gap-1.5">
                                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                                Instant platform access
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5 text-[var(--primary)]" />
                                5,000+ active members
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Zap className="h-3.5 w-3.5 text-amber-400" />
                                Skip the waitlist
                            </span>
                        </div>
                    </div>
                </div>

                {/* Decline Link */}
                <Link
                    href="/"
                    className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline underline-offset-4 pb-6"
                >
                    No thanks, I&apos;ll pass on this one-time discount.
                </Link>

            </main>
        </div>
    );
}
