"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { m as motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Loader2, Target, TrendingUp, Zap } from "lucide-react";

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<{ id: string, email: string, name: string } | null>(null);
    const [errorMsg, setErrorMsg] = useState("");

    const [formData, setFormData] = useState({
        revenue_bracket: "",
        primary_offer: "",
        biggest_bottleneck: ""
    });

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setUser({
                    id: data.user.id,
                    email: data.user.email || '',
                    name: data.user.user_metadata?.full_name || ''
                });
            }
        });
    }, []);

    const handleNext = () => {
        if (step < 3) setStep(step + 1);
        else handleSubmit();
    };

    const handleSubmit = async () => {
        if (!user) return;
        setIsLoading(true);
        setErrorMsg("");

        try {
            const res = await fetch("/api/onboarding", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    userId: user.id,
                    userEmail: user.email,
                    userName: user.name
                }),
            });

            if (res.ok) {
                router.push("/dashboard/master-course");
                router.refresh();
            } else {
                const errData = await res.json().catch(() => ({ error: "Onboarding failed on the server." }));
                setErrorMsg(`[ONBOARDING_ERROR] ${errData.error || "Failed to process onboarding."}`);
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Error during onboarding:", error);
            setErrorMsg(`[ONBOARDING_ERROR] ${error instanceof Error ? error.message : "Connection failed."}`);
            setIsLoading(false);
        }
    };

    const revenueOptions = [
        "Pre-revenue",
        "$0 - $10k / month",
        "$10k - $50k / month",
        "$50k+ / month"
    ];

    const offerOptions = [
        "1-on-1 Services (Freelance/Agency)",
        "Coaching / Consulting",
        "E-Commerce / Physical Products",
        "SaaS / Software",
        "I don't have one yet"
    ];

    const bottleneckOptions = [
        "Lack of Capital / Funding",
        "Unpredictable Lead Generation",
        "Trading Time for Money (Scaling)",
        "Sales Conversions"
    ];

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            {/* Ambient glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-xl relative z-10">
                
                {/* Progress Indicators */}
                <div className="flex gap-2 mb-8 justify-center">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ${step >= i ? 'w-12 bg-emerald-500' : 'w-4 bg-white/10'}`} />
                    ))}
                </div>

                <motion.div 
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    {step === 1 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-emerald-400 mb-6">
                                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs font-mono uppercase tracking-widest">Phase 1 of 3</div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">Current Baseline</h2>
                                </div>
                            </div>
                            
                            <p className="text-zinc-400">What is your current average monthly revenue?</p>
                            
                            <div className="grid gap-3">
                                {revenueOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setFormData({ ...formData, revenue_bracket: opt })}
                                        className={`w-full p-4 rounded-xl border text-left transition-all ${formData.revenue_bracket === opt ? 'border-emerald-500 bg-emerald-500/10 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-[var(--primary)] mb-6">
                                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs font-mono uppercase tracking-widest">Phase 2 of 3</div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">The Vehicle</h2>
                                </div>
                            </div>
                            
                            <p className="text-zinc-400">What is your primary offer or business model?</p>
                            
                            <div className="grid gap-3">
                                {offerOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setFormData({ ...formData, primary_offer: opt })}
                                        className={`w-full p-4 rounded-xl border text-left transition-all ${formData.primary_offer === opt ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[#c77dff] shadow-[0_0_15px_var(--primary)]' : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-8">
                            <div className="flex items-center gap-4 text-amber-400 mb-6">
                                <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                                    <Zap className="w-6 h-6" />
                                </div>
                                <div>
                                    <div className="text-xs font-mono uppercase tracking-widest">Final Phase</div>
                                    <h2 className="text-2xl font-bold text-white tracking-tight">The Constraint</h2>
                                </div>
                            </div>
                            
                            <p className="text-zinc-400">What is the biggest bottleneck preventing you from scaling right now?</p>
                            
                            <div className="grid gap-3">
                                {bottleneckOptions.map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => setFormData({ ...formData, biggest_bottleneck: opt })}
                                        className={`w-full p-4 rounded-xl border text-left transition-all ${formData.biggest_bottleneck === opt ? 'border-amber-500 bg-amber-500/10 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.1)]' : 'border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {errorMsg && (
                        <div className="mt-6 text-xs font-mono text-red-500 border border-red-500/20 bg-red-500/10 p-3.5 rounded-xl text-center">
                            {errorMsg}
                        </div>
                    )}

                    {/* Action Footer */}
                    <div className="mt-10 pt-6 border-t border-white/10 flex justify-between items-center">
                        {step > 1 ? (
                            <button 
                                onClick={() => setStep(step - 1)}
                                className="text-sm text-zinc-500 hover:text-white transition-colors px-4 py-2"
                            >
                                Back
                            </button>
                        ) : <div />}

                        <button
                            onClick={handleNext}
                            disabled={
                                (step === 1 && !formData.revenue_bracket) || 
                                (step === 2 && !formData.primary_offer) || 
                                (step === 3 && !formData.biggest_bottleneck) ||
                                isLoading
                            }
                            className="bg-white text-black font-bold px-8 py-3 rounded-xl flex items-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : step === 3 ? "Enter Dashboard" : "Continue"}
                            {!isLoading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}
