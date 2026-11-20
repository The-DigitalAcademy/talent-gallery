"use client";

import { usePathname } from "next/navigation";
import Navbar from "./landing/Navbar";
import FooterCTA from "./landing/FooterCTA";
import ShortlistFAB from "./ShortlistFAB";
import CookieBanner from "./ui/CookieBanner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const isCandidate = pathname?.startsWith("/candidate");

  if (isAdmin || isCandidate) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 mt-16">{children}</main>
      <FooterCTA />
      <ShortlistFAB />
      <CookieBanner />
    </>
  );
}
