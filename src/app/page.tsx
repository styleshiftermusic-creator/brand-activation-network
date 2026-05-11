import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteNav } from "@/components/SiteNav";
import { LeadMagnetForm } from "@/components/LeadMagnetForm";
import { HeroCTA, ModuleCTA, FinalCTA } from "@/components/WaitlistCTA";
import { SocialProofToast } from "@/components/SocialProofToast";
import {
  Zap,
  TrendingUp,
  Users,
  ShieldCheck,
  CheckCircle,
  Star,
  BarChart2,
  Layers,
  Brain,
  XCircle,
  ArrowRight,
  DollarSign,
  Target,
  Settings,
} from "lucide-react";

export const metadata = {
  title: "Master Business Funding & High-Ticket Sales",
  description:
    "The Master Blueprint: a 7-module system to secure business funding, automate high-ticket sales, and scale your brand using AI-powered systems. Join the Brand Activation Network today.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brand Activation Network — The Master Blueprint",
    description: "Master the exact blueprint to secure business funding, automate high-ticket sales, and completely scale your life.",
    url: "https://brandactivationnetwork.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// ─── Data ──────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "3", label: "Core Scaling Pillars" },
  { value: "$0", label: "Ad Spend Required" },
  { value: "100%", label: "Automated Systems" },
  { value: "1", label: "Private Network" },
];

const VALUE_PROPS = [
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Credit & Capital Hacks",
    desc: "Learn the Pledge Loan Credit Hack and exactly how to transition into pulling immediate Business Funding.",
    accent: "var(--primary)",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Audience & Leverage",
    desc: "Build unparalleled authority. Master the high-ticket sales philosophy to close massive deals organically.",
    accent: "#10b981",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Scale 'One-to-Many'",
    desc: "Stop trading time for money. Build automated systems and environments that collapse decades into days.",
    accent: "#f59e0b",
  },
];

const MODULES = [
  { num: "01", title: "The Pledge Loan Credit Hack", desc: "Manufacture a perfect internal credit score at your credit union in 60–90 days.", tag: "FINANCE" },
  { num: "02", title: "Transitioning to Business Funding", desc: "Leverage personal credit to pull $50K–$250K in 0% APR business capital.", tag: "CAPITAL" },
  { num: "03", title: "The Investment Blueprint", desc: "Deploy capital across real estate, index funds, and your own scaling operations.", tag: "WEALTH" },
  { num: "04", title: "Marketing & Audience Leverage", desc: "Use OPA plays — podcasts, shout-out pages, and content factories — to dominate.", tag: "GROWTH" },
  { num: "05", title: "High-Ticket Sales Philosophy", desc: "Master the 'Webinar → Application → Close' pipeline for $3K–$10K deals.", tag: "SALES" },
  { num: "06", title: "Scaling with One-to-Many", desc: "Replace 1-on-1 services with group programs, digital products, and licensing.", tag: "SCALE" },
  { num: "07", title: "Mindset & Environment", desc: "Design the inputs, routines, and environment that make success unavoidable.", tag: "FOUNDATION" },
];

const TESTIMONIALS = [
  {
    quote: "I went from zero business credit to $150K in funding in under 90 days. The pledge loan strategy alone was worth 10x the investment.",
    name: "Marcus T.",
    role: "Agency Owner",
    initials: "MT",
    stars: 5,
  },
  {
    quote: "The high-ticket sales module completely changed how I close deals. I booked $42K in new contracts the first month after implementing the webinar pipeline.",
    name: "Aisha R.",
    role: "Brand Strategist",
    initials: "AR",
    stars: 5,
  },
  {
    quote: "I was trading hours for dollars. After Module 6, I transitioned to a group coaching model and 3x'd my revenue while working half the hours.",
    name: "Devon L.",
    role: "Executive Coach",
    initials: "DL",
    stars: 5,
  },
];

// ─── Component ─────────────────────────────────────────────────────────────────

