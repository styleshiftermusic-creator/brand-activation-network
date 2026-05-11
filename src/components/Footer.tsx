"use client";

import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Linkedin, Mail } from "lucide-react";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");
  const isLogin = pathname === "/login";

  if (isDashboard || isLogin) return null;

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-md pt-20 pb-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="col-span-1 md:col-span-1 space-y-6">
            <Link href="/" className="inline-block">
              <Image 
                src="/logo.png" 
                alt="Brand Activation Network" 
                width={140} 
                height={40} 
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed font-light">
              Engineering autonomous leverage for modern founders. Secure capital, automate sales, and scale through intelligence.
            </p>
            <div className="flex items-center gap-4 text-zinc-400">
              <a href="#" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
              <a href="mailto:hello@brandactivationnetwork.com" className="hover:text-white transition-colors"><Mail className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Funnels</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><Link href="/challenge" className="hover:text-white transition-colors">The 5-Day Challenge</Link></li>
              <li><Link href="/#apply" className="hover:text-white transition-colors">Master Blueprint Application</Link></li>
              <li><Link href="/results" className="hover:text-white transition-colors">Success Stories</Link></li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Network</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Philosophy</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Member Login</Link></li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div>
            <h4 className="text-white font-bold text-sm mb-6 uppercase tracking-widest">Legal</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/#faq" className="hover:text-white transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-zinc-600 text-xs font-mono uppercase tracking-widest">
            © {new Date().getFullYear()} Brand Activation Network. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
            <span>Built by Founders for Founders</span>
            <span className="w-1 h-1 rounded-full bg-zinc-800" />
            <span>High-Ticket Architecture v4.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
