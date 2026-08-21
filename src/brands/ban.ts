import type { BrandConfig } from "@/lib/brand-types";

/**
 * Brand Activation Network — Entity Configuration
 *
 * Identity: "The Operator's Console"
 * Palette: Ultraviolet primary, Teal conversion accent
 * Typography: Syne (display) + Outfit (body) + JetBrains Mono (utility)
 */
export const banConfig: BrandConfig = {
  id: "ban",
  name: "Brand Activation Network",
  domain: "brandactivationnetwork.com",
  tagline: "Autonomy at the Speed of Thought",
  supportEmail: "support@brandactivationnetwork.com",
  senderEmail: "The Master Blueprint <onboarding@brandactivationnetwork.com>",

  tokens: {
    background:     "#0C0B12",
    surface:        "#16151F",
    primary:        "#A855F7",
    primaryLight:   "#C084FC",
    secondary:      "#14B8A6",
    secondaryLight: "#2DD4BF",
    border:         "#1E1D2A",
    muted:          "#9CA3AF",
    ring:           "#A855F7",
    danger:         "#EF4444",
    warning:        "#F59E0B",
    info:           "#38BDF8",
  },

  fonts: {
    heading: { family: "Syne",           variable: "--font-heading" },
    body:    { family: "Outfit",         variable: "--font-sans" },
    utility: { family: "JetBrains Mono", variable: "--font-mono" },
  },

  motion: {
    duration: "300ms",
    easing:   "cubic-bezier(0.4, 0, 0.2, 1)",
  },

  glow: {
    primary:   "rgba(168, 85, 247, 0.45)",
    secondary: "rgba(20, 184, 166, 0.40)",
  },

  metadata: {
    title:         "Brand Activation Network | Autonomy at the Speed of Thought",
    description:   "Master the exact blueprint to secure business funding, automate high-ticket sales, and completely scale your life. The 7-module system for building with AI.",
    ogImage:       "/og-image.png",
    twitterHandle: "@brandactivation",
  },
};
