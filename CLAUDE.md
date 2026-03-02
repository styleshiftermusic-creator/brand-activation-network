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
- Modules 1-3 already generated, 4-7 pending (quota limit)

## Known Issues / Pending Work

1. Study guides render as raw text — needs a markdown renderer component
2. Module durations hardcoded — should be set when real videos are finalized
3. Dashboard progress shows 0% — `course_progress` not wired to UI updates
4. Modules 4-7 audio not generated yet (ElevenLabs quota)
5. audioSrc for modules 4-7 still references .wav files (should be .mp3 after generation)

## Commands

- `npm run dev` — Local dev server
- `npm run build` — Production build
- `node scripts/generate-audio.js` — Generate TED Talk audio files
