import Link from "next/link";
import Script from "next/script";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteNav } from "@/components/SiteNav";
import { HeroCTA, FinalCTA } from "@/components/WaitlistCTA";
import { ResultsTicker } from "@/components/ResultsTicker";
import { VideoSection } from "@/components/VideoSection";
import { QualificationSection } from "@/components/QualificationSection";
import { FloatingApplyBar } from "@/components/FloatingApplyBar";

import {
  Zap,
  TrendingUp,
  ShieldCheck,
  Star,
  DollarSign,
  Target,
  Settings,
  Users,
  Clock,
} from "lucide-react";

import {
  PageShell,
  ComparisonGrid,
  FeatureGrid,
  ProcessTimeline,
  TestimonialGrid,
  CredibilityBlock,
  FAQGrid,
  CTABlock,
} from "@/components/shared";

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

const FEATURED_MODULES = [
  { index: "01", title: "The Pledge Loan Credit Hack", desc: "Manufacture a perfect internal credit score at your credit union in 60–90 days — the foundation for everything.", tag: "FINANCE" },
  { index: "02", title: "Transitioning to Business Funding", desc: "Leverage personal credit to pull $50K–$250K in 0% APR business capital. The playbook most founders never learn.", tag: "CAPITAL" },
  { index: "05", title: "High-Ticket Sales Philosophy", desc: "Master the 'Webinar → Application → Close' pipeline for $3K–$10K deals that run on autopilot.", tag: "SALES" },
];

const TESTIMONIALS = [
  {
    quote: "I went from a 580 credit score to $150K in business funding in 87 days. Module 1 alone paid for BAN 100x over. I wish I found this three years ago.",
    name: "Marcus T.",
    role: "Agency Owner",
    initials: "MT",
    stars: 5,
  },
  {
    quote: "I replaced my entire outbound sales team with the webinar funnel from Module 5. $42K in new contracts the first 30 days — without a single cold call.",
    name: "Aisha R.",
    role: "Brand Strategist",
    initials: "AR",
    stars: 5,
  },
  {
    quote: "Module 6 showed me how to go from 1-on-1 coaching at $2K/client to a group model at $5K/client serving 10x the people. Revenue went from $8K/mo to $26K/mo.",
    name: "Devon L.",
    role: "Executive Coach",
    initials: "DL",
    stars: 5,
  },
];

const FAQS = [
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
  },
  {
    q: "What if I'm not accepted?",
    a: "We accept the vast majority of applicants who are genuinely running (or launching) a service-based business. If you're not accepted, we'll tell you exactly what to work on and invite you to reapply."
  },
];

