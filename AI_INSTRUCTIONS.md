# Brand Activation Network — AI System Instructions

This document serves as the master blueprint for all AI agents (Antigravity, Claude, etc.) operating within this workspace. You MUST read and adhere to these guidelines before executing any changes.

## 1. System & Tech Stack
- **Framework:** Next.js 16 (App Router) + React 19
- **Database & Auth:** Supabase (PostgreSQL, SSR Session Cookies, RLS)
- **Payments:** Stripe (Webhook signature verification & automated user provisioning)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS v4 (`@theme` directive in `globals.css` + CSS custom properties)

## 2. Multi-Brand Token System
- **Theme Architecture:** Multi-brand token engine scoped via `[data-brand="<id>"]` on `<html>`.
- **Entity Configurations:** Defined in `src/brands/<id>.ts` implementing the `BrandConfig` contract.
- **Zero Hard-Coded Colors:** All components must strictly consume `var(--brand-*)` or semantic aliases (`var(--primary)`, `var(--secondary)`). Never hardcode hex/rgb colors in components or page templates.
- **Shared Components:** Shared layout and visual primitives reside in `src/components/shared/` and are fully data-driven.
- **Typography:** Configured dynamically per brand (BAN uses Syne display + Outfit body + JetBrains Mono utility).
- **Animations:** Framer Motion (LazyMotion) + CSS transitions respecting `prefers-reduced-motion`.

## 3. Architecture & File Structure
- `src/app/`: Next.js App Router structure.
  - `/dashboard`: Protected routes (wrapped in `ProtectedRoute.tsx`).
- `src/components/`: Reusable UI components.
  - Keep dashboard components in `src/components/dashboard/`.
- `src/lib/`: Utility functions and clients (e.g., `supabase.ts`).
- `src/data/`: Static data and content (e.g., `course-content.ts`).

## 4. Agentic Workflow Rules
1. **Never guess the schema.** Check `@mcp:supabase` or `database-schema.md` before writing SQL/data queries.
2. **Verify environment.** Always assume this is a production-grade application. Do not leave placeholder code or "TODOs" in final implementations.
3. **Capture Knowledge.** When solving a complex architectural problem (e.g., Stripe webhooks, Audio Sync), automatically suggest saving it as a Knowledge Item (KI) in `.agents/knowledge/`.
4. **Use Established Workflows.** If acting under a specific skill (e.g., `agency-architect`, `ui-sniper`), strictly follow the `.agents/workflows/` defined for that capability.

## 5. Security Protocols
- All dashboard pages must verify user session server-side or via the established client wrapper.
- Never log environment variables (`.env.local`).
- Row Level Security (RLS) is active on Supabase; test queries against authenticated user contexts logic.
