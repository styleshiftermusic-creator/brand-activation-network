import type { BrandConfig } from "./brand-types";
import { banConfig } from "@/brands/ban";

/**
 * Brand registry — maps entity IDs to their configs.
 * Add new entities here as they're onboarded.
 */
const brands: Record<string, BrandConfig> = {
  ban: banConfig,
};

/**
 * Resolves the active brand config.
 *
 * Reads NEXT_PUBLIC_BRAND_ID from environment, defaults to "ban".
 * This runs at build time in RSC — no client-side overhead.
 */
export function getBrandConfig(): BrandConfig {
  const brandId = process.env.NEXT_PUBLIC_BRAND_ID ?? "ban";
  const config = brands[brandId];

  if (!config) {
    console.warn(`[brand] Unknown brand ID "${brandId}", falling back to "ban"`);
    return brands.ban;
  }

  return config;
}

/**
 * Returns the brand ID string for use as the data-brand attribute.
 */
export function getBrandId(): string {
  return (process.env.NEXT_PUBLIC_BRAND_ID ?? "ban");
}
