import { SiteNav } from "@/components/SiteNav";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Terms of Service",
  description: "Terms of service for the Brand Activation Network.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | Brand Activation Network",
    description: "Terms of service for the Brand Activation Network.",
    url: "https://brandactivationnetwork.com/terms",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      <SiteNav />
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-invert prose-zinc prose-sm md:prose-base">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-10 font-heading">Terms of Service</h1>
            <p className="text-zinc-400 mb-8">Last Updated: May 11, 2026</p>
            
            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-zinc-400 leading-relaxed">
                By accessing or using the Brand Activation Network platform, curriculum, or services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, do not use our services.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">2. The Master Blueprint Access</h2>
              <p className="text-zinc-400 leading-relaxed">
                Access to the Master Blueprint is restricted to approved applicants. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">3. No Financial Advice</h2>
              <p className="text-zinc-400 leading-relaxed">
                The content provided by Brand Activation Network is for educational purposes only. We do not provide financial, legal, or investment advice. You should consult with a qualified professional before making any financial decisions.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">4. Intellectual Property</h2>
              <p className="text-zinc-400 leading-relaxed">
                All curriculum materials, AI prompts, sales scripts, and calculators provided inside the network are the intellectual property of Brand Activation Network and are licensed to you for personal and business use. They may not be resold or redistributed without express written permission.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">5. Limitation of Liability</h2>
              <p className="text-zinc-400 leading-relaxed">
                Brand Activation Network shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform or reliance on the curriculum.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">6. Contact</h2>
              <p className="text-zinc-400 leading-relaxed">
                Questions about these Terms should be sent to <a href="mailto:support@brandactivationnetwork.com" className="text-[var(--primary)] hover:underline">support@brandactivationnetwork.com</a>.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </main>
    </div>
  );
}
