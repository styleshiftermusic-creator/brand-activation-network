# Security Guidelines & Configuration

This document outlines the security controls, baseline mechanisms, and incident response procedures implemented for the `brandactivationnetwork.com` web application on Vercel.

## Configuration & Headers Policy

### Canonical Redirects

All requests are normalized to the apex domain `https://brandactivationnetwork.com`.

- `www` subdomains are permanently redirected (HTTP 308) via `vercel.json`.
- HTTPS is enforced automatically by Vercel infrastructure.

### Security Headers

Security headers are applied globally via `next.config.ts`. The following mechanisms are active:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (disables geolocation, microphone, camera, and payment interfaces).

#### Content Security Policy (CSP)

We employ a Content-Security-Policy running in **Report-Only** mode.

- **Endpoint**: Violations are submitted to `/api/csp-report` and logged to Vercel Logs.
- **Allowed Origins**: `self`, Stripe API, Supabase, Cloudflare Challenges (Turnstile).
- *Action Item*: Monitor Vercel logs for valid 3rd-party traffic needing allowlisting before switching to an enforced policy.

#### Strict-Transport-Security (HSTS)

HSTS (`max-age=31536000; includeSubDomains; preload`) is configured for enablement **after** the site's canonical redirects and full HTTPS status are verified in the production environment.

---

## Form Protection & Rate Limiting

The primary lead capture system (`/api/register`) has been hardened to resist bot abuse and enumeration:

1. **Server-side Validation**
   - Uses `zod` to sanitize and validate payloads before touching database infrastructure.
2. **Rate Limiting**
   - Implement via **Upstash Redis** (`@upstash/ratelimit`).
   - Configured for a sliding window limit of 5 requests per 15 minutes per IP.
3. **Bot Protection**
   - Client interactions are verified server-side with **Cloudflare Turnstile** before processing data.

---

## Secret Management

Sensitive secrets must NEVER be committed to code. Manage the following variables securely via **Vercel Environment Variables**:

| Variable Name | Purpose |
|---------------|---------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` (example) | Public integration keys |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Client-side Turnstile Widget configuration |
| `TURNSTILE_SECRET_KEY` | Server-side token validation |
| `UPSTASH_REDIS_REST_URL` | Redis Rate Limiting Connection |
| `UPSTASH_REDIS_REST_TOKEN` | Redis Authentication |
| `NEXT_PUBLIC_SUPABASE_URL` | Database Connection |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Database Connection |
| `RESEND_API_KEY` | Notifications Dispatch |

---

## Supply Chain Security

To protect against vulnerable dependencies:

- **Dependabot** configuration is deployed in `.github/dependabot.yml` for automated updates.
- A GitHub Action (`.github/workflows/audit.yml`) enforces `npm audit` on every Pull Request and via scheduled weekly runs.

---

## Incident Response Guide

If a security incident (Spam, scraping, or breach) is suspected:

1. **Abuse & Spam Waves**
   - Check Upstash metrics to confirm if limits are triggering.
   - You can lower the limit in `/api/register/route.ts` if needed, or implement Vercel Edge Firewall IP bans.
2. **Access Compromise**
   - Immediately rotate affected credentials (Supabase ANON keys, Turnstile Secret) via the Vercel Dashboard and re-deploy.
3. **Analytics or CSP Breakage**
   - If a legitimate service stops working due to CSP interference, monitor the logs from `/api/csp-report`. Modify the `Content-Security-Policy-Report-Only` header in `nextConfig.ts` to include the required domain.
