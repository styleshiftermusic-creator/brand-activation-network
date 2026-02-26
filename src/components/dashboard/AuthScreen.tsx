import { useState, useEffect } from "react";
import { Terminal, Loader2, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { z } from "zod";

export function AuthScreen() {
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isResetMode, setIsResetMode] = useState(false);
    const [authError, setAuthError] = useState("");
    const [authMessage, setAuthMessage] = useState("");
    const [bootSequence, setBootSequence] = useState<string[]>([]);

    useEffect(() => {
        const logs = [
            "> INITIATING SECURE CONNECTION...",
            "> VERIFYING ENCRYPTION PROTOCOLS...",
            "> ESTABLISHING UPLINK TO MISSION CONTROL...",
            "> TERMINAL READY. AWAITING CREDENTIALS."
        ];
        let i = 0;
        const interval = setInterval(() => {
            if (i < logs.length) {
                setBootSequence(prev => [...prev, logs[i]]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, 400);
        return () => clearInterval(interval);
    }, []);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setAuthError("");
        setAuthMessage("");

        try {
            if (isResetMode) {
                const parsedEmail = z.string().email("Invalid email address").safeParse(email);
                if (!parsedEmail.success) {
                    setAuthError(parsedEmail.error.issues[0].message);
                    return;
                }
                const { error } = await supabase.auth.resetPasswordForEmail(email, {
                    redirectTo: `${window.location.origin}/dashboard`,
                });
                if (error) throw error;
                setAuthMessage("Magic link routed. Check secure inbox.");
                setIsResetMode(false);
            } else {
                const parsedAuth = z.object({
                    email: z.string().email("Invalid email address"),
                    password: z.string().min(1, "Password is required")
                }).safeParse({ email, password });

                if (!parsedAuth.success) {
                    setAuthError(parsedAuth.error.issues[0].message);
                    return;
                }
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
            }
        } catch (error: any) {
            setAuthError(`[AUTH_ERROR] ${error.message}`);
        } finally {
            setIsLoggingIn(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center relative overflow-hidden px-6 font-mono selection:bg-[var(--primary)]/30">
            {/* CRT Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-50"></div>
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)] z-40 opacity-80"></div>

            {/* Subtle Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--primary)]/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="w-full max-w-lg z-10 animate-fade-in-up">
                <div className="flex flex-col items-center mb-10">
                    <Terminal className="h-12 w-12 text-[var(--primary)] mb-4 animate-pulse opacity-80" />
                    <h1 className="text-xl font-bold text-white tracking-[0.2em] uppercase text-center">Brand Activation Network</h1>
                    <p className="text-[var(--primary)] text-xs tracking-widest mt-2 uppercase text-center">Secure Access Terminal</p>
                </div>

                <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-xl p-8 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    {/* Fake terminal boot lines */}
                    <div className="mb-8 text-xs text-green-400/70 font-mono space-y-1 min-h-[80px]">
                        {bootSequence.map((log, idx) => (
                            <div key={idx} className="animate-fade-in-up">{log}</div>
                        ))}
                        {bootSequence.length === 4 && (
                            <div className="animate-pulse">_</div>
                        )}
                    </div>

                    {authError && (
                        <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-xs font-mono">
                            {authError}
                        </div>
                    )}
                    {authMessage && (
                        <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded text-green-400 text-xs font-mono">
                            {authMessage}
                        </div>
                    )}

                    <form onSubmit={handleAuth} className="flex flex-col gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-wider text-zinc-500">Node Identifier [Email]</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border-b-2 border-white/10 px-0 py-2 text-white font-mono focus:border-[var(--primary)] focus:outline-none transition-colors placeholder:text-zinc-800 rounded-none"
                                placeholder="architect@agency.com"
                            />
                        </div>

                        {!isResetMode && (
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-wider text-zinc-500">Security Clearance [Password]</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border-b-2 border-white/10 px-0 py-2 text-white font-mono focus:border-[var(--primary)] focus:outline-none transition-colors placeholder:text-zinc-800 rounded-none tracking-widest"
                                    placeholder="••••••••"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoggingIn || !email || (!isResetMode && !password)}
                            className="w-full py-3 mt-4 bg-white/5 hover:bg-[var(--primary)]/20 border border-[var(--primary)]/50 text-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-all duration-300 font-mono text-sm tracking-widest uppercase flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoggingIn ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    PROCESSING...
                                </>
                            ) : (
                                <>
                                    {isResetMode ? "TRANSMIT RECOVERY LINK" : "INITIALIZE UPLINK"}
                                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-4">
                        <button
                            type="button"
                            onClick={() => {
                                setIsResetMode(!isResetMode);
                                setAuthError("");
                                setAuthMessage("");
                            }}
                            className="text-xs text-zinc-600 hover:text-[var(--primary)] transition-colors uppercase tracking-wider"
                        >
                            {isResetMode ? "< CANCEL" : "OVERRIDE CLEARANCE?"}
                        </button>

                        <span className="text-xs text-zinc-700 font-mono">v1.0.4 - SECURE</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
