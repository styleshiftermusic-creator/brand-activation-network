import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { ReferralTracker } from "@/components/ReferralTracker";
import { AuthRedirect } from "@/components/AuthRedirect";
import { Suspense } from "react";
import { Footer } from "@/components/Footer";
import { MotionProvider } from "@/components/MotionProvider";
import { getBrandConfig } from "@/lib/brand";
import "./globals.css";

const syne = Syne({ 
  variable: "--font-heading", 
  subsets: ["latin"] 
});

const outfit = Outfit({ 
  variable: "--font-sans", 
  subsets: ["latin"] 
});

const jetbrainsMono = JetBrains_Mono({ 
  variable: "--font-mono", 
  subsets: ["latin"] 
});

const brand = getBrandConfig();

export const metadata: Metadata = {
  title: {
    default: brand.metadata.title,
    template: `%s | ${brand.name}`,
  },
  description: brand.metadata.description,
  keywords: [
    "business funding", "high-ticket sales", "AI automation",
    "credit repair", "brand activation", "business scaling",
  ],
  authors: [{ name: brand.name }],
  creator: brand.name,
  publisher: brand.name,
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL(`https://${brand.domain}`),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: brand.metadata.title,
    description: brand.metadata.description,
    siteName: brand.name,
    type: "website",
    locale: "en_US",
    url: `https://${brand.domain}`,
    images: [
      {
        url: brand.metadata.ogImage,
        width: 1200,
        height: 630,
        alt: brand.metadata.title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: brand.metadata.title,
    description: brand.metadata.description,
    images: [brand.metadata.ogImage],
    creator: brand.metadata.twitterHandle,
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
    <html lang="en" data-brand={brand.id}>
      <head>
        <meta name="theme-color" content={brand.tokens.primary} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${outfit.variable} ${syne.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <MotionProvider>
          <Suspense fallback={null}>
            <ReferralTracker />
            <AuthRedirect />
          </Suspense>
          <Analytics />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
