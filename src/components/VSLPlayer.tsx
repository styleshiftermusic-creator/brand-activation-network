"use client";

import { useState } from "react";
import { Play } from "lucide-react";

export function VSLPlayer() {
    const [playing, setPlaying] = useState(false);

    return (
        <div
            className="w-full aspect-video rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10 bg-black shadow-[0_0_60px_-10px_var(--brand-glow-primary),0.3)]"
            onClick={() => setPlaying(true)}
        >
            {/* Ambient background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop')] bg-cover bg-center opacity-30 group-hover:opacity-45 group-hover:scale-105 transition-all duration-1000 mix-blend-luminosity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            {/* Inner glass border */}
            <div className="absolute inset-0 border border-white/[0.06] rounded-2xl pointer-events-none z-20" />

            {!playing ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                    <button className="h-20 w-20 rounded-full bg-[var(--brand-secondary)]/20 border border-[var(--brand-secondary)]/50 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 hover:bg-[var(--brand-secondary)] transition-all duration-300 shadow-[0_0_40px_var(--brand-glow-secondary),0.4)] mb-4 group/btn">
                        <Play className="h-8 w-8 ml-1.5 fill-current" />
                    </button>
                    <span className="text-xs font-mono tracking-[0.2em] uppercase text-zinc-400 bg-black/50 px-3 py-1 rounded-full border border-white/10">
                        Watch How To 10x Your Activation Speed
                    </span>
                </div>
            ) : (
                <video
                    src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    autoPlay
                    controls
                    className="absolute inset-0 w-full h-full object-cover z-30 bg-black rounded-2xl"
                />
            )}

            {/* Progress bar decorative */}
            {!playing && (
                <div className="absolute bottom-4 left-6 right-6 z-10 flex items-center gap-3">
                    <div className="flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full w-[95%] bg-gradient-to-r from-[var(--brand-secondary)] to-[var(--brand-secondary-light)] rounded-full" />
                    </div>
                    <span className="text-xs font-mono text-zinc-400">01:00 / 01:00</span>
                </div>
            )}
        </div>
    );
}
