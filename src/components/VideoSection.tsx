import { Play, Zap } from "lucide-react";
import { ScrollReveal } from "@/components/ScrollReveal";

interface VideoSectionProps {
  videoUrl?: string;
}

export function VideoSection({ videoUrl }: VideoSectionProps) {
  return (
    <ScrollReveal delay={0.05}>
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-16 w-full">
        {/* Badge + Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--brand-primary)]/20 bg-[var(--brand-primary)]/5 text-[10px] font-mono tracking-[0.2em] text-[var(--brand-primary)] uppercase mb-5">
            <Play className="w-3 h-3 fill-current" />
            See the System
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-3 font-heading">
            Watch How It Works
          </h2>
          <p className="text-zinc-500 max-w-xl mx-auto font-light leading-relaxed">
            A quick breakdown of the full system — from credit manufacturing to automated sales.
          </p>
        </div>

        {/* Video Container */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-black/40 backdrop-blur-sm aspect-video max-w-3xl mx-auto group">
          {videoUrl ? (
            <iframe
              src={videoUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="BAN System Walkthrough"
            />
          ) : (
            /* Placeholder state */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {/* Ambient glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/5 via-transparent to-[var(--brand-secondary)]/5 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[var(--brand-primary)]/10 rounded-full blur-[80px] pointer-events-none" />

              {/* Play button */}
              <div className="relative z-10 w-20 h-20 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--brand-primary)]/40 transition-all duration-300">
                <Play className="w-8 h-8 text-white/60 fill-white/60 ml-1" />
              </div>
              <p className="relative z-10 text-sm text-zinc-600 font-mono uppercase tracking-widest">
                Full walkthrough coming soon
              </p>
              <p className="relative z-10 text-xs text-zinc-700">
                Apply now for early access
              </p>
            </div>
          )}
        </div>

        {/* Mini stat pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          {[
            { icon: <Zap className="w-3 h-3" />, label: "7 Modules" },
            { icon: <Zap className="w-3 h-3" />, label: "200+ AI Prompts" },
            { icon: <Zap className="w-3 h-3" />, label: "Lifetime Access" },
          ].map((pill) => (
            <div
              key={pill.label}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] text-xs text-zinc-500 font-medium"
            >
              <span className="text-[var(--brand-primary)]">{pill.icon}</span>
              {pill.label}
            </div>
          ))}
        </div>
      </section>
    </ScrollReveal>
  );
}
