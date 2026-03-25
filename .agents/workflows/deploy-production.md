---
description: How to deploy the Brand Activation Network to production
---

# Deployment Workflow

Follow these steps exactly when deploying the application to ensure all checks pass and the build is stable.

1. **Check for Type Errors and Linting**
   Run the build step locally first to ensure there are no compilation errors.
   ```bash
   npm run build
   ```

2. **Verify Environment Variables**
   Ensure `.env.production` is present or that Vercel has the correct environment variables set (especially Supabase and Stripe keys).

3. **Deploy to Vercel**
   If the local build succeeds, you can push to the main branch to trigger an automatic Vercel deployment, or use the Vercel CLI (if installed) to deploy directly.
   // turbo
   ```bash
   git push origin main
   ```

4. **Post-Deployment Verification**
   Verify the live site at `brandactivationnetwork.com`. Check that:
   - The homepage loads without errors.
   - Authentication (login/register) works.
   - The Stripe paywall triggers correctly.
