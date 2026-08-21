import React from 'react';
import { Zap } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface FeatureGridProps {
  badge: string;
  title: string;
  subtitle: string;
  items: Array<{ index: string; title: string; desc: string; tag: string }>;
  bonus?: { title: string; desc: string; icon?: React.ReactNode };
}

export function FeatureGrid({ badge, title, subtitle, items, bonus }: FeatureGridProps) {
  return (
    <section id="modules" className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {items.map((mod) => (
          <div
            key={mod.index}
            className="group relative p-6 rounded-2xl border border-white/[0.06] bg-black/25 backdrop-blur-md hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5 transition-all duration-400 hover:-translate-y-1 overflow-hidden text-left"
          >
            <div className="absolute inset-0 border border-white/[0.03] rounded-2xl pointer-events-none" />
            <div className="flex items-start justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--brand-primary)] transition-all duration-400">
                <span className="text-sm font-bold text-[var(--brand-primary)]">{mod.index}</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-700 tracking-widest border border-white/5 px-2 py-0.5 rounded-full">
                {mod.tag}
              </span>
            </div>
            <h4 className="font-semibold text-white mb-2 tracking-tight group-hover:text-[var(--brand-primary)] transition-colors duration-300 leading-snug">
              {mod.title}
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{mod.desc}</p>
          </div>
        ))}

        {bonus && (
          <div className="group relative p-6 rounded-2xl border border-[var(--brand-warning)]/20 bg-[var(--brand-warning)]/5 backdrop-blur-md hover:border-[var(--brand-warning)]/40 transition-all duration-400 hover:-translate-y-1 overflow-hidden text-left">
            <div className="flex items-start justify-between mb-4">
              <div className="h-10 w-10 rounded-lg bg-[var(--brand-warning)]/10 border border-[var(--brand-warning)]/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--brand-warning)] transition-all duration-400">
                {bonus.icon || <Zap className="w-5 h-5 text-[var(--brand-warning)] fill-current" />}
              </div>
              <span className="text-[9px] font-mono text-[var(--brand-warning)] tracking-widest border border-[var(--brand-warning)]/20 px-2 py-0.5 rounded-full uppercase">BONUS</span>
            </div>
            <h4 className="font-semibold text-[var(--brand-warning)] mb-2 tracking-tight leading-snug">{bonus.title}</h4>
            <p className="text-xs text-zinc-500 leading-relaxed">{bonus.desc}</p>
          </div>
        )}
      </div>
    </section>
  );
}
