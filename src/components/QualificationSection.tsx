import { CheckCircle2, XCircle } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { HeroCTA } from "@/components/WaitlistCTA";

const FOR_YOU = [
  "You run a service-based business, agency, or coaching practice",
  "You're doing at least $5K/mo and want to scale to $50K–$100K/mo",
  "You're willing to invest 5–10 hours/week implementing real systems",
  "You want capital and infrastructure — not another course to sit on a shelf",
  "You're ready to replace yourself with AI and automation",
];

const NOT_FOR_YOU = [
  "You're looking for get-rich-quick schemes with zero effort",
  "You're not willing to follow a proven blueprint step-by-step",
  "You want someone else to build your business for you",
  "You're happy trading hours for dollars indefinitely",
  "You're not coachable or open to changing how you operate",
];

interface QualificationSectionProps {
  stripeLink?: string;
}

export function QualificationSection({ stripeLink }: QualificationSectionProps) {
  return (
    <ScrollReveal delay={0.05}>
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-warning)]/20 bg-[var(--brand-warning)]/5 text-[10px] font-mono tracking-[0.2em] text-[var(--brand-warning)] uppercase mb-5">
            Be Honest With Yourself
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-heading">
            Is This Actually For You?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FOR YOU */}
          <div className="rounded-2xl border border-[var(--brand-secondary)]/15 bg-[var(--brand-secondary)]/[0.03] backdrop-blur-sm p-8">
            <h3 className="text-lg font-bold text-[var(--brand-secondary-light)] mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              This Is For You If…
            </h3>
            <ul className="space-y-4">
              {FOR_YOU.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-300 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand-secondary)] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* NOT FOR YOU */}
          <div className="rounded-2xl border border-[var(--brand-danger)]/15 bg-[var(--brand-danger)]/[0.03] backdrop-blur-sm p-8">
            <h3 className="text-lg font-bold text-[var(--brand-danger)] mb-6 flex items-center gap-2">
              <XCircle className="w-5 h-5" />
              This Is NOT For You If…
            </h3>
            <ul className="space-y-4">
              {NOT_FOR_YOU.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-zinc-400 leading-relaxed">
                  <XCircle className="w-4 h-4 text-[var(--brand-danger)]/60 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA below qualification */}
        <div className="mt-12 text-center">
          <p className="text-zinc-400 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
            If you checked every box on the left, you&apos;re exactly who we built this for.
          </p>
          <HeroCTA stripeLink={stripeLink} />
        </div>
      </section>
    </ScrollReveal>
  );
}
