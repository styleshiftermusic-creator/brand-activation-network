"use client";

import Image from "next/image";
import Link from "next/link";
import { Lock, FileText, Video, CheckCircle, LayoutDashboard, Settings, LogOut, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const MODULES = [
    { num: 1, title: "The Pledge Loan Credit Hack", locked: false, completed: true, duration: "45m" },
    { num: 2, title: "Transitioning to Business Funding", locked: false, completed: false, duration: "1h 12m" },
    { num: 3, title: "The Investment Blueprint", locked: true, completed: false, duration: "55m" },
    { num: 4, title: "Marketing & Audience Leverage", locked: true, completed: false, duration: "1h 30m" },
    { num: 5, title: "High-Ticket Sales Philosophy", locked: true, completed: false, duration: "42m" },
    { num: 6, title: "Scaling with One-to-Many", locked: true, completed: false, duration: "1h 05m" },
    { num: 7, title: "Mindset & Environment", locked: true, completed: false, duration: "38m" },
];

export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoadingSession, setIsLoadingSession] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState("");
    const [authMessage, setAuthMessage] = useState("");

    useEffect(() => {
        // Fetch current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setIsAuthenticated(!!session);
            setIsLoadingSession(false);
        });

        // Listen for login/logout events securely
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(!!session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);
        setAuthError("");
        setAuthMessage("");

        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            // successful login is handled automatically by onAuthStateChange event
        } catch (error: any) {
            setAuthError(error.message);
        } finally {
            setIsLoggingIn(false);
        }
    };

    if (isLoadingSession) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-[var(--primary)]" />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[var(--background)] flex items-center justify-center relative overflow-hidden px-6">
                {/* Abstract Backgrounds */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none" />

                <div className="w-full max-w-md z-10 animate-fade-in-up">
                    <div className="flex justify-center mb-8 mix-blend-screen">
                        <Link href="/">
                            <Image src="/logo.png" alt="BAN Logo" width={220} height={80} className="h-16 md:h-20 w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform" />
                        </Link>
                    </div>

                    <div className="glass-card rounded-2xl p-8 relative flex flex-col">
                        <h1 className="text-2xl font-bold text-white mb-2 text-center">
                            Architect Login
                        </h1>
                        <p className="text-[var(--muted-foreground)] mb-8 text-sm text-center">
                            Enter your credentials to access the AI Workshop Engine.
                        </p>

                        {authError && (
                            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm text-center">
                                {authError}
                            </div>
                        )}
                        {authMessage && (
                            <div className="mb-4 p-3 bg-green-500/10 border border-green-500/50 rounded-lg text-green-500 text-sm text-center">
                                {authMessage}
                            </div>
                        )}

                        <form onSubmit={handleAuth} className="flex flex-col gap-5">
                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="architect@agency.com"
                                    className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all placeholder:text-zinc-600"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-[var(--input)] border border-[var(--border)] rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-all placeholder:text-zinc-600"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoggingIn || !email || !password}
                                className="w-full py-4 mt-4 bg-[var(--primary)] hover:bg-[#b06cf0] text-white rounded-xl font-bold text-lg transition-all duration-300 shadow-[0_0_30px_-5px_rgba(157,78,221,0.5)] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoggingIn ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Authenticating...
                                    </>
                                ) : (
                                    <>
                                        Enter Dashboard
                                        <Lock className="h-5 w-5 ml-1" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Removed the Sign Up toggle to enforce the Paywall */}
                        <div className="mt-6 text-center">
                            <Link
                                href="https://buy.stripe.com/test_4gMeV5eBA6SB9hUc5BeQM00"
                                className="text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors inline-block pb-1 border-b border-transparent hover:border-[var(--primary)]"
                            >
                                Need an account? Purchase the Workshop Engine here.
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[var(--background)] flex animate-fade-in-up">
            {/* Sidebar Layout */}
            <aside className="w-72 border-r border-[var(--border)] bg-[var(--secondary)]/20 p-6 flex flex-col hidden lg:flex">
                <div className="mix-blend-screen mb-12">
                    <Link href="/">
                        <Image src="/logo.png" alt="BAN Logo" width={150} height={50} className="w-full object-contain drop-shadow-lg hover:scale-105 transition-transform" />
                    </Link>
                </div>

                <nav className="flex flex-col gap-2 flex-grow">
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[var(--primary)] text-white font-medium">
                        <LayoutDashboard className="h-5 w-5" /> Engine Dashboard
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[var(--muted-foreground)] hover:text-white transition-colors">
                        <FileText className="h-5 w-5" /> Resources & Templates
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-[var(--muted-foreground)] hover:text-white transition-colors">
                        <Settings className="h-5 w-5" /> Account Settings
                    </a>
                </nav>

                <button
                    onClick={() => supabase.auth.signOut()}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 mt-auto transition-colors w-full text-left"
                >
                    <LogOut className="h-5 w-5" /> Log Out
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">

                    {/* Header */}
                    <header className="mb-12">
                        <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">Welcome back, Architect.</h1>
                        <p className="text-[var(--muted-foreground)]">Resume your training. You are currently on Module 2.</p>
                    </header>

                    {/* Core UI Card */}
                    <div className="glass-card rounded-2xl border border-[var(--border)] p-1 overflow-hidden">

                        {/* Progress Bar */}
                        <div className="bg-[var(--secondary)] p-6 border-b border-[var(--border)] flex items-center justify-between">
                            <div>
                                <h3 className="font-semibold text-white">AI Workshop Engine</h3>
                                <p className="text-sm text-[var(--muted-foreground)]">1 of 7 modules completed (14%)</p>
                            </div>
                            <div className="w-64 h-2 bg-black rounded-full overflow-hidden border border-white/10">
                                <div className="h-full bg-[var(--primary)] w-[14%]" />
                            </div>
                        </div>

                        {/* Module List */}
                        <div className="p-4 space-y-2">
                            {MODULES.map((mod) => (
                                <div
                                    key={mod.num}
                                    className={`flex items-center justify-between p-4 rounded-xl transition-all ${mod.locked
                                        ? "opacity-50 pointer-events-none"
                                        : "hover:bg-[var(--secondary)]/80 cursor-pointer"
                                        } ${!mod.locked && !mod.completed ? "border border-[var(--primary)]/30 bg-[var(--primary)]/5" : ""}`}
                                >
                                    <div className="flex items-center gap-4">
                                        {mod.completed ? (
                                            <div className="h-10 w-10 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center">
                                                <CheckCircle className="h-5 w-5" />
                                            </div>
                                        ) : mod.locked ? (
                                            <div className="h-10 w-10 rounded-full bg-[var(--secondary)] flex items-center justify-center text-zinc-500 border border-[var(--border)]">
                                                <Lock className="h-4 w-4" />
                                            </div>
                                        ) : (
                                            <div className="h-10 w-10 rounded-full bg-[var(--primary)] flex items-center justify-center text-white shadow-[0_0_15px_rgba(157,78,221,0.5)]">
                                                <Video className="h-5 w-5" />
                                            </div>
                                        )}
                                        <div>
                                            <div className="text-xs text-[var(--muted-foreground)] font-mono mb-1">MODULE 0{mod.num}</div>
                                            <h4 className="font-semibold text-white">{mod.title}</h4>
                                        </div>
                                    </div>
                                    <div className="text-sm text-zinc-500 font-mono">
                                        {mod.duration}
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
