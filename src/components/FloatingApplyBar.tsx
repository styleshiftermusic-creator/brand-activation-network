"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Zap } from "lucide-react";
import { WaitlistModal } from "./WaitlistModal";

interface FloatingApplyBarProps {
  stripeLink?: string;
}

export function FloatingApplyBar({ stripeLink }: FloatingApplyBarProps) {
  const [visible, setVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero-section");
    const finalCta = document.getElementById("apply");

    if (!hero) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === hero) {
            // Show bar when hero is NOT visible
            setVisible((prev) => {
              const finalCtaRect = finalCta?.getBoundingClientRect();
              const finalCtaVisible = finalCtaRect && finalCtaRect.top < window.innerHeight && finalCtaRect.bottom > 0;
              if (finalCtaVisible) return false;
              return !entry.isIntersecting;
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);

    // Also watch final CTA to hide bar
    if (finalCta) {
      const finalObserver = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setVisible(false);
            } else {
              // Only show if hero is also not visible
              const heroRect = hero.getBoundingClientRect();
              const heroVisible = heroRect.top < window.innerHeight && heroRect.bottom > 0;
              if (!heroVisible) setVisible(true);
            }
          }
        },
        { threshold: 0.1 }
      );
      finalObserver.observe(finalCta);
      return () => {
        observer.disconnect();
        finalObserver.disconnect();
      };
    }

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    if (stripeLink) {
      window.location.href = stripeLink;
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[var(--brand-bg)]/80 backdrop-blur-xl border-t border-white/[0.06]">
          <div className="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between gap-4">
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <Zap className="w-4 h-4 text-[var(--brand-secondary)]" />
              <span className="text-zinc-400">
                <span className="text-white font-medium">Applications open</span> · 94% acceptance rate
              </span>
            </div>
            <button
              onClick={handleClick}
              className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-light)] text-white font-bold text-sm rounded-full transition-all duration-300 shadow-[0_0_30px_-5px_var(--brand-glow-primary)] hover:shadow-[0_0_50px_-5px_var(--brand-glow-primary)] hover:-translate-y-0.5 sm:ml-auto"
            >
              Apply Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
