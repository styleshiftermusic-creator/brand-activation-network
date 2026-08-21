import React from 'react';
import { SectionHeader } from './SectionHeader';

interface ProcessTimelineProps {
  badge: string;
  title: string;
  subtitle: string;
  steps: Array<{ step: string; icon: React.ReactNode; title: string; desc: string }>;
}

export function ProcessTimeline({ badge, title, subtitle, steps }: ProcessTimelineProps) {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full border-t border-white/[0.06]">
      <SectionHeader badge={badge} title={title} subtitle={subtitle} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-[var(--brand-primary)]/30 to-transparent -z-10" />

        {steps.map((item, i) => (
          <div key={i} className="relative flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 relative group shadow-[0_0_30px_-10px_var(--brand-primary)]">
              <div className="absolute inset-2 rounded-full border border-[var(--brand-primary)]/20 group-hover:border-[var(--brand-primary)]/50 transition-colors" />
              <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--brand-primary)] text-black font-bold flex items-center justify-center text-sm shadow-[0_0_15px_var(--brand-primary)]">
                {item.step}
              </div>
              <div className="text-[var(--brand-primary)] group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
