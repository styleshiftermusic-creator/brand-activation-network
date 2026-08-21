import Link from "next/link";
import Image from "next/image";
import Script from "next/script";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteNav } from "@/components/SiteNav";
import { HeroCTA, FinalCTA } from "@/components/WaitlistCTA";

import {
  Zap,
  TrendingUp,
  ShieldCheck,
  Star,
  BarChart2,
  DollarSign,
  Target,
  Settings,
} from "lucide-react";

import {
  PageShell,
  StatBar,
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

const STATS = [
  { value: "3", label: "Core Scaling Pillars" },
  { value: "$0", label: "Ad Spend Required" },
  { value: "100%", label: "Automated Systems" },
  { value: "1", label: "Private Network" },
];

const MODULES = [
  { index: "01", title: "The Pledge Loan Credit Hack", desc: "Manufacture a perfect internal credit score at your credit union in 60–90 days.", tag: "FINANCE" },
  { index: "02", title: "Transitioning to Business Funding", desc: "Leverage personal credit to pull $50K–$250K in 0% APR business capital.", tag: "CAPITAL" },
  { index: "03", title: "The Investment Blueprint", desc: "Deploy capital across real estate, index funds, and your own scaling operations.", tag: "WEALTH" },
  { index: "04", title: "Marketing & Audience Leverage", desc: "Use OPA plays — podcasts, shout-out pages, and content factories — to dominate.", tag: "GROWTH" },
  { index: "05", title: "High-Ticket Sales Philosophy", desc: "Master the 'Webinar → Application → Close' pipeline for $3K–$10K deals.", tag: "SALES" },
  { index: "06", title: "Scaling with One-to-Many", desc: "Replace 1-on-1 services with group programs, digital products, and licensing.", tag: "SCALE" },
  { index: "07", title: "Mindset & Environment", desc: "Design the inputs, routines, and environment that make success unavoidable.", tag: "FOUNDATION" },
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
  }
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
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-20 pb-10 max-w-5xl mx-auto w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--brand-primary)]/30 bg-[var(--brand-primary)]/5 text-xs font-mono tracking-widest text-[var(--brand-primary)] uppercase mb-8 hover:border-[var(--brand-primary)]/50 transition-colors">
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
          <span className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-[var(--brand-primary-light)] via-[var(--brand-primary-light)] to-[var(--brand-primary)]">
            Without Chaos
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-primary)]/60 to-transparent" />
          </span>
        </h1>

        <p className="text-lg md:text-2xl text-zinc-400 mb-12 max-w-2xl font-light leading-relaxed">
          Brand Activation Network gives founders a clear blueprint to secure business funding, automate sales, and build a scalable business model with high-ticket offers.
        </p>

        {/* Unified Singular CTA */}
        <div className="flex flex-col items-center gap-5 w-full mb-12">
          <HeroCTA stripeLink={stripeLink} />
          <div className="flex items-center gap-2 text-sm text-zinc-500 font-medium">
            Not ready? <Link href="/challenge" className="text-[var(--brand-primary)] hover:text-[var(--brand-primary-light)] transition-colors underline underline-offset-4 decoration-[var(--brand-primary)]/30 hover:decoration-[var(--brand-primary-light)]/80">Join the free 5-day challenge</Link>
          </div>
        </div>

        {/* Social proof mini row */}
        <div className="flex items-center gap-3 text-sm text-zinc-500">
          <div className="flex -space-x-2">
            {["M", "A", "D", "J", "K"].map((l, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-[var(--brand-bg)] bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-info)] flex items-center justify-center text-[10px] font-bold text-white">
                {l}
              </div>
            ))}
          </div>
          <span><span className="text-white font-semibold flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 fill-current text-[var(--brand-secondary-light)]" />Private Network</span> Access Open</span>
          <span className="hidden md:flex items-center gap-1 text-[var(--brand-warning)]">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
          </span>
        </div>
      </section>

      {/* ─── STAT BAR ─── */}
      <ScrollReveal>
        <StatBar stats={STATS} />
      </ScrollReveal>

      {/* ─── THE PROBLEM VS THE SOLUTION ─── */}
      <ComparisonGrid 
        badge="The Broken Model"
        title="Why Scaling Feels Like Chaos"
        subtitle="Most service businesses and agencies hit a revenue ceiling because their underlying model is fundamentally flawed."
        problem={{
          title: "The Old Way",
          items: [
            { label: "Unpredictable Revenue", desc: "Relying heavily on word-of-mouth referrals and low-ticket clients." },
            { label: "Capital Starved", desc: "Bootstrapping with personal cash flow and draining your savings." },
            { label: "Time Traded for Dollars", desc: "Stuck in 1-on-1 service delivery, effectively buying yourself a job." },
            { label: "Manual Sales", desc: "Endless follow-ups, unqualified leads, and broken funnels." }
          ]
        }}
        solution={{
          title: "The BAN System",
          items: [
            { label: "Predictable Pipelines", desc: "Automated, high-ticket sales machines that run 24/7." },
            { label: "Unlimited Capital", desc: "Securing $50K–$250K in 0% interest business funding to scale rapidly." },
            { label: "One-to-Many Scale", desc: "Replacing 1-on-1 work with digital products, cohorts, and group models." },
            { label: "Systems & AI", desc: "Deploying AI agents to handle outreach, operations, and fulfillment." }
          ]
        }}
      />

      {/* ─── MASTER BLUEPRINT ─── */}
      <ScrollReveal delay={0.05}>
        <FeatureGrid 
          badge="The Curriculum"
          title="The Master Blueprint"
          subtitle="From your first credit union pledge loan to a scaled, automated empire — every step is mapped."
          items={MODULES}
          bonus={{
            title: "AI Agent Prompt Library",
            desc: "200+ battle-tested prompts to automate your content, outreach and fulfillment pipeline."
          }}
        />
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

      {/* ─── TESTIMONIALS ─── */}
      <ScrollReveal delay={0.05}>
        <TestimonialGrid 
          badge="Social Proof"
          title="What Our Architects Say"
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
      <ScrollReveal delay={0.05}>
        <FAQGrid 
          badge="Clarity"
          title="Frequently Asked Questions"
          faqs={FAQS}
        />
      </ScrollReveal>

      {/* ─── FINAL CTA ─── */}
      <ScrollReveal delay={0.05}>
        <CTABlock 
          badge="Instant Dashboard Access · All 7 Modules Unlocked"
          title="Ready to Activate?"
          subtitle="Get immediate access to all 7 modules, every blueprint, calculator, sales script, and AI prompt library. One payment. Lifetime access."
          trustBadges={[
            { icon: <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand-secondary)]" />, label: "Secure checkout via Stripe" },
            { icon: <Zap className="w-3.5 h-3.5 text-[var(--brand-warning)]" />, label: "Instant dashboard access" },
            { icon: <BarChart2 className="w-3.5 h-3.5 text-[var(--brand-primary)]" />, label: "Lifetime updates included" },
            { icon: <TrendingUp className="w-3.5 h-3.5 text-[var(--brand-info)]" />, label: "30-day results guarantee" },
          ]}
        >
          <FinalCTA stripeLink={stripeLink} />
        </CTABlock>
      </ScrollReveal>

    </PageShell>
  );
}
