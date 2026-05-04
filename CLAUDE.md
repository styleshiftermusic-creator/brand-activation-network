# Brand Activation Network — Project Context

## Overview

A premium SaaS platform for financial education and business coaching. Built with **Next.js 14** (App Router), **Supabase** (auth + database), **Stripe** (payments), deployed on **Vercel** at `brandactivationnetwork.com`.

## Tech Stack

- **Framework:** Next.js 14 with App Router
- **Auth:** Supabase (email/password, protected routes)
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe webhook → auto user provisioning
- **Styling:** Vanilla CSS (globals.css) — dark glassmorphic theme, emerald green (#00D084) accents
- **Deployment:** Vercel (auto-deploy from git push)

## Architecture

### Pages

- `/` — Marketing/sales landing page
- `/challenge` — Free challenge funnel page
- `/dashboard` — Main dashboard (protected)
- `/dashboard/master-course` — 7-module course with audio player, study guides, quizzes
- `/dashboard/blueprints` — Blueprint library
- `/dashboard/data-sources` — Financial data sources reference
- `/dashboard/antigravity-system` — System overview
- `/dashboard/gemma` — AI Lab (Gemma 4 Playground)

### Key Files

- `src/data/course-content.ts` — All 7 module study guides + quiz data
- `src/components/dashboard/ProtectedRoute.tsx` — Supabase auth wrapper
- `src/components/dashboard/Sidebar.tsx` — Navigation sidebar with mobile hamburger
- `src/components/dashboard/Quiz.tsx` — Interactive quiz component
- `src/components/dashboard/MissionFeed.tsx` — Dashboard activity feed
- `src/components/dashboard/AuthScreen.tsx` — Login/register screen
- `src/app/api/webhooks/stripe/route.ts` — Stripe webhook handler
- `src/app/api/register/route.ts` — User registration API
- `src/lib/supabase.ts` — Supabase client configuration

### Supabase Tables

- `users` — User accounts (created via Stripe webhook or manual registration)
- `course_progress` — Module completion tracking (status field: locked/unlocked/completed)

### Environment Variables (.env.local)

- `NEXT_PUBLIC_SUPABASE_URL` — Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Supabase anonymous key
- `ELEVENLABS_API_KEY` — ElevenLabs TTS API key (for audio generation)
- `ELEVENLABS_VOICE_ID` — Voice ID for narration
- `GOOGLE_AI_API_KEY` — Google AI Studio API key (for Gemma 4 access)
- `UPSTASH_REDIS_REST_URL` — Upstash Redis URL (for rate limiting)
- `UPSTASH_REDIS_REST_TOKEN` — Upstash Redis Token (for rate limiting)

## Design System

- **Theme:** Dark mode only, pure black backgrounds
- **Accent color:** Emerald green (#00D084) with glow effects
- **Materials:** Glassmorphism (backdrop-blur, rgba borders, subtle gradients)
- **Typography:** Inter font family, clean hierarchy
- **Animations:** Micro-interactions on hover, smooth transitions

## Audio Generation

- Script: `scripts/generate-audio.js`
- Reads TED Talk scripts from artifact directory, strips markdown/stage directions
- Calls ElevenLabs API, saves MP3s to `public/audio/`
- All 7 modules (1-7) have been successfully generated as .mp3 files.

## Known Issues / Pending Work

1. Study guides styling — `ReactMarkdown` is implemented but needs verified styling pass in the UI.
2. Dashboard progress wiring — `course_progress` table and logic are in place; needs verification on live dashboard.
3. Database Schema Sync — `supabase-setup.sql` has been updated with missing `quiz_scores` table and `completed_at` column. Ensure these are migrated to the Supabase instance.
4. Deployment — App needs to be verified on `localhost:3000`. (Currently showing conflicts with other projects like LIVEFREE SEARCH).

## Commands

- `npm run dev` — Local dev server
- `npm run build` — Production build
- `node scripts/generate-audio.js` — Generate TED Talk audio files
