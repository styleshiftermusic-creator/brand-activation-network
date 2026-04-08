"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { WaitlistModal } from "./WaitlistModal";

interface WaitlistCTAProps {
  stripeLink?: string;
  className?: string;
  children: React.ReactNode;
}

export function WaitlistCTA({ stripeLink, className, children }: WaitlistCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (stripeLink) {
    return (
      <a href={stripeLink} className={className}>
        {children}
      </a>
    );
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

// Convenience export for a pre-styled hero CTA variant
export function HeroCTA({ stripeLink }: { stripeLink?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (stripeLink) {
    return (
      <a
        href={stripeLink}
        className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--primary)] to-[#c77dff] hover:opacity-90 text-white font-bold text-lg md:text-xl rounded-full transition-all duration-300 shadow-[0_0_40px_-5px_rgba(157,78,221,0.5)] hover:shadow-[0_0_60px_-5px_rgba(157,78,221,0.8)] hover:-translate-y-1 w-full sm:w-auto"
      >
        Activate Network Access <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
      </a>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group relative flex items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--primary)] to-[#c77dff] hover:opacity-90 text-white font-bold text-lg md:text-xl rounded-full transition-all duration-300 shadow-[0_0_40px_-5px_rgba(157,78,221,0.5)] hover:shadow-[0_0_60px_-5px_rgba(157,78,221,0.8)] hover:-translate-y-1 w-full sm:w-auto"
      >
        Join the Waitlist <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none" />
      </button>
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

// Convenience export for a pre-styled emerald module CTA variant
export function ModuleCTA({ stripeLink }: { stripeLink?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (stripeLink) {
    return (
      <a
        href={stripeLink}
        className="group flex items-center gap-2 px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-xl transition-all duration-300 shadow-[0_0_40px_-10px_rgba(52,211,153,0.6)] hover:shadow-[0_0_60px_-10px_rgba(52,211,153,0.8)] hover:-translate-y-1"
      >
        Get All 7 Modules <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </a>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group flex items-center gap-2 px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-lg rounded-xl transition-all duration-300 shadow-[0_0_40px_-10px_rgba(52,211,153,0.6)] hover:shadow-[0_0_60px_-10px_rgba(52,211,153,0.8)] hover:-translate-y-1"
      >
        Join the Waitlist <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

// Convenience export for the large final CTA variant
export function FinalCTA({ stripeLink }: { stripeLink?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (stripeLink) {
    return (
      <a
        href={stripeLink}
        className="group inline-flex items-center gap-3 px-14 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xl rounded-xl transition-all duration-300 shadow-[0_0_60px_-10px_rgba(52,211,153,0.6)] hover:shadow-[0_0_80px_-10px_rgba(52,211,153,0.9)] hover:-translate-y-1.5"
      >
        Activate Now <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </a>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="group inline-flex items-center gap-3 px-14 py-5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xl rounded-xl transition-all duration-300 shadow-[0_0_60px_-10px_rgba(52,211,153,0.6)] hover:shadow-[0_0_80px_-10px_rgba(52,211,153,0.9)] hover:-translate-y-1.5"
      >
        Join the Waitlist <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
      </button>
      <WaitlistModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
