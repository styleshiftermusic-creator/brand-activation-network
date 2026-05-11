import { SiteNav } from "@/components/SiteNav";
import { FinalCTA } from "@/components/WaitlistCTA";
import { Layers, ShieldCheck, TrendingUp, Users } from "lucide-react";

export const metadata = {
  title: "About | Brand Activation Network",
  description: "The story, mission, and architecture behind the Brand Activation Network.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col font-sans overflow-x-hidden selection:bg-[var(--primary)] selection:text-white">
      <SiteNav />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 w-full max-w-5xl mx-auto z-10 flex flex-col items-center text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[var(--primary)]/10 rounded-full blur-[150px] pointer-events-none -z-10" />
        
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-6 block">Our Mission</span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter mb-8 uppercase leading-[0.96] font-heading">
          <span className="text-white">Engineering </span>
          <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#9d4edd]">
            Leverage
          </span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          The traditional model of trading time for money is fundamentally broken. We built the Brand Activation Network to give founders the exact infrastructure required to manufacture capital, automate sales, and reclaim their time.
        </p>
      </section>

      {/* The Story Section */}
      <section className="relative py-20 px-6 w-full max-w-5xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white font-heading">
              Born from necessity, <br/> built for scale.
            </h2>
            <p className="text-zinc-400 leading-relaxed">
              Years ago, our founders hit the dreaded revenue ceiling. No matter how many hours we worked, we couldn't break past the limitations of 1-on-1 fulfillment. The cash flow was inconsistent, and scaling felt like chaos.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We realized that successful enterprises don't work harder—they use leverage. They use Other People's Money (OPM) to fund growth, and they use automated funnels and AI to separate their income from their time.
            </p>
            <p className="text-zinc-400 leading-relaxed">
              We spent years reverse-engineering the credit system and building automated sales pipelines. Once we perfected the system, we packaged it into the Master Blueprint. That's how the Brand Activation Network was born.
            </p>
          </div>
          
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/10 to-transparent mix-blend-overlay z-10 pointer-events-none" />
            <div className="relative z-20 flex justify-between items-start">
              <Layers className="w-8 h-8 text-[var(--primary)]" />
              <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-widest border border-[var(--primary)]/30 rounded-full text-[var(--primary)]">EST. 2024</div>
            </div>
            <div className="relative z-20">
              <div className="text-5xl font-bold text-white tracking-tighter mb-2">0</div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Compromises Made</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 px-6 w-full border-t border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-500 mb-4 block">Core Principles</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">The Architecture of Success</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-6 h-6 text-[var(--primary)]" />,
                title: "Capital First",
                desc: "Cash flow constraints kill businesses. We prioritize securing 0% interest funding before anything else."
              },
              {
                icon: <TrendingUp className="w-6 h-6 text-[var(--primary)]" />,
                title: "Asymmetric Returns",
                desc: "We focus on building assets (funnels, AI agents, credit profiles) that yield continuous returns on a one-time effort."
              },
              {
                icon: <Users className="w-6 h-6 text-[var(--primary)]" />,
                title: "Exclusive Network",
                desc: "Your network is your net worth. We gatekeep our community to ensure only serious, execution-oriented founders join."
              }
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-2xl border border-white/10 bg-black/40 hover:bg-black/60 transition-colors">
                <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{value.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-6">
        <FinalCTA />
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-xs text-zinc-600 font-mono">
        <p>© {new Date().getFullYear()} Brand Activation Network. All rights reserved.</p>
      </footer>
    </div>
  );
}
