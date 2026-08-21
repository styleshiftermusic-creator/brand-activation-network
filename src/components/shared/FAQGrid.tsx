import React from 'react';
import { SectionHeader } from './SectionHeader';

interface FAQGridProps {
  badge: string;
  title: string;
  faqs: Array<{ q: string; a: string }>;
}

export function FAQGrid({ badge, title, faqs }: FAQGridProps) {
  return (
    <section id="faq" className="relative z-10 max-w-4xl mx-auto px-6 py-16 w-full mb-10">
      <SectionHeader badge={badge} title={title} badgeColor="primary" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
            <h4 className="font-bold text-white mb-3 text-lg leading-snug">{faq.q}</h4>
            <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
