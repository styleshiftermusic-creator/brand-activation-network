/**
 * Brand Token System — Type Definitions
 *
 * Every entity in the network implements this contract.
 * Components consume tokens via CSS custom properties;
 * these types enforce completeness at the config level.
 */

export interface BrandTokens {
  /** Page background */
  background: string;
  /** Elevated surface (cards, panels) */
  surface: string;
  /** Primary brand accent — CTAs, focus rings, active states */
  primary: string;
  /** Lighter primary — gradients, hover states */
  primaryLight: string;
  /** Conversion / secondary accent — final CTAs, success */
  secondary: string;
  /** Lighter secondary — badges, subtle highlights */
  secondaryLight: string;
  /** Neutral border color */
  border: string;
  /** Muted / secondary text */
  muted: string;
  /** Focus ring color */
  ring: string;
  /** Destructive / error states */
  danger: string;
  /** Urgency / bonus / scarcity markers */
  warning: string;
  /** Informational accents */
  info: string;
}

export interface BrandFont {
  /** Google Fonts family name */
  family: string;
  /** CSS custom property name (e.g., "--font-heading") */
  variable: string;
}

export interface BrandGlow {
  /** Primary glow rgba for box-shadows and ambient orbs */
  primary: string;
  /** Secondary glow rgba for conversion elements */
  secondary: string;
}

export interface BrandMotion {
  /** Default transition duration */
  duration: string;
  /** Default easing curve */
  easing: string;
}

export interface BrandMetadata {
  /** Default page title */
  title: string;
  /** Meta description */
  description: string;
  /** OG image path (relative to /public) */
  ogImage: string;
  /** Twitter/X handle */
  twitterHandle: string;
}

export interface BrandConfig {
  /** Unique entity identifier (used as data-brand attribute value) */
  id: string;
  /** Human-readable entity name */
  name: string;
  /** Canonical domain (no protocol) */
  domain: string;
  /** Short tagline */
  tagline: string;
  /** Support email address */
  supportEmail: string;
  /** Email sender identity */
  senderEmail: string;

  /** Design tokens — palette */
  tokens: BrandTokens;
  /** Typography — heading, body, utility fonts */
  fonts: {
    heading: BrandFont;
    body: BrandFont;
    utility: BrandFont;
  };
  /** Motion defaults */
  motion: BrandMotion;
  /** Glow / ambient effect colors */
  glow: BrandGlow;
  /** SEO / OG metadata */
  metadata: BrandMetadata;
}
