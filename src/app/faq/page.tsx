import { SiteNav } from "@/components/SiteNav";
import { Footer } from "@/components/Footer";
import { ScrollReveal } from "@/components/ScrollReveal";
import { Plus, Minus, Search, MessageCircle } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Frequently Asked Questions | Brand Activation Network",
  description: "Get answers to common questions about business funding, AI automation, and high-ticket sales systems inside the Brand Activation Network.",
};

const FAQS = [
  {
    category: "Funding & Credit",
    questions: [
      {
        q: "Do I need good personal credit to start?",
        a: "No. Our first module is dedicated to the 'Pledge Loan Credit Hack.' We show you exactly how to build a perfect internal credit profile from scratch in 60-90 days, regardless of your starting score."
      },
      {
        q: "How fast can I secure business funding?",
        a: "If your personal profile is already optimized, our members often secure $50,000+ in 0% interest capital within 30 days. If you're starting from zero, the roadmap typically takes 90-120 days."
      },
      {
        q: "Is the funding restricted to certain uses?",
        a: "No. Since we focus on 0% interest business credit cards and lines of credit, the funds are flexible. You can use them for marketing, hiring, inventory, or scaling your infrastructure."
      }
    ]
  },
  {
    category: "The Program",
    questions: [
      {
        q: "Is this a course or a service?",
        a: "It's a Hybrid Network. You get the full 7-module curriculum (The Master Blueprint), the community of architects, and the technical assets (AI prompts, scripts, calculators). It's designed for founders who want to build their own systems rather than paying an agency $10k/month."
      },
      {
        q: "How much time do I need to commit?",
        a: "The initial setup takes about 5-7 hours to go through the core modules. After that, we recommend 3-5 hours per week to manage your AI agents and sales pipelines until they are fully autonomous."
      }
    ]
  },
  {
    category: "AI & Automation",
    questions: [
      {
        q: "Do I need to know how to code to use the AI agents?",
        a: "Not at all. We provide the exact prompt libraries and setup instructions for platforms like ChatGPT, Claude, and Zapier. If you can copy-paste, you can deploy our systems."
      },
      {
        q: "What kind of AI agents are included?",
        a: "We provide templates for Lead Generation agents, Content Creation agents, Appointment Setting agents, and Operational Fulfillment agents."
      }
    ]
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col">
      <SiteNav />

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-mono uppercase tracking-[0.3em] text-[var(--primary)] mb-4 block">Knowledge Base</span>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 font-heading">
                Questions? <span className="text-zinc-500">Answered.</span>
              </h1>
              <p className="text-zinc-400 max-w-xl mx-auto font-light leading-relaxed">
                Everything you need to know about the Master Blueprint, the credit systems, and the AI automation infrastructure.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-16">
            {FAQS.map((category, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <section>
                  <h2 className="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-8 pb-2 border-b border-white/5">
                    {category.category}
                  </h2>
                  <div className="grid gap-4">
                    {category.questions.map((faq, i) => (
                      <div 
                        key={i} 
                        className="p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all group"
                      >
                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[var(--primary)] transition-colors leading-tight">
                          {faq.q}
                        </h3>
                        <p className="text-zinc-400 leading-relaxed font-light">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.4}>
            <div className="mt-20 p-10 rounded-3xl border border-[var(--primary)]/20 bg-gradient-to-br from-[var(--primary)]/5 to-transparent text-center">
              <MessageCircle className="w-10 h-10 text-[var(--primary)] mx-auto mb-6" />
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-zinc-400 mb-8 max-w-md mx-auto font-light">
                Our team of architects is ready to help you engineer your path to scale.
              </p>
              <Link 
                href="/#apply" 
                className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-[var(--primary)] text-white font-bold hover:bg-[#b06cf0] transition-all shadow-[0_0_30px_-5px_rgba(157,78,221,0.5)]"
              >
                Submit an Application
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
