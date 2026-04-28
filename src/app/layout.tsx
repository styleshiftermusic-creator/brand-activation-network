import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Brand Activation Network | Autonomy at the Speed of Thought",
    template: "%s | Brand Activation Network",
  },
  description: "Master the exact blueprint to secure business funding, automate high-ticket sales, and completely scale your life. The 7-module system for building with AI.",
  keywords: [
    "business funding",
    "credit repair",
    "high ticket sales",
    "AI automation",
    "brand activation",
    "pledge loan",
    "credit union hack",
    "business credit",
    "scaling",
    "entrepreneurship",
    "online business",
    "digital marketing",
  ],
  authors: [{ name: "Brand Activation Network" }],
  creator: "Brand Activation Network",
  publisher: "Brand Activation Network",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL("https://brandactivationnetwork.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Brand Activation Network — Master Funding, Sales & AI Systems",
    description: "The 7-module Master Blueprint to secure business funding, close high-ticket deals, and build AI-powered scaling systems. Lifetime access.",
    siteName: "Brand Activation Network",
    type: "website",
    locale: "en_US",
    url: "https://brandactivationnetwork.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brand Activation Network — Master Business Funding • High-Ticket Sales • AI Systems",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Activation Network — The Master Blueprint",
    description: "Master business funding, high-ticket sales, and AI-powered systems. The Master Blueprint to scale your brand.",
    images: ["/og-image.png"],
    creator: "@brandactivation",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#9d4edd" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