export default function Home() {
  const stripeLink = process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: "Brand Activation Network: The Master Blueprint",
    description: "Master the exact blueprint to secure business funding, automate high-ticket sales, and completely scale your brand.",
    provider: { "@type": "Organization", name: "Brand Activation Network" },
    educationalCredentialAwarded: "Certification of Completion",
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT7H" },
    offers: {
      "@type": "Offer",
      price: "1000",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: "https://brandactivationnetwork.com",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080808] text-white relative overflow-x-hidden">
      <Script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── Fixed ambient glow layer ─── */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-15%] left-1/2 -translate-x-1/2 w-[900px] h-[700px] bg-[var(--primary)]/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-[40%] left-[-5%] w-[500px] h-[500px] bg-[var(--accent)]/8 rounded-full blur-[150px]" />
      </div>

      {/* ─── NAV ─── */}
      <SiteNav />

      {/* ─── HERO ─── */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-10 max-w-5xl mx-auto w-full">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/5 text-xs font-mono tracking-widest text-[var(--primary)] uppercase mb-8 hover:border-[var(--primary)]/50 transition-colors">
          <Zap className="w-3 h-3 fill-current" />
          High-Ticket Systems & Capital
        </div>

        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <Image
            src="/logo.png"
            alt="Brand Activation Network Logo"
            width={520}
            height={260}
            priority
            className="w-auto h-32 md:h-44 object-contain drop-shadow-2xl opacity-60 hover:opacity-100 hover:scale-[1.02] transition-all duration-500"
          />
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 uppercase leading-[0.96] font-heading">
          <span className="text-white">Scale </span>
          <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#e0aaff] via-[#c77dff] to-[#9d4edd]">
            Without Chaos
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--primary)]/60 to-transparent" />
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl font-light leading-relaxed">
          Brand Activation Network gives founders a clear blueprint to secure business funding, automate sales, and build a scalable business model with high-ticket offers.
        </p>

        {/* Unified Singular CTA */}
        <div className="flex flex-col items-center gap-5 w-full mb-12">
          <HeroCTA stripeLink={stripeLink} />
          <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
            Not ready? <Link href="/challenge" className="text-[var(--primary)] hover:text-[#c77dff] transition-colors underline underline-offset-4 decoration-[var(--primary)]/30 hover:decoration-[#c77dff]/80">Join the free 5-day challenge</Link>
          </div>
        </div>

        {/* Social proof mini row */}
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <div className="flex -space-x-2">
            {["M", "A", "D", "J", "K"].map((l, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-[#080808] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-[10px] font-bold text-white">
                {l}
              </div>
            ))}
          </div>
          <span><span className="text-white font-semibold flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 fill-current text-[var(--primary)] text-emerald-400" />Private Network</span> Access Open</span>
          <span className="hidden md:flex items-center gap-1 text-amber-400">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
          </span>
        </div>
      </section>

      {/* ─── STAT BAR ─── */}
      <ScrollReveal>
        <section className="relative z-10 w-full border-y border-white/[0.06] bg-black/30 backdrop-blur-sm py-8 my-8">
          <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col items-center text-center gap-1">
                <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter">{s.value}</span>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-[0.15em]">{s.label}</span>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ─── THE PROBLEM VS THE SOLUTION ─── */}
      <ScrollReveal>
        <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-4 block">The Broken Model</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">Why Scaling Feels Like Chaos</h2>
            <p className="text-zinc-500 max-w-xl mx-auto font-light">
              Most service businesses and agencies hit a revenue ceiling because their underlying model is fundamentally flawed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <ScrollReveal delay={0.1}>
              <div className="p-10 h-full rounded-2xl border border-red-500/10 bg-red-500/5 backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <XCircle className="w-32 h-32 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-red-400 mb-8 flex items-center gap-3">
                <XCircle className="w-6 h-6" /> The Old Way
              </h3>
              <ul className="space-y-6 text-zinc-400">
                <li className="flex items-start gap-4">
                  <span className="text-red-500 mt-0.5 opacity-80">✗</span> 
                  <span><strong className="text-red-200">Unpredictable Revenue:</strong> Relying heavily on word-of-mouth referrals and low-ticket clients.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-500 mt-0.5 opacity-80">✗</span> 
                  <span><strong className="text-red-200">Capital Starved:</strong> Bootstrapping with personal cash flow and draining your savings.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-500 mt-0.5 opacity-80">✗</span> 
                  <span><strong className="text-red-200">Time Traded for Dollars:</strong> Stuck in 1-on-1 service delivery, effectively buying yourself a job.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-red-500 mt-0.5 opacity-80">✗</span> 
                  <span><strong className="text-red-200">Manual Sales:</strong> Endless follow-ups, unqualified leads, and broken funnels.</span>
                </li>
              </ul>
              </div>
            </ScrollReveal>
            
            {/* The Solution */}
            <ScrollReveal delay={0.2}>
              <div className="p-10 h-full rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_-15px_rgba(157,78,221,0.2)]">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <CheckCircle className="w-32 h-32 text-[var(--primary)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--primary)] mb-8 flex items-center gap-3">
                <CheckCircle className="w-6 h-6" /> The BAN System
              </h3>
              <ul className="space-y-6 text-zinc-300">
                <li className="flex items-start gap-4">
                  <span className="text-[var(--primary)] mt-0.5">✓</span> 
                  <span><strong className="text-white">Predictable Pipelines:</strong> Automated, high-ticket sales machines that run 24/7.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[var(--primary)] mt-0.5">✓</span> 
                  <span><strong className="text-white">Unlimited Capital:</strong> Securing $50K–$250K in 0% interest business funding to scale rapidly.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[var(--primary)] mt-0.5">✓</span> 
                  <span><strong className="text-white">One-to-Many Scale:</strong> Replacing 1-on-1 work with digital products, cohorts, and group models.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-[var(--primary)] mt-0.5">✓</span> 
                  <span><strong className="text-white">Systems & AI:</strong> Deploying AI agents to handle outreach, operations, and fulfillment.</span>
                </li>
              </ul>
            </div>
            </ScrollReveal>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── LEAD MAGNET ─── */}
      <ScrollReveal delay={0.05}>
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <LeadMagnetForm />
        </div>
      </ScrollReveal>

      {/* ─── MASTER BLUEPRINT ─── */}
      <ScrollReveal delay={0.05}>
        <section id="modules" className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-4 block">The Curriculum</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">The Master Blueprint</h2>
            <p className="text-zinc-500 max-w-xl mx-auto font-light">
              From your first credit union pledge loan to a scaled, automated empire — every step is mapped.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
            {MODULES.map((mod) => (
              <div
                key={mod.num}
                className="group relative p-6 rounded-2xl border border-white/[0.06] bg-black/25 backdrop-blur-md hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all duration-400 hover:-translate-y-1 overflow-hidden text-left"
              >
                <div className="absolute inset-0 border border-white/[0.03] rounded-2xl pointer-events-none" />
                <div className="flex items-start justify-between mb-4">
                  <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--primary)] transition-all duration-400">
                    <span className="text-sm font-bold text-[var(--primary)]">{mod.num}</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-700 tracking-widest border border-white/5 px-2 py-0.5 rounded-full">
                    {mod.tag}
                  </span>
                </div>
                <h4 className="font-semibold text-white mb-2 tracking-tight group-hover:text-[var(--primary)] transition-colors duration-300 leading-snug">
                  {mod.title}
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed">{mod.desc}</p>
              </div>
            ))}

            {/* Bonus card */}
            <div className="group relative p-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 backdrop-blur-md hover:border-amber-500/40 transition-all duration-400 hover:-translate-y-1 overflow-hidden text-left">
              <div className="flex items-start justify-between mb-4">
                <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all duration-400">
                  <Zap className="w-5 h-5 text-amber-400 fill-current" />
                </div>
                <span className="text-[9px] font-mono text-amber-700 tracking-widest border border-amber-500/20 px-2 py-0.5 rounded-full">BONUS</span>
              </div>
              <h4 className="font-semibold text-amber-300 mb-2 tracking-tight leading-snug">AI Agent Prompt Library</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">200+ battle-tested prompts to automate your content, outreach and fulfillment pipeline.</p>
            </div>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row justify-center items-center gap-4">
            <ModuleCTA stripeLink={stripeLink} />
            <Link
              href="/challenge"
              className="flex items-center gap-2 px-8 py-4 border border-white/10 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1"
            >
              Try the Free Challenge First →
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── THE PROCESS (PATH TO ROI) ─── */}
      <ScrollReveal delay={0.05}>
        <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full border-t border-white/[0.06]">
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-4 block">The Process</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4 font-heading">Your Path to Scale</h2>
            <p className="text-zinc-500 max-w-xl mx-auto font-light">
              We don't do theory. This is a sequential, actionable blueprint designed to systematically remove bottlenecks from your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-transparent via-[var(--primary)]/30 to-transparent -z-10" />

            {[
              {
                step: "01",
                icon: <DollarSign className="w-6 h-6" />,
                title: "Secure Capital",
                desc: "Manufacture credit and pull $50K–$250K in 0% interest business funding to eliminate cash flow constraints.",
              },
              {
                step: "02",
                icon: <Target className="w-6 h-6" />,
                title: "Build the Funnel",
                desc: "Construct a high-ticket webinar-to-application sales machine that works 24/7 to qualify premium leads.",
              },
              {
                step: "03",
                icon: <Settings className="w-6 h-6" />,
                title: "Automate & Scale",
                desc: "Deploy AI agents and systemize your fulfillment, transitioning from 1-on-1 labor to a 'One-to-Many' empire.",
              },
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-black border border-white/10 flex items-center justify-center mb-6 relative group shadow-[0_0_30px_-10px_rgba(157,78,221,0.1)]">
                  <div className="absolute inset-2 rounded-full border border-[var(--primary)]/20 group-hover:border-[var(--primary)]/50 transition-colors" />
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[var(--primary)] text-black font-bold flex items-center justify-center text-sm shadow-[0_0_15px_var(--primary)]">
                    {item.step}
                  </div>
                  <div className="text-[var(--primary)] group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ─── TESTIMONIALS ─── */}
      <ScrollReveal delay={0.05}>
        <section id="proof" className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-500 mb-4 block">Social Proof</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">What Our Architects Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-2xl border border-white/[0.06] bg-black/25 backdrop-blur-md hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-400 hover:-translate-y-1.5 flex flex-col overflow-hidden"
              >
                <div className="absolute inset-0 border border-white/[0.03] rounded-2xl pointer-events-none" />
                <div className="flex gap-0.5 mb-5">
                  {[...Array(t.stars)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-300 leading-relaxed mb-6 flex-grow text-sm">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-5 border-t border-white/[0.05]">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-400">
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
      </ScrollReveal>

      {/* ─── FOUNDER CREDIBILITY ─── */}
      <ScrollReveal delay={0.05}>
        <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 md:p-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary)]/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10 space-y-6">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] block">The Architect</span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
                Built by founders who actually scaled.
              </h2>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                Brand Activation Network wasn&apos;t built on theory. It was engineered after spending years in the trenches, trading hours for dollars, and hitting revenue ceilings. 
                <br /><br />
                We realized that the difference between a struggling freelancer and a scaling enterprise isn&apos;t hard work—it&apos;s leverage. You need capital to move fast, and systems to reclaim your time. We built the exact blueprint we wish we had on day one.
              </p>
              <div className="pt-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[#c77dff] p-0.5">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-[var(--primary)]">BAN</div>
                </div>
                <div>
                  <div className="font-bold text-white tracking-tight">The BAN Collective</div>
                  <div className="text-xs text-zinc-500 uppercase tracking-widest font-mono">Founders & Engineers</div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full min-h-[300px] rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#c77dff]/20 to-transparent mix-blend-overlay z-10 pointer-events-none" />
              {/* Using a placeholder aesthetic graphic for the founder/credibility section since we don't have a specific founder image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full border border-[var(--primary)]/30 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-[var(--primary)]/10 animate-[spin_10s_linear_infinite]" />
                  <div className="absolute w-full h-full rounded-full border-t-2 border-[var(--primary)]/50 animate-[spin_4s_linear_infinite]" />
                  <Layers className="w-10 h-10 md:w-16 md:h-16 text-[var(--primary)]/80" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── FAQ ─── */}
      <ScrollReveal delay={0.05}>
        <section className="relative z-10 max-w-4xl mx-auto px-6 py-16 w-full mb-10">
          <div className="text-center mb-14">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-4 block">Clarity</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-4 font-heading">Frequently Asked Questions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "Do I need good personal credit to start?",
                a: "No. The first module is the Pledge Loan Credit Hack, specifically designed to repair and build a perfect internal credit profile from scratch in 60-90 days."
              },
              {
                q: "Is this only for specific industries?",
                a: "The blueprint works for any service-based business, agency, coach, or consultant looking to secure capital and productize their services into high-ticket offers."
              },
              {
                q: "How fast can I get business funding?",
                a: "If your personal credit is already optimized, you can pull $50K+ in 0% interest business capital within 30 days. If you are starting from zero, the timeline is 90-120 days."
              },
              {
                q: "Is the AI Prompt Library included?",
                a: "Yes. Once accepted into the network, you receive lifetime access to the curriculum, the community, and the ever-updating AI Prompt Library."
              }
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                <h4 className="font-bold text-white mb-3 text-lg leading-snug">{faq.q}</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ─── FINAL CTA ─── */}
      <ScrollReveal delay={0.05}>
        <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 bg-black/50 backdrop-blur-xl p-12 md:p-20 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-[var(--primary)]/8 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-500/8 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute inset-0 border border-white/[0.03] rounded-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2 text-xs font-mono tracking-[0.2em] text-emerald-400 uppercase">
                <CheckCircle className="w-4 h-4" />
                Instant Dashboard Access · All 7 Modules Unlocked
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white">
                Ready to Activate?
              </h2>
              <p className="text-zinc-400 max-w-xl font-light leading-relaxed">
                Get immediate access to all 7 modules, every blueprint, calculator, sales script, and AI prompt library. One payment. Lifetime access.
              </p>
              <FinalCTA stripeLink={stripeLink} />
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-600">
                {[
                  { icon: <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />, label: "Secure checkout via Stripe" },
                  { icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, label: "Instant dashboard access" },
                  { icon: <BarChart2 className="w-3.5 h-3.5 text-[var(--primary)]" />, label: "Lifetime updates included" },
                  { icon: <TrendingUp className="w-3.5 h-3.5 text-sky-400" />, label: "30-day results guarantee" },
                ].map((item) => (
                  <span key={item.label} className="flex items-center gap-1.5 font-mono uppercase tracking-widest">
                    {item.icon} {item.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-white/[0.06] mt-8">
        <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="BAN" width={100} height={32} className="h-7 w-auto opacity-60 hover:opacity-100 transition-opacity" />
          </div>
          <div className="flex items-center gap-6 text-xs text-zinc-600">
            <Link href="/challenge" className="hover:text-zinc-400 transition-colors">Challenge</Link>
            <Link href="/dashboard" className="hover:text-zinc-400 transition-colors">Dashboard</Link>
            <a href="mailto:support@brandactivationnetwork.com" className="hover:text-zinc-400 transition-colors">Support</a>
          </div>
          <div className="text-xs text-zinc-700 font-mono">
            © {new Date().getFullYear()} Brand Activation Network · Architecture Mode: Active
          </div>
        </div>
      </footer>

      {/* ─── SOCIAL PROOF NOTIFICATIONS ─── */}
      <SocialProofToast initialDelay={8000} interval={25000} displayDuration={6000} />
    </div>
  );
}
