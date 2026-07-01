import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "./components/GoogleAnalytics";
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
    default: "Talent Directory | Shaper",
    template: "%s | Shaper Talent",
  },
  description: "Discover and connect with top-tier, broadcast-ready specialized creative professionals and engineering talents.",
  keywords: ["Talent Directory", "Creative Specialists", "AI Engineering", "Portfolio Showcase"],
  authors: [{ name: "Shaper" }],
  creator: "Shaper",
  metadataBase: new URL("https://talent-gallery.vercel.app"), // TODO Replace with  production domain 
  
  // Open Graph (Facebook / LinkedIn Previews)
  openGraph: {
    title: "Talent Directory | Shaper",
    description: "Discover and connect with our talented learners.",
    url: "https://talent-gallery.vercel.app",
    siteName: "Shaper Talent",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/shaper_logo.png", // Shaper thumbnail
        width: 1200,
        height: 630,
        alt: "Shaper Talent Showcase",
      },
    ],
  },

  // Twitter Cards
  twitter: {
    card: "summary_large_image",
    title: "Talent Directory | Shaper",
    description: "Discover and connect with our talented learners.",
    images: ["/og-image.jpg"],
  },

  // Search Engine Robots Instructions
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
