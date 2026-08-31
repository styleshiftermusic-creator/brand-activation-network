"use client";

import { SiteNav } from "@/components/SiteNav";
import { FinalCTA } from "@/components/WaitlistCTA";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Star, BarChart2 } from "lucide-react";
import { useState } from "react";

const TESTIMONIALS = [
  {
    quote: "Secured $120k in 0% interest funding within 45 days. Used it to build an automated funnel that now generates 5 qualified leads a day. This system is the truth.",
    name: "Marcus T.",
    role: "Agency Owner",
    initials: "MT",
    stars: 5,
  },
  {
    quote: "I was trading hours for dollars and burning out. The Master Blueprint showed me how to productize my service and deploy AI agents for fulfillment.",
    name: "Sarah Jenkins",
    role: "B2B Consultant",
    initials: "SJ",
    stars: 5,
  },
  {
    quote: "The pledge loan credit hack is insane. My score jumped 90 points, and the approvals started rolling in. Best ROI of any program I've joined.",
    name: "David R.",
    role: "E-com Founder",
    initials: "DR",
    stars: 5,
  },
  {
    quote: "Finally stepped out of the day-to-day operations. The AI Prompt Library alone is worth 10x the entry price. Pure leverage.",
    name: "Elena M.",
    role: "Service Provider",
    initials: "EM",
    stars: 5,
  },
];

export default function ResultsClient() {
  const [currentRevenue, setCurrentRevenue] = useState(10000);
  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;

  // Simple calculator logic
  const potentialFunding = Math.max(50000, currentRevenue * 3);
  const potentialScale = currentRevenue * 5;

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col font-sans overflow-x-hidden selection:bg-[var(--brand-primary)] selection:text-white">
      <SiteNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 w-full max-w-5xl mx-auto z-10 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--brand-primary)]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
        
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--brand-primary)] mb-6 block">The Proof</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-8 uppercase leading-[0.96] font-heading">
          <span className="text-white">Predictable </span>
          <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary-light)] via-[var(--brand-primary-light)] to-[var(--brand-primary)]">
            Scale
          </span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          See the math behind the system and read the case studies of founders who successfully engineered their own leverage.
        </p>
      </section>

      {/* Interactive Calculator */}
      <ScrollReveal>
        <section className="relative py-16 px-6 w-full max-w-4xl mx-auto z-10">
          <div className="p-8 md:p-12 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--brand-primary)]/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <BarChart2 className="w-10 h-10 text-[var(--brand-primary)] mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Scaling Potential Calculator</h2>
              <p className="text-zinc-400 mt-2">Adjust your current monthly revenue to see your potential trajectory.</p>
            </div>

            <div className="relative z-10 space-y-12">
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-mono text-zinc-400 uppercase tracking-widest">Current Monthly Revenue</label>
                  <span className="text-2xl font-bold text-white">${currentRevenue.toLocaleString()}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100000" 
                  step="5000"
                  value={currentRevenue} 
                  onChange={(e) => setCurrentRevenue(Number(e.target.value))}
                  className="w-full accent-[var(--brand-primary)] h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8 border-t border-white/10">
                <div className="p-6 rounded-2xl bg-[var(--brand-primary)]/5 border border-[var(--brand-primary)]/20">
                  <div className="text-xs font-mono text-[var(--brand-primary)] uppercase tracking-widest mb-2">Potential 0% Capital</div>
                  <div className="text-4xl font-bold text-white tracking-tighter">${potentialFunding.toLocaleString()}</div>
                  <p className="text-xs text-zinc-500 mt-3">Estimated funding target via BAN credit sweeping and sequencing.</p>
                </div>
                <div className="p-6 rounded-2xl bg-[var(--brand-secondary)]/5 border border-[var(--brand-secondary)]/20">
                  <div className="text-xs font-mono text-[var(--brand-secondary-light)] uppercase tracking-widest mb-2">12-Month Scale Target</div>
                  <div className="text-4xl font-bold text-white tracking-tighter">${potentialScale.toLocaleString()}/mo</div>
                  <p className="text-xs text-zinc-500 mt-3">Estimated MRR after funnel automation and capital deployment.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials Grid */}
      <ScrollReveal delay={0.1}>
        <section className="relative py-20 px-6 w-full max-w-6xl mx-auto z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 font-heading">The Architect Network</h2>
            <p className="text-zinc-500 max-w-xl mx-auto font-light">
              Real results from founders who committed to the process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl border border-white/[0.06] bg-black/25 backdrop-blur-md hover:border-[var(--brand-primary)]/30 hover:bg-[var(--brand-primary)]/5 transition-all duration-400 flex flex-col"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-[var(--brand-warning)] fill-current" />
                  ))}
                </div>
                <p className="text-zinc-300 leading-relaxed mb-8 flex-grow text-lg">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-4 pt-6 border-t border-white/[0.05]">
                  <div className="h-12 w-12 rounded-full bg-[var(--brand-primary)]/10 border border-[var(--brand-primary)]/30 flex items-center justify-center text-lg font-bold text-[var(--brand-primary)]">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-bold text-white tracking-tight">{t.name}</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono mt-1">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Footer CTA */}
      <section className="py-20 px-6">
        <FinalCTA stripeLink={stripeLink} />
      </section>
    </div>
  );
}
