"use client";

import { CheckCircle2 } from "lucide-react";

const RESULTS = [
  "Marcus T. · $150K funded in 89 days",
  "Aisha R. · $42K closed first month",
  "Devon L. · 3x revenue, 50% fewer hours",
  "BAN Member · $85K 0% APR business line",
  "BAN Member · First $10K client in 3 weeks",
  "BAN Member · $250K funding stack built in 120 days",
  "BAN Member · Replaced 4 contractors with AI ops",
  "BAN Member · $18K/mo → $54K/mo in one quarter",
];

export function ResultsTicker() {
  // Double the items for seamless loop
  const items = [...RESULTS, ...RESULTS];

  return (
    <div className="relative z-10 w-full overflow-hidden py-6 border-y border-white/[0.04] bg-white/[0.01]">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[var(--brand-bg)] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[var(--brand-bg)] to-transparent z-10 pointer-events-none" />

      <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
        {items.map((result, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-6 text-sm text-zinc-400 whitespace-nowrap shrink-0"
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand-secondary)] shrink-0" />
            <span>{result}</span>
            <span className="text-white/10 ml-4">·</span>
          </div>
        ))}
      </div>
    </div>
  );
}
