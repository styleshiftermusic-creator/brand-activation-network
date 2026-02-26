"use client";

import { ArrowRight, ShieldCheck, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Turnstile } from "@marsidev/react-turnstile";
import { z } from "zod";

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    phone: z.string().optional(),
});

export default function RegistrationForm() {
    const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [turnstileToken, setTurnstileToken] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg("");

        if (!turnstileToken && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
            setErrorMsg("Please complete the bot protection check.");
            return;
        }

        const parsed = registerSchema.safeParse(formData);
        if (!parsed.success) {
            setErrorMsg(parsed.error.issues[0].message);
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, turnstileToken }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setIsSuccess(true);
            } else {
                setErrorMsg(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error("Registration failed", error);
            setErrorMsg("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in-up">
                <div className="h-16 w-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Registration Confirmed</h3>
                <p className="text-[var(--muted-foreground)]">Your spot is secured. Check your email for the Workshop Engine playbook.</p>
                <button
                    onClick={() => window.location.href = "https://buy.stripe.com/test_4gMeV5eBA6SB9hUc5BeQM00"}
                    className="mt-8 px-6 py-3 bg-[var(--primary)] hover:bg-[#b06cf0] text-white rounded-xl font-medium transition-all shadow-[0_0_30px_-5px_rgba(157,78,221,0.5)]"
                >
                    Unlock the AI Workshop Engine
                </button>
            </div>
        );
    }

    return (
        <div className="glass-card rounded-2xl p-8 relative flex flex-col">
            <h3 className="text-2xl font-bold text-white mb-2">Claim Your Spot</h3>
            <p className="text-[var(--muted-foreground)] mb-8 text-sm">Enter your details to register for the live event and receive the immediate playbook.</p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {errorMsg && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl flex items-center gap-3 text-sm">
                        <AlertCircle className="h-5 w-5 flex-shrink-0" />
                        <p>{errorMsg}</p>
                    </div>
                )}

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all placeholder:text-zinc-600"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
                    <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all placeholder:text-zinc-600"
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-sm font-medium text-zinc-300 ml-1">Phone Number (For SMS reminders)</label>
                    <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(555) 123-4567"
                        className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all placeholder:text-zinc-600"
                    />
                </div>

                {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
                    <div className="py-2">
                        <Turnstile
                            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
                            onSuccess={(token) => setTurnstileToken(token)}
                            options={{ theme: 'dark' }}
                        />
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 mt-2 bg-[var(--primary)] hover:bg-[#b06cf0] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_-5px_rgba(157,78,221,0.5)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="h-5 w-5 animate-spin" />
                            Registering...
                        </>
                    ) : (
                        <>
                            Register For Free
                            <ArrowRight className="h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </button>
            </form>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-zinc-500">
                <ShieldCheck className="h-4 w-4" /> Your data is secure and never sold.
            </div>
        </div>
    );
}
