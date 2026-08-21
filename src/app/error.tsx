"use client";

import { useEffect } from "react";
import { Terminal, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--brand-bg)] flex items-center justify-center text-zinc-300 font-sans p-6 relative overflow-hidden">
      {/* Glows */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px] pointer-events-none z-0" />
      
      <div className="max-w-md w-full bg-black/40 backdrop-blur-2xl border border-[var(--brand-danger)]/20 rounded-2xl p-8 relative z-10 text-center shadow-[0_0_50px_rgba(239,68,68,0.05)]">
        <div className="h-12 w-12 rounded-xl bg-[var(--brand-danger)]/10 border border-[var(--brand-danger)]/30 flex items-center justify-center mx-auto mb-6">
          <Terminal className="h-6 w-6 text-[var(--brand-danger)]" />
        </div>
        
        <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">System Exception</h2>
        <p className="text-zinc-500 font-mono text-xs mb-6 break-words bg-black/20 p-3 rounded-lg border border-white/5 text-left max-h-40 overflow-y-auto">
          {error.message || "An unexpected system anomaly has occurred."}
        </p>

        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--brand-danger)]/10 border border-[var(--brand-danger)]/30 text-[var(--brand-danger)] text-xs font-mono uppercase tracking-widest hover:bg-[var(--brand-danger)] hover:text-black transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] font-semibold"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Reboot Node
        </button>
      </div>
    </div>
  );
}
