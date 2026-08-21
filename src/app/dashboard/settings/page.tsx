"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { User, Lock, ShieldCheck, Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "success" | "error";

export default function SettingsPage() {
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [profileStatus, setProfileStatus] = useState<Status>("idle");
    const [profileMsg, setProfileMsg] = useState("");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordStatus, setPasswordStatus] = useState<Status>("idle");
    const [passwordMsg, setPasswordMsg] = useState("");

    useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                setEmail(user.email ?? "");
                setDisplayName(user.user_metadata?.full_name ?? "");
            }
        });
    }, []);

    const saveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileStatus("loading");
        setProfileMsg("");
        try {
            const { error } = await supabase.auth.updateUser({
                data: { full_name: displayName },
            });
            if (error) throw error;
            setProfileStatus("success");
            setProfileMsg("Profile updated successfully.");
        } catch (err) {
            setProfileStatus("error");
            setProfileMsg(err instanceof Error ? err.message : "Failed to update profile.");
        }
    };

    const changePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setPasswordMsg("");
        if (newPassword !== confirmPassword) {
            setPasswordStatus("error");
            setPasswordMsg("Passwords do not match.");
            return;
        }
        if (newPassword.length < 8) {
            setPasswordStatus("error");
            setPasswordMsg("Password must be at least 8 characters.");
            return;
        }
        setPasswordStatus("loading");
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            setPasswordStatus("success");
            setPasswordMsg("Password changed successfully.");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            setPasswordStatus("error");
            setPasswordMsg(err instanceof Error ? err.message : "Failed to change password.");
        }
    };

    return (
        <div className="min-h-screen bg-[var(--brand-bg)] flex text-zinc-300 font-sans selection:bg-[var(--primary)]/30 relative overflow-hidden">
            <div className="fixed top-0 right-1/4 w-[600px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />
            <Sidebar />

            <main className="flex-1 p-6 lg:p-10 overflow-y-auto z-10 relative">
                <div className="max-w-2xl mx-auto">

                    {/* Header */}
                    <header className="mb-10 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] tracking-widest uppercase">
                                Account
                            </span>
                        </div>
                        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-white">Settings</h1>
                        <p className="text-sm text-zinc-500 mt-1 font-mono">{email}</p>
                    </header>

                    <div className="flex flex-col gap-6">

                        {/* ─── Profile Card ─── */}
                        <div className="bg-black/40 backdrop-blur-xl border border-white/8 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="h-9 w-9 rounded-xl bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center">
                                    <User className="h-4 w-4 text-[var(--primary)]" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-white tracking-tight">Profile</h2>
                                    <p className="text-[11px] text-zinc-500 font-mono">Display name shown across your dashboard</p>
                                </div>
                            </div>

                            <form onSubmit={saveProfile} className="flex flex-col gap-4 relative z-10">
                                <div>
                                    <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block">
                                        Display Name
                                    </label>
                                    <input
                                        type="text"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="Your full name"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--primary)]/50 focus:bg-white/8 transition-all text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        disabled
                                        className="w-full bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3 text-zinc-600 text-sm cursor-not-allowed"
                                    />
                                    <p className="text-[10px] text-zinc-600 font-mono mt-1.5">Email cannot be changed. Contact support if needed.</p>
                                </div>

                                {profileMsg && (
                                    <div className={`flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg ${profileStatus === "success" ? "bg-[var(--brand-secondary)]/10 border border-[var(--brand-secondary)]/20 text-[var(--brand-secondary-light)]" : "bg-[var(--brand-danger)]/10 border border-[var(--brand-danger)]/20 text-[var(--brand-danger)]"}`}>
                                        {profileStatus === "success" ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                                        {profileMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={profileStatus === "loading"}
                                    className="self-start flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)]/10 border border-[var(--primary)]/30 text-[var(--primary)] rounded-xl text-sm font-medium hover:bg-[var(--primary)]/20 hover:border-[var(--primary)]/50 transition-all duration-300 disabled:opacity-50"
                                >
                                    {profileStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Profile
                                </button>
                            </form>
                        </div>

                        {/* ─── Password Card ─── */}
                        <div className="bg-black/40 backdrop-blur-xl border border-white/8 rounded-2xl p-6 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                            <div className="flex items-center gap-3 mb-6 relative z-10">
                                <div className="h-9 w-9 rounded-xl bg-[var(--brand-warning)]/10 border border-[var(--brand-warning)]/20 flex items-center justify-center">
                                    <Lock className="h-4 w-4 text-[var(--brand-warning)]" />
                                </div>
                                <div>
                                    <h2 className="text-sm font-semibold text-white tracking-tight">Change Password</h2>
                                    <p className="text-[11px] text-zinc-500 font-mono">Minimum 8 characters required</p>
                                </div>
                            </div>

                            <form onSubmit={changePassword} className="flex flex-col gap-4 relative z-10">
                                {[
                                    { label: "New Password", value: newPassword, set: setNewPassword, id: "new-password" },
                                    { label: "Confirm New Password", value: confirmPassword, set: setConfirmPassword, id: "confirm-password" },
                                ].map((field) => (
                                    <div key={field.id}>
                                        <label htmlFor={field.id} className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-1.5 block">
                                            {field.label}
                                        </label>
                                        <input
                                            id={field.id}
                                            type="password"
                                            value={field.value}
                                            onChange={(e) => field.set(e.target.value)}
                                            required
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--brand-warning)]/40 focus:bg-white/8 transition-all text-sm"
                                        />
                                    </div>
                                ))}

                                {passwordMsg && (
                                    <div className={`flex items-center gap-2 text-xs font-mono px-3 py-2 rounded-lg ${passwordStatus === "success" ? "bg-[var(--brand-secondary)]/10 border border-[var(--brand-secondary)]/20 text-[var(--brand-secondary-light)]" : "bg-[var(--brand-danger)]/10 border border-[var(--brand-danger)]/20 text-[var(--brand-danger)]"}`}>
                                        {passwordStatus === "success" ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" /> : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />}
                                        {passwordMsg}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={passwordStatus === "loading"}
                                    className="self-start flex items-center gap-2 px-5 py-2.5 bg-[var(--brand-warning)]/10 border border-[var(--brand-warning)]/30 text-[var(--brand-warning)] rounded-xl text-sm font-medium hover:bg-[var(--brand-warning)]/20 hover:border-[var(--brand-warning)]/50 transition-all duration-300 disabled:opacity-50"
                                >
                                    {passwordStatus === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldCheck className="w-4 h-4" />}
                                    Update Password
                                </button>
                            </form>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}
