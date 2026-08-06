"use client";

import { useEffect } from "react";
import { Terminal, RefreshCw } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard Operations Error:", error);
  }, [error]);

  return (
    <div className="flex-1 flex items-center justify-center p-6 min-h-[70vh]">
      <div className="max-w-md w-full bg-black/40 backdrop-blur-2xl border border-red-500/20 rounded-2xl p-8 text-center shadow-[0_0_50px_rgba(239,68,68,0.05)] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 blur-[40px] rounded-full pointer-events-none" />
        
        <div className="h-12 w-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
          <Terminal className="h-6 w-6 text-red-500" />
        </div>
        
        <h2 className="text-lg font-medium text-white mb-2 tracking-tight">Directive Execution Interrupted</h2>
        <p className="text-zinc-500 font-mono text-[11px] mb-6 text-left break-words bg-black/20 p-3 rounded-lg border border-white/5 max-h-36 overflow-y-auto">
          {error.message || "An exception occurred in this interface."}
        </p>

        <button
          onClick={() => reset()}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono uppercase tracking-widest hover:bg-red-500 hover:text-black transition-all duration-300 font-semibold"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Recover Subsystem
        </button>
      </div>
    </div>
  );
}
