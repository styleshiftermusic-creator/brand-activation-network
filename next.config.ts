import type { NextConfig } from "next";

const scriptSrc = "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://challenges.cloudflare.com https://www.gstatic.com https://apis.google.com";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["lucide-react", "recharts"],
    nextScriptWorkers: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "Cross-Origin-Resource-Policy",
            value: "same-origin",
          },
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; ${scriptSrc}; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: https://*.gstatic.com; frame-src 'self' https://ban-credit-union-app.web.app https://js.stripe.com https://challenges.cloudflare.com; connect-src 'self' https://*.supabase.co https://*.supabase.in wss://*.supabase.co https://api.stripe.com https://prod.spline.design https://*.spline.design https://*.googleapis.com https://*.firebaseio.com https://ban-credit-union-app.firebaseapp.com https://*.gstatic.com https://*.firebasestorage.app; worker-src 'self' blob:; child-src 'self' blob:; font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com; frame-ancestors 'self'; report-to csp-endpoint; report-uri /api/csp-report`,
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
