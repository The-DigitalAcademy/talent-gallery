import type { Metadata } from "next";
import GoogleAnalytics from "./_components/GoogleAnalytics";
import PublicLayout from "./_components/PublicLayout";
import "./globals.css";
import { GlobalToaster } from "./_components/GlobalToaster";

export const metadata: Metadata = {
  title: {
    default: "Talent Directory | Shaper",
    template: "%s | Shaper Talent",
  },
  description: "Discover and connect with top-tier, broadcast-ready specialized creative professionals and engineering talents.",
  keywords: ["Talent Directory", "Creative Specialists", "AI Engineering", "Portfolio Showcase"],
  authors: [{ name: "Shaper" }],
  creator: "Shaper",
  metadataBase: new URL("https://talent.shaper.co.za"),

  openGraph: {
    title: "Talent Directory | Shaper",
    description: "Discover and connect with our talented learners.",
    url: "https://talent.shaper.co.za",
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
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
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
      <body className="min-h-full flex flex-col bg-[#f1f1f1]">
        <GoogleAnalytics />
        <PublicLayout>{children}</PublicLayout>
        {modal}
        <GlobalToaster />
      </body>
    </html>
  );
}
