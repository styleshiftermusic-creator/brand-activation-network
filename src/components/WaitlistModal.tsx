"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, ArrowRight, CheckCircle2, Loader2, Zap } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: "waitlist" | "blueprint";
}

export function WaitlistModal({ isOpen, onClose, variant = "waitlist" }: WaitlistModalProps) {
  const isBlueprint = variant === "blueprint";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [revenue, setRevenue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset state when modal closes
      setTimeout(() => {
        setName("");
        setEmail("");
        setPhone("");
        setRevenue("");
        setStatus("idle");
        setErrorMsg("");
      }, 300);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          email, 
          phone,
          revenue,
          referredBy: typeof window !== "undefined" ? localStorage.getItem("ban_ref") : null 
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg z-10 transition-all duration-300 ${
          isOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"
        }`}
      >
        {/* Glow ring */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/60 via-[var(--brand-primary-light)]/30 to-transparent opacity-70 blur-sm pointer-events-none" />

        <div className="relative rounded-2xl border border-white/10 bg-[var(--brand-surface)]/95 backdrop-blur-2xl p-8 md:p-10 overflow-hidden">
          {/* Ambient lights */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-primary)]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[var(--brand-secondary)]/5 rounded-full blur-[60px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/10 text-[var(--brand-primary)] text-xs font-mono uppercase tracking-widest mb-5">
              <Zap className="w-3 h-3 fill-current" />
              {isBlueprint ? "Free Blueprint" : "Application Active"}
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-6 gap-4 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-[var(--brand-secondary)]/10 border border-[var(--brand-secondary)]/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-[var(--brand-secondary-light)]" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">You&apos;re in.</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                  {isBlueprint
                    ? <>Check your inbox for the <strong className="text-white">BAN Credit Sweep Blueprint</strong>. Start with Method 1 — you can call today.</>
                    : <>You&apos;ll be the first to know when enrollment opens. We&apos;ll also send you the <strong className="text-white">BAN Credit Sweep Blueprint</strong> as a free gift.</>
                  }
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 text-xs font-mono uppercase tracking-widest text-zinc-600 hover:text-zinc-400 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3 leading-tight font-heading">
                  {isBlueprint ? (
                    <>Get the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-secondary-light)] to-emerald-300">Free Blueprint</span></>
                  ) : (
                    <>Apply For <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary-light)] to-[var(--brand-primary)]">Network Access.</span></>
                  )}
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-7">
                  {isBlueprint
                    ? <>Enter your info below and we&apos;ll send you the <strong className="text-zinc-300">BAN Credit Sweep Blueprint</strong> — the exact scripts our members use to remove hard inquiries in 24 hours.</>
                    : <>The Master Blueprint is restricted to serious founders. Submit your application below. If approved, you will receive an immediate invitation link.</>
                  }
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    ref={inputRef}
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    disabled={status === "loading"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--brand-primary)]/60 focus:bg-white/8 transition-all font-medium disabled:opacity-50 text-sm"
                  />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    disabled={status === "loading"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--brand-primary)]/60 focus:bg-white/8 transition-all font-medium disabled:opacity-50 text-sm"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number (Optional)"
                    disabled={status === "loading"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--brand-primary)]/60 focus:bg-white/8 transition-all font-medium disabled:opacity-50 text-sm"
                  />
                  <select
                    required
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                    disabled={status === "loading"}
                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-[var(--brand-primary)]/60 focus:bg-white/8 transition-all font-medium disabled:opacity-50 appearance-none ${revenue ? "text-white" : "text-zinc-600"}`}
                  >
                    <option value="" disabled>Current Monthly Revenue</option>
                    <option value="0-10k" className="text-black">$0 - $10,000 / mo</option>
                    <option value="10k-50k" className="text-black">$10,000 - $50,000 / mo</option>
                    <option value="50k+" className="text-black">$50,000+ / mo</option>
                  </select>
                  <button
                    type="submit"
                    disabled={status === "loading" || !name || !email || !revenue}
                    className="w-full py-4 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_-8px_var(--brand-glow-primary),0.6)] hover:shadow-[0_0_50px_-8px_var(--brand-glow-primary),0.9)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        {isBlueprint ? "Send Me the Blueprint" : "Submit Application"} <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {status === "error" && (
                  <p className="mt-3 text-sm text-[var(--brand-danger)] font-medium">{errorMsg}</p>
                )}

                <p className="mt-5 text-[10px] text-zinc-700 font-mono uppercase tracking-widest text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