const PROCESS_STEPS = [
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
    <PageShell>
      <Script id="schema-org" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── NAV ─── */}
      <SiteNav />

      {/* ─── HERO ─── */}
      <section id="hero-section" className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-16 max-w-4xl mx-auto w-full">
        {/* Urgency Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--brand-danger)]/30 bg-[var(--brand-danger)]/5 text-xs font-mono tracking-widest uppercase mb-10 hover:border-[var(--brand-danger)]/50 transition-colors">
          <div className="h-2 w-2 rounded-full bg-[var(--brand-danger)] animate-pulse" />
          <span className="text-[var(--brand-danger)]">Applications Open</span>
          <span className="text-zinc-600">·</span>
          <span className="text-zinc-400">Limited Spots This Quarter</span>
        </div>

        {/* Headline — Primary */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1] font-sans">
          <span className="text-white">System That </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-secondary-light)] to-[var(--brand-secondary)]">
            Funds
          </span>
          <span className="text-white"> &amp; </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary-light)] to-[var(--brand-primary)]">
            Scales
          </span>
          <br />
          <span className="text-white">Your Business</span>
        </h1>

        {/* Subheadline — Secondary value prop with specifics */}
        <p className="text-base md:text-lg text-zinc-400 mb-8 max-w-xl font-light leading-relaxed">
          Pull $50K–$250K in 0% business capital. Build high-ticket sales that close while you sleep. Replace yourself with AI.
        </p>

        {/* Proof Strip — Trust bridge before CTA */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-mono uppercase tracking-widest mb-10">
          <span className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[var(--brand-secondary)]" />
            <span className="text-zinc-400">200+ founders</span>
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-[var(--brand-secondary)]" />
            <span className="text-zinc-400">$12M+ funded</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-[var(--brand-warning)] fill-current" />
            <span className="text-zinc-400">94% acceptance rate</span>
          </span>
        </div>

        {/* CTA Cluster */}
        <div className="flex flex-col items-center gap-5 w-full">
          <HeroCTA stripeLink={stripeLink} />
          <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
            Not ready? <Link href="/challenge" className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-light)] transition-colors underline underline-offset-4 decoration-[var(--brand-primary)]/30 hover:decoration-[var(--brand-primary-light)]/80">Join the free 5-day challenge</Link>
          </div>
        </div>
      </section>

      {/* ─── RESULTS TICKER ─── */}
      <ResultsTicker />

      {/* ─── THE PROBLEM VS THE SOLUTION ─── */}
      <ComparisonGrid
        badge="Sound Familiar?"
        title="You're Working 60-Hour Weeks and Revenue Still Flatlines"
        subtitle="If any of this sounds like your reality, you're not broken — your business model is. Here's what separates founders who plateau from founders who scale."
        problem={{
          title: "Your Reality Right Now",
          items: [
            { label: "Winning Clients, Losing Money", desc: "You keep signing new deals but never seem to get ahead financially." },
            { label: "Funding Your Growth on Fumes", desc: "You've maxed out personal credit cards trying to scale. No access to real capital." },
            { label: "You ARE the Business", desc: "Nothing moves unless you're personally doing it. You bought yourself a job." },
            { label: "No Systems, No Leverage", desc: "You know you should have automation and processes but don't know where to start." },
          ]
        }}
        solution={{
          title: "After Joining BAN",
          items: [
            { label: "$50K–$250K in 0% Capital", desc: "Members secure real business funding within 90 days using our credit manufacturing playbook." },
            { label: "$20K–$50K/mo Automated Revenue", desc: "High-ticket funnels that qualify, nurture, and close premium clients while you sleep." },
            { label: "AI Replaces 3-4 Contractors", desc: "Deploy AI agents for outreach, content, and operations. Cut overhead, multiply output." },
            { label: "50 Clients in the Time of 5", desc: "Group programs and digital products let you serve exponentially more people." },
          ]
        }}
      />

      {/* ─── VIDEO SECTION ─── */}
      <VideoSection />

      {/* ─── FEATURED MODULES ─── */}
      <ScrollReveal delay={0.05}>
        <FeatureGrid
          badge="Inside the Network"
          title="What You Get When Accepted"
          subtitle="Every module is built around one thing: getting you to your first (or next) $100K quarter. No fluff. No theory."
          items={FEATURED_MODULES}
          bonus={{
            title: "AI Agent Prompt Library",
            desc: "200+ battle-tested prompts to automate your content, outreach and fulfillment pipeline."
          }}
        />
        {/* Additional modules teaser */}
        <div className="max-w-5xl mx-auto px-6 -mt-8 mb-8">
          <p className="text-center text-sm text-zinc-600 font-light">
            <span className="text-zinc-400">+ 4 more modules</span> covering wealth building &amp; investment strategy, marketing &amp; audience leverage, scaling with one-to-many models, and high-performance mindset engineering.
          </p>
        </div>
      </ScrollReveal>

      {/* ─── THE PROCESS (PATH TO ROI) ─── */}
      <ScrollReveal delay={0.05}>
        <ProcessTimeline
          badge="The Process"
          title="Your Path to Scale"
          subtitle="We don't do theory. This is a sequential, actionable blueprint designed to systematically remove bottlenecks from your business."
          steps={PROCESS_STEPS}
        />
      </ScrollReveal>

      {/* ─── WHO THIS IS FOR ─── */}
      <QualificationSection stripeLink={stripeLink} />

      {/* ─── TESTIMONIALS ─── */}
      <ScrollReveal delay={0.05}>
        <TestimonialGrid
          badge="Real Results"
          title="Real Results From Real Founders"
          testimonials={TESTIMONIALS}
        />
      </ScrollReveal>

      {/* ─── FOUNDER CREDIBILITY ─── */}
      <ScrollReveal delay={0.05}>
        <CredibilityBlock
          badge="Why This Exists"
          title="Built from the trenches, not a textbook."
          paragraphs={[
            "Brand Activation Network was born out of frustration. We spent years trading hours for dollars, hitting revenue ceilings, and watching competitors scale past us — not because they worked harder, but because they had better systems and access to capital.",
            "So we reverse-engineered the entire playbook: how to manufacture credit, pull six figures in 0% business funding, build high-ticket funnels that close while you sleep, and replace yourself with AI-powered operations. Then we packaged the whole thing into 7 modules so you don't have to spend years figuring it out."
          ]}
          stats={[
            { value: "7", label: "Modules" },
            { value: "$250K+", label: "Funding Blueprint" },
            { value: "200+", label: "AI Prompts" }
          ]}
        />
      </ScrollReveal>

      {/* ─── FAQ ─── */}
      <div id="faq">
        <ScrollReveal delay={0.05}>
          <FAQGrid
            badge="Clarity"
            title="Frequently Asked Questions"
            faqs={FAQS}
          />
        </ScrollReveal>
      </div>

      {/* ─── FINAL CTA ─── */}
      <div id="apply">
        <ScrollReveal delay={0.05}>
          <CTABlock
            badge="Limited Enrollment · Application Required"
            title="Applications Close When We Hit Capacity"
            subtitle="We intentionally keep the network small so every member gets direct support. Once we hit our quarterly cap, the application closes until next quarter."
            trustBadges={[
              { icon: <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand-secondary)]" />, label: "Secure checkout via Stripe" },
              { icon: <Zap className="w-3.5 h-3.5 text-[var(--brand-warning)]" />, label: "Instant dashboard access" },
              { icon: <Clock className="w-3.5 h-3.5 text-[var(--brand-info)]" />, label: "Avg. 47 days to first funding" },
              { icon: <TrendingUp className="w-3.5 h-3.5 text-[var(--brand-primary)]" />, label: "30-day results guarantee" },
            ]}
          >
            <FinalCTA stripeLink={stripeLink} />
          </CTABlock>
        </ScrollReveal>
      </div>

      {/* ─── FLOATING APPLY BAR ─── */}
      <FloatingApplyBar stripeLink={stripeLink} />

    </PageShell>
  );
}
