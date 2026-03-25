# Brand Activation Network — AI System Instructions

This document serves as the master blueprint for all AI agents (Antigravity, Claude, etc.) operating within this workspace. You MUST read and adhere to these guidelines before executing any changes.

## 1. System & Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Database & Auth:** Supabase (PostgreSQL, Email/Password, RLS)
- **Payments:** Stripe (Webhook driven user provisioning)
- **Deployment:** Vercel
- **Styling:** Vanilla CSS (`globals.css`) — absolutely NO Tailwind unless specifically requested.

## 2. Global Design System (UI Pro Max Rules)
- **Theme:** Strict Dark Mode. Pure black backgrounds (`#000000`).
- **Accent:** Emerald Green (`#00D084`). Use this for primary CTAs, active states, and subtle glow effects (`box-shadow: 0 0 15px rgba(0, 208, 132, 0.3)`).
- **Glassmorphism:** Use translucent backgrounds with backdrop-filter blurs for cards, modals, and navigation components.
  - Example: `background: rgba(20, 20, 20, 0.4); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.05);`
- **Typography:** `Inter` font. Clean, highly legible, modern hierarchy.
- **Animations:** Include micro-interactions on hover (scale up, border color shifts) and smooth page transitions using standard CSS `transition: all 0.3s ease;` or Framer Motion if installed.

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
