"use client";

import { useEffect, useRef, useState } from "react";
import { X, ArrowRight, CheckCircle2, Loader2, Zap } from "lucide-react";

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset state when modal closes
      setTimeout(() => {
        setEmail("");
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
    if (!email || status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
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
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-[var(--primary)]/60 via-[#c77dff]/30 to-transparent opacity-70 blur-sm pointer-events-none" />

        <div className="relative rounded-2xl border border-white/10 bg-[#0a0a0a]/95 backdrop-blur-2xl p-8 md:p-10 overflow-hidden">
          {/* Ambient lights */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-[60px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-600 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-mono uppercase tracking-widest mb-5">
              <Zap className="w-3 h-3 fill-current" />
              Waitlist Open
            </div>

            {status === "success" ? (
              <div className="flex flex-col items-center text-center py-6 gap-4 animate-fade-in-up">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-white tracking-tight">You&apos;re on the list.</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
                  You&apos;ll be the first to know when enrollment opens. We&apos;ll also send you the <strong className="text-white">OPA Marketing Playbook</strong> as a gift.
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
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-3 leading-tight">
                  Enrollment Opens{" "}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e0aaff] to-[#9d4edd]">
                    Soon.
                  </span>
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed mb-7">
                  We&apos;re finalizing the launch. Join the priority waitlist and we&apos;ll notify you the moment the doors open — plus you&apos;ll receive the <strong className="text-zinc-300">OPA Marketing Playbook</strong> for free.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    ref={inputRef}
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your best email..."
                    disabled={status === "loading"}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[var(--primary)]/60 focus:bg-white/8 transition-all font-medium disabled:opacity-50 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={status === "loading" || !email}
                    className="w-full py-4 bg-gradient-to-r from-[var(--primary)] to-[#c77dff] hover:opacity-90 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_-8px_rgba(157,78,221,0.6)] hover:shadow-[0_0_50px_-8px_rgba(157,78,221,0.9)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Reserve My Spot <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                {status === "error" && (
                  <p className="mt-3 text-sm text-red-400 font-medium">{errorMsg}</p>
                )}

                <p className="mt-5 text-[10px] text-zinc-700 font-mono uppercase tracking-widest text-center">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
