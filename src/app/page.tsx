import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Brand Activation Network | Master Business Funding & High-Ticket Sales",
  description: "The 7-module blueprint to secure business funding, automate high-ticket sales, and scale your brand using AI-powered systems. Join the Brand Activation Network.",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Shadow Overlay to maintain text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-[var(--background)]/20 pointer-events-none z-10" />

      {/* Main Container */}
      <main className="z-20 flex flex-col items-center text-center px-6 max-w-5xl w-full mt-24">

        {/* Logo Section */}
        <div className="mb-12 animate-fade-in-up relative z-20 flex justify-center w-full mix-blend-screen">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Brand Activation Network Logo"
              width={500}
              height={250}
              priority
              className="w-auto h-28 md:h-40 object-contain drop-shadow-2xl hover:scale-105 transition-transform"
            />
          </Link>
        </div>

        {/* Hero Typography */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-6 uppercase leading-tight">
          <span className="text-white">Brand </span>
          <span className="text-gradient-primary relative inline-block">
            Activation
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--primary)] to-transparent opacity-50 blur-[2px]" />
          </span><br />
          <span className="text-white">Network</span>
        </h1>

        <p className="text-lg md:text-2xl text-[var(--muted-foreground)] mb-12 max-w-2xl font-light leading-relaxed">
          Master the exact blueprint to secure business funding, automate high-ticket sales, and completely scale your Life.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center items-center">
          <a href="https://buy.stripe.com/test_4gMeV5eBA6SB9hUc5BeQM00" className="w-full sm:w-auto px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition-all duration-300 shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.8)] hover:-translate-y-1 text-center text-lg tracking-wide">
            Activate Now
          </a>
          <Link href="/challenge" className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[#b06cf0] text-white rounded-xl font-medium transition-all duration-300 shadow-[0_0_40px_-10px_rgba(157,78,221,0.5)] hover:shadow-[0_0_60px_-15px_rgba(157,78,221,0.7)] hover:-translate-y-1 text-center">
            Join the Ongoing Challenge
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 text-center">
            Dashboard Login
          </Link>
        </div>

        {/* Features / Value Props Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 w-full text-left">
          {[
            { title: "Credit & Capital Hacks", desc: "Learn the Pledge Loan Credit Hack and exactly how to transition into pulling immediate Business Funding." },
            { title: "Audience & Leverage", desc: "Build unparalleled authority. Master the high-ticket sales philosophy to close massive deals organically." },
            { title: "Scale 'One-to-Many'", desc: "Stop trading time for money. Build automated systems and environments that collapse decades into days." }
          ].map((feature, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl flex flex-col transition-transform hover:-translate-y-2 duration-300">
              <div className="h-12 w-12 rounded-lg bg-[var(--primary)]/20 border border-[var(--primary)]/30 mb-6 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-[var(--primary)] shadow-[0_0_15px_var(--primary)]" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[var(--foreground)]">{feature.title}</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* ─── THE 7-MODULE BLUEPRINT ─── */}
        <section className="mt-32 w-full">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-4 block">The Curriculum</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">The 7-Module Blueprint</h2>
            <p className="text-[var(--muted-foreground)] max-w-xl mx-auto font-light">
              From your first credit union pledge loan to a scaled, automated empire — every step is mapped.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {[
              { num: "01", title: "The Pledge Loan Credit Hack", desc: "Manufacture a perfect internal credit score at your credit union in 60–90 days." },
              { num: "02", title: "Transitioning to Business Funding", desc: "Leverage personal credit to pull $50K–$250K in 0% APR business capital." },
              { num: "03", title: "The Investment Blueprint", desc: "Deploy capital across real estate, index funds, and your own scaling operations." },
              { num: "04", title: "Marketing & Audience Leverage", desc: "Use OPA plays — podcasts, shout-out pages, and content factories — to dominate." },
              { num: "05", title: "High-Ticket Sales Philosophy", desc: "Master the 'Webinar → Application → Close' pipeline for $3K–$10K deals." },
              { num: "06", title: "Scaling with One-to-Many", desc: "Replace 1-on-1 services with group programs, digital products, and licensing." },
              { num: "07", title: "Mindset & Environment", desc: "Design the inputs, routines, and environment that make success unavoidable." },
            ].map((mod) => (
              <div key={mod.num} className="group relative p-6 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl hover:border-[var(--primary)]/30 hover:bg-[var(--primary)]/5 transition-all duration-500 hover:-translate-y-1 overflow-hidden text-left">
                <div className="absolute top-3 right-4 text-[10px] font-mono text-zinc-700 tracking-widest">M-{mod.num}</div>
                <div className="h-10 w-10 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--primary)] transition-all duration-500">
                  <span className="text-sm font-bold text-[var(--primary)]">{mod.num}</span>
                </div>
                <h4 className="font-semibold text-white mb-2 tracking-tight group-hover:text-[var(--primary)] transition-colors">{mod.title}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="https://buy.stripe.com/test_4gMeV5eBA6SB9hUc5BeQM00" className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold transition-all duration-300 shadow-[0_0_40px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_0_60px_-15px_rgba(16,185,129,0.8)] hover:-translate-y-1 text-center text-lg tracking-wide">
              Activate Now — Get Instant Access
            </a>
            <Link href="/challenge" className="px-8 py-4 glass hover:bg-white/10 text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 text-center">
              Or Join Free Challenge First →
            </Link>
          </div>
        </section>

        {/* ─── TESTIMONIALS ─── */}
        <section className="mt-32 w-full">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-emerald-500 mb-4 block">Social Proof</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">What Our Architects Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                quote: "I went from zero business credit to $150K in funding in under 90 days. The pledge loan strategy alone was worth 10x the investment.",
                name: "Marcus T.",
                role: "Agency Owner",
                initials: "MT",
              },
              {
                quote: "The high-ticket sales module completely changed how I close deals. I booked $42K in new contracts the first month after implementing the webinar pipeline.",
                name: "Aisha R.",
                role: "Brand Strategist",
                initials: "AR",
              },
              {
                quote: "I was trading hours for dollars. After Module 6, I transitioned to a group coaching model and 3x'd my revenue while working half the hours.",
                name: "Devon L.",
                role: "Executive Coach",
                initials: "DL",
              },
            ].map((testimonial, i) => (
              <div key={i} className="group relative p-8 rounded-2xl border border-white/5 bg-black/20 backdrop-blur-xl hover:border-emerald-500/20 hover:bg-emerald-500/5 transition-all duration-500 hover:-translate-y-1 text-left flex flex-col">
                {/* Quote mark */}
                <div className="text-4xl font-serif text-emerald-500/30 mb-4 leading-none">&ldquo;</div>
                <p className="text-zinc-300 leading-relaxed mb-6 flex-grow italic">{testimonial.quote}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="h-10 w-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-sm font-bold text-emerald-400">
                    {testimonial.initials}
                  </div>
                  <div>
                    <div className="font-medium text-white text-sm">{testimonial.name}</div>
                    <div className="text-xs text-zinc-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── FINAL BUY CTA ─── */}
        <section className="mt-32 w-full">
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 bg-black/40 backdrop-blur-xl p-12 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-[var(--primary)]/10 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
                Ready to Activate?
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto mb-8 font-light leading-relaxed">
                Get immediate access to all 7 modules, every blueprint, calculator, sales script, and AI prompt library. One payment. Lifetime access.
              </p>
              <a
                href="https://buy.stripe.com/test_4gMeV5eBA6SB9hUc5BeQM00"
                className="inline-flex items-center gap-3 px-12 py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-bold text-xl transition-all duration-300 shadow-[0_0_50px_-10px_rgba(16,185,129,0.6)] hover:shadow-[0_0_70px_-10px_rgba(16,185,129,0.8)] hover:-translate-y-1"
              >
                Activate Now
              </a>
              <p className="mt-6 text-xs font-mono text-zinc-600 uppercase tracking-wider">Secure checkout via Stripe • Instant dashboard access</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="mt-32 pb-8 text-[var(--muted-foreground)] text-sm">
        © {new Date().getFullYear()} Brand Activation Network. Architecture Mode: Active.
      </footer>
    </div>
  );
}
