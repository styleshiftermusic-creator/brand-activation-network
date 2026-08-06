"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll detection for smart header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled ? "border-b border-white/[0.06] bg-[#080808]/80 backdrop-blur-xl py-2" : "bg-transparent border-transparent py-4"}`}>
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center gap-3 w-fit z-50 relative">
            <Image
              src="/logo.png"
              alt="Brand Activation Network"
              width={160}
              height={50}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Center: Desktop Nav links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 text-sm text-zinc-400">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/results" className="hover:text-white transition-colors">
              Results
            </Link>

          </div>

          {/* Right: Desktop Member Login */}
          <div className="hidden md:flex justify-end relative z-50">
            <Link
              href="/dashboard"
              className="text-xs text-zinc-400 hover:text-white transition-colors px-6 py-2.5 border border-white/10 rounded-full hover:border-white/30 hover:bg-white/5"
            >
              Member Login
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden relative z-50 p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-[#080808]/95 backdrop-blur-2xl transition-all duration-300 md:hidden flex flex-col items-center justify-center gap-8 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          href="/about"
          className="text-2xl font-medium tracking-tight text-zinc-300 hover:text-white transition-colors"
          onClick={() => setIsOpen(false)}
        >
          About
        </Link>
        <Link
          href="/results"
          className="text-2xl font-medium tracking-tight text-zinc-300 hover:text-white transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Results
        </Link>
        <div className="w-16 h-px bg-white/10 my-4" />
        <Link
          href="/dashboard"
          className="text-lg font-medium text-[var(--primary)] px-8 py-3 rounded-full border border-[var(--primary)]/30 bg-[var(--primary)]/10 hover:bg-[var(--primary)]/20 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          Member Login
        </Link>
      </div>
    </>
  );
}
