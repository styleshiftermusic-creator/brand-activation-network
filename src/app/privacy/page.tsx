import { SiteNav } from "@/components/SiteNav";
import { ScrollReveal } from "@/components/ScrollReveal";

export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Brand Activation Network.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Brand Activation Network",
    description: "Privacy policy for the Brand Activation Network.",
    url: "https://brandactivationnetwork.com/privacy",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      <SiteNav />
      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto prose prose-invert prose-zinc prose-sm md:prose-base">
          <ScrollReveal>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-10 font-heading">Privacy Policy</h1>
            <p className="text-zinc-400 mb-8">Last Updated: May 11, 2026</p>
            
            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">1. Information We Collect</h2>
              <p className="text-zinc-400 leading-relaxed">
                We collect information you provide directly to us when you apply for the Master Blueprint, register for our challenge, or sign up for our waitlist. This includes your name, email address, phone number, and business revenue data.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <p className="text-zinc-400 leading-relaxed">
                We use the information we collect to provide, maintain, and improve our services, including to process your applications, provide access to the curriculum, and send you technical notices, updates, and support messages.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">3. Data Security</h2>
              <p className="text-zinc-400 leading-relaxed">
                We use industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. Your data is stored securely via Supabase and processed via Stripe for payments.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">4. Sharing of Information</h2>
              <p className="text-zinc-400 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as necessary to provide our services (e.g., payment processing via Stripe).
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-white text-2xl font-bold mb-4">5. Contact Us</h2>
              <p className="text-zinc-400 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@brandactivationnetwork.com" className="text-[var(--primary)] hover:underline">privacy@brandactivationnetwork.com</a>.
              </p>
            </section>
          </ScrollReveal>
        </div>
      </main>
    </div>
  );
}
