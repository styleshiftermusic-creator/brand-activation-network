import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { SectionHeader } from './SectionHeader';
import { ScrollReveal } from '@/components/ScrollReveal';

interface ComparisonGridProps {
  badge: string;
  title: string;
  subtitle: string;
  problem: { title: string; items: Array<{ label: string; desc: string }> };
  solution: { title: string; items: Array<{ label: string; desc: string }> };
}

export function ComparisonGrid({ badge, title, subtitle, problem, solution }: ComparisonGridProps) {
  return (
    <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
      <SectionHeader badge={badge} title={title} subtitle={subtitle} badgeColor="primary" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ScrollReveal delay={0.1}>
          <div className="p-10 h-full rounded-2xl border border-[var(--brand-danger)]/10 bg-[var(--brand-danger)]/5 backdrop-blur-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <XCircle className="w-32 h-32 text-[var(--brand-danger)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--brand-danger)] mb-8 flex items-center gap-3">
              <XCircle className="w-6 h-6" /> {problem.title}
            </h3>
            <ul className="space-y-6 text-zinc-400">
              {problem.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[var(--brand-danger)] mt-0.5 opacity-80">✗</span> 
                  <span><strong className="text-white">{item.label}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
        
        <ScrollReveal delay={0.2}>
          <div className="p-10 h-full rounded-2xl border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_-15px_var(--brand-primary)]">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <CheckCircle className="w-32 h-32 text-[var(--brand-primary)]" />
            </div>
            <h3 className="text-xl font-bold text-[var(--brand-primary)] mb-8 flex items-center gap-3">
              <CheckCircle className="w-6 h-6" /> {solution.title}
            </h3>
            <ul className="space-y-6 text-zinc-300">
              {solution.items.map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-[var(--brand-primary)] mt-0.5">✓</span> 
                  <span><strong className="text-white">{item.label}:</strong> {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
