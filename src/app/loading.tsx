import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center text-zinc-300 font-sans p-6 relative overflow-hidden">
      {/* Deep Ambient Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--primary)]/5 rounded-full blur-[150px] pointer-events-none z-0" />
      
      <div className="flex flex-col items-center gap-4 relative z-10">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--primary)] shadow-[0_0_15px_var(--primary)] rounded-full" />
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em] animate-pulse">
          Establishing Node Uplink...
        </span>
      </div>
    </div>
  );
}
