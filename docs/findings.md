# Engineering Findings & Knowledge Base

This document serves as the "Long Term Memory" for the Brand Activation Network project. It ensures that previously solved bugs, architectural decisions, and security patches are never forgotten or repeated.

## 1. Security Baseline (Implemented Feb 2026)

- **Context:** `www` to apex domain redirect required for canonical SEO.
- **Solution:** Added a permanent 308 redirect in `vercel.json` because Next.js `middleware.ts` can sometimes conflict with Vercel's edge caching for naked domains.
- **Status:** Active.

## 2. Cloudflare Turnstile Integration

- **Context:** The Turnstile widget failed on Vercel preview environments with Error `110200` ("Unable to connect").
- **Solution:** Cloudflare requires strict domain allowlisting. The `*.vercel.app` preview URL must be explicitly added to the Turnstile dashboard, not just the production domain.
- **Status:** Resolved.

## 3. Upstash Redis Rate Limiting

- **Context:** Protecting the `/api/register` endpoint from bot floods.
- **Solution:** Implemented sliding window rate limiting (5 requests / 15 minutes / IP). Note that in development, `127.0.0.1` will exhaust the limit quickly during manual testing.
- **Status:** Active.

*Add new findings here sequentially...*
