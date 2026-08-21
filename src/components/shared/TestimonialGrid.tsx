import React from 'react';
import { Star } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface TestimonialGridProps {
  badge: string;
  title: string;
  testimonials: Array<{ quote: string; name: string; role: string; initials: string; stars: number }>;
}

export function TestimonialGrid({ badge, title, testimonials }: TestimonialGridProps) {
  return (
    <section id="proof" className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
      <SectionHeader badge={badge} title={title} badgeColor="secondary" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="group relative p-8 rounded-2xl border border-white/[0.06] bg-black/25 backdrop-blur-md hover:border-[var(--brand-secondary)]/20 hover:bg-[var(--brand-secondary)]/5 transition-all duration-400 hover:-translate-y-1.5 flex flex-col overflow-hidden"
          >
            <div className="absolute inset-0 border border-white/[0.03] rounded-2xl pointer-events-none" />
            <div className="flex gap-0.5 mb-5">
              {[...Array(t.stars)].map((_, j) => (
                <Star key={j} className="w-3.5 h-3.5 text-[var(--brand-warning)] fill-current" />
              ))}
            </div>
            <p className="text-zinc-300 leading-relaxed mb-6 flex-grow text-sm">&ldquo;{t.quote}&rdquo;</p>
            <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
              <div className="h-10 w-10 rounded-full bg-[var(--brand-secondary)]/10 border border-[var(--brand-secondary)]/30 flex items-center justify-center text-sm font-bold text-[var(--brand-secondary-light)]">
                {t.initials}
              </div>
              <div>
                <div className="font-medium text-white text-sm tracking-tight">{t.name}</div>
                <div className="text-xs text-zinc-500">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
