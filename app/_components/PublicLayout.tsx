"use client";

import { usePathname } from "next/navigation";
import Navbar from "./landing/Navbar";
import FooterCTA from "./landing/FooterCTA";
import ShortlistFAB from "./ShortlistFAB";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 mt-16">{children}</main>
      <FooterCTA />
      <ShortlistFAB />
    </>
  );
}
