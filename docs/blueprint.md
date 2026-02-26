# Project Constitution: Brand Activation Network

## 1. Core Identity

- **Project Name:** Brand Activation Network (BAN)
- **Objective:** Provide a scalable "AI Workshop Engine" that allows agency owners to collapse decades into days via automation and high-ticket sales.
- **Aesthetic:** High-end, premium, dark mode, glassmorphic. "Million-dollar SaaS" look. Use vibrant primary accents (Electric Purple/Blue).

## 2. Architecture & Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS (Strictly adhere to customized `globals.css` variable system)
- **Database/Auth:** Supabase
- **Payments:** Stripe
- **Infrastructure:** Vercel

## 3. The BLAST Rules of Engagement

### B - Blueprint (Always Follow)

- **Security First:** DO NOT expose Supabase ANON keys or Turnstile logic to the client. Validate everything server-side using Zod.
- **No Hallucinations:** When building a new UI, do not invent generic components. Use "UI Sniping" (e.g., v0, 21st.dev) to ensure top-tier aesthetics.
- **Dependency Rule:** Before running `npm install`, always check if a native Next.js or Tailwind solution exists. Keep the footprint light.

### L - Links (Integrations)

- **Cloudflare Turnstile:** Mandatory on all public-facing lead capture forms.
- **Upstash Redis:** Mandatory rate limiting (5 req/15min) on all submission endpoints.

### A - Architect

- Build the database schema (`supabase`) and backend API routes before touching the frontend UI.
- Use the `backend-expert` skill for any data pipeline tasks.

### S - Style

- Typography: Geist/Geist Mono (or Inter).
- Components must be fully responsive and include modern micro-interactions (hover states, subtle active scales).

### T - Trigger

- Work towards full automation. Use Vercel Serverless or Cron jobs for recurring tasks (e.g., syncing Stripe data to Supabase).

## 4. Operational Directives

- If a terminal command fails, immediately invoke the `debugger` skill. Do not guess.
- Update `docs/findings.md` every time a complex bug is resolved.
