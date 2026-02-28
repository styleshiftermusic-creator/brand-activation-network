import { CheckCircle2, Lock, ChevronRight } from "lucide-react";

export function MissionFeed({
    missions,
}: {
    missions: {
        id: string;
        status: string;
        title: string;
        category: string;
        time: string;
        locked: boolean;
        completed: boolean;
    }[];
}) {
    return (
        <div className="space-y-3">
            {missions.map((mission) => (
                <div
                    key={mission.id}
                    className={`group relative bg-black/40 backdrop-blur-2xl rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${mission.locked
                        ? "border border-white/5 opacity-60"
                        : mission.completed
                            ? "border border-green-500/20 hover:border-green-500/40 hover:bg-green-900/10 hover:shadow-[0_8px_30px_-10px_rgba(34,197,94,0.2)]"
                            : "border border-[var(--primary)]/40 hover:border-[var(--primary)]/70 hover:bg-[var(--primary)]/5 hover:shadow-[0_10px_40px_-15px_var(--primary)]"
                        }`}
                >
                    {/* Inner Glass border and gradient */}
                    <div className="absolute inset-0 border border-white/[0.02] rounded-xl pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />

                    {/* Active subtle glow behind the item */}
                    {!mission.locked && !mission.completed && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    )}

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 relative z-10 gap-4">
                        <div className="flex items-center gap-5">
                            {/* Status Indicator */}
                            <div className="flex-shrink-0 w-12 flex justify-center">
                                {mission.completed ? (
                                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                                ) : mission.locked ? (
                                    <Lock className="h-5 w-5 text-zinc-600" />
                                ) : (
                                    <div className="relative">
                                        <div className="h-6 w-6 rounded-full border-2 border-[var(--primary)] border-t-transparent animate-spin" />
                                        <div className="absolute inset-0 h-6 w-6 rounded-full bg-[var(--primary)]/20 animate-pulse blur" />
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="text-[10px] font-mono text-zinc-500 tracking-widest">{mission.id}</span>
                                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border tracking-widest uppercase ${mission.completed ? 'bg-green-500/10 border-green-500/20 text-green-400 shadow-[0_0_10px_-2px_rgba(34,197,94,0.3)]' :
                                        mission.locked ? 'bg-zinc-900 border-zinc-800 text-zinc-600' :
                                            'bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)] shadow-[0_0_15px_-3px_var(--primary)]'
                                        }`}>
                                        {mission.category.replace(/[\[\]]/g, '')}
                                    </span>
                                </div>
                                <h4 className={`font-medium text-lg tracking-tight ${mission.locked ? 'text-zinc-500' : 'text-zinc-200'}`}>
                                    {mission.title}
                                </h4>
                            </div>
                        </div>

                        <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:pl-0 pl-[68px]">
                            <div className="flex flex-col items-start sm:items-end">
                                <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">Runtime est.</span>
                                <span className="text-sm font-mono text-zinc-400">{mission.time}</span>
                            </div>

                            {!mission.locked && (
                                <button className={`p-2 rounded-lg border transition-all duration-300 ${mission.completed
                                    ? "bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] group-hover:translate-x-1"
                                    : "bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)] hover:text-white hover:scale-110 hover:shadow-[0_0_20px_var(--primary)] group-hover:translate-x-1"
                                    }`}>
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
