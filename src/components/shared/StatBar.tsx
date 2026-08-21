import React from 'react';

interface StatBarProps {
  stats: Array<{ value: string; label: string }>;
}

export function StatBar({ stats }: StatBarProps) {
  return (
    <section className="relative z-10 w-full border-y border-white/[0.06] bg-black/30 backdrop-blur-sm py-8 my-8">
      <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center text-center gap-1">
            <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">{s.value}</span>
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.15em]">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
