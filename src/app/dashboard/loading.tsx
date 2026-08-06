import { Loader2 } from "lucide-react";

export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 min-h-[70vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--primary)]" />
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-[0.2em] animate-pulse">
          Downloading Telemetry Chunks...
        </span>
      </div>
    </div>
  );
}
