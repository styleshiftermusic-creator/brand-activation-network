import React from 'react';

interface CredibilityBlockProps {
  badge: string;
  title: string;
  paragraphs: string[];
  stats: Array<{ value: string; label: string }>;
}

export function CredibilityBlock({ badge, title, paragraphs, stats }: CredibilityBlockProps) {
  return (
    <section className="relative z-10 max-w-4xl mx-auto px-6 py-20 w-full">
      <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-14 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--brand-primary)]/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative z-10 space-y-8 text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--brand-primary)] block">{badge}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
            {title}
          </h2>
          <div className="space-y-4 text-zinc-400 leading-relaxed text-sm md:text-base text-left">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4">
            {stats.map((stat) => (
              <div key={stat.label} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02]">
                <div className="text-xl md:text-2xl font-extrabold text-[var(--brand-primary)] tracking-tighter">{stat.value}</div>
                <div className="text-[10px] md:text-xs text-zinc-500 font-mono uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
