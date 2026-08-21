import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CTABlockProps {
  badge: string;
  title: string;
  subtitle: string;
  trustBadges?: Array<{ icon: React.ReactNode; label: string }>;
  children: React.ReactNode;
}

export function CTABlock({ badge, title, subtitle, trustBadges, children }: CTABlockProps) {
  return (
    <section id="apply" className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
      <div className="relative rounded-2xl overflow-hidden border border-[var(--brand-secondary)]/20 bg-black/50 backdrop-blur-xl p-12 md:p-20 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-secondary)]/8 via-transparent to-[var(--brand-primary)]/8 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[var(--brand-secondary)]/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 border border-white/[0.03] rounded-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-[var(--brand-secondary-light)] uppercase">
            <CheckCircle className="w-4 h-4" />
            {badge}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
            {title}
          </h2>
          <p className="text-zinc-400 max-w-xl font-light leading-relaxed">
            {subtitle}
          </p>
          {children}
          {trustBadges && (
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
              {trustBadges.map((item) => (
                <span key={item.label} className="flex items-center gap-1.5 font-mono uppercase tracking-widest">
                  {item.icon} {item.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
