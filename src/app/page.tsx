import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[var(--primary)]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-[var(--accent)]/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Container */}
      <main className="z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full mt-24">

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
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          <span className="text-gradient">Unlock Capital. </span><br />
          <span className="text-gradient-primary">Scale Instantly.</span>
        </h1>

        <p className="text-lg md:text-2xl text-[var(--muted-foreground)] mb-12 max-w-2xl font-light leading-relaxed">
          Master the exact 7-module blueprint to secure business funding, automate high-ticket sales, and completely scale your agency.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center items-center">
          <Link href="/challenge" className="w-full sm:w-auto px-8 py-4 bg-[var(--primary)] hover:bg-[#b06cf0] text-white rounded-xl font-medium transition-all duration-300 shadow-[0_0_40px_-10px_rgba(157,78,221,0.5)] hover:shadow-[0_0_60px_-15px_rgba(157,78,221,0.7)] hover:-translate-y-1 text-center">
            Join the Ongoing Challenge
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto px-8 py-4 glass hover:bg-white/10 text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 text-center">
            Access Course Dashboard
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

      </main>

      {/* Footer */}
      <footer className="mt-32 pb-8 text-[var(--muted-foreground)] text-sm">
        © {new Date().getFullYear()} Brand Activation Network. Architecture Mode: Active.
      </footer>
    </div>
  );
}
