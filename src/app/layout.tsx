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
  title: "Brand Activation Network | Autonomy at the Speed of Thought",
  description: "Master the exact blueprint to secure business funding, automate high-ticket sales, and completely scale your life. The 7-module system for building with AI.",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  metadataBase: new URL("https://brandactivationnetwork.com"),
  openGraph: {
    title: "Brand Activation Network",
    description: "Master business funding, high-ticket sales, and AI-powered systems. The 7-module blueprint to scale your brand.",
    siteName: "Brand Activation Network",
    type: "website",
    url: "https://brandactivationnetwork.com",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Brand Activation Network — Master Business Funding • High-Ticket Sales • AI Systems",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Brand Activation Network",
    description: "Master business funding, high-ticket sales, and AI-powered systems. The 7-module blueprint to scale your brand.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
