import type { Metadata } from "next";
import GoogleAnalytics from "./components/GoogleAnalytics";
import PublicLayout from "./_components/PublicLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Talent Directory | Shaper",
    template: "%s | Shaper Talent",
  },
  description: "Discover and connect with top-tier, broadcast-ready specialized creative professionals and engineering talents.",
  keywords: ["Talent Directory", "Creative Specialists", "AI Engineering", "Portfolio Showcase"],
  authors: [{ name: "Shaper" }],
  creator: "Shaper",
  metadataBase: new URL("https://talent-gallery.vercel.app"),
  
  openGraph: {
    title: "Talent Directory | Shaper",
    description: "Discover and connect with our talented learners.",
    url: "https://talent-gallery.vercel.app",
    siteName: "Shaper Talent",
    locale: "en_ZA",
    type: "website",
    images: [
      {
        url: "/shaper_logo.png",
        width: 1200,
        height: 630,
        alt: "Shaper Talent Showcase",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Talent Directory | Shaper",
    description: "Discover and connect with our talented learners.",
    images: ["/og-image.jpg"],
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="h-full antialiased scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@400;500;700;800&family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <GoogleAnalytics />
        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}
