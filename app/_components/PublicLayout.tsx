"use client";

import { usePathname } from "next/navigation";
import Navbar from "./landing/Navbar";
import FooterCTA from "./landing/FooterCTA";

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
      <main className="flex-1">{children}</main>
      <FooterCTA />
    </>
  );
}
