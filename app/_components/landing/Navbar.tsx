"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    if (pathname.startsWith("/talent")) {
      setActiveSection("browse-talent");
      return;
    }

    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const howItWorks = document.getElementById("how-it-works");

      const scrollPos = window.scrollY + 120;

      if (howItWorks && scrollPos >= howItWorks.offsetTop) {
        setActiveSection("how-it-works");
      } else {
        setActiveSection("home");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 bg-[#F1F1F1] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/shaper-logo-horizontal.png"
              alt="Shaper Logo"
              width={140}
              height={36}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-8">
            <Link
              href="/"
              className={`relative text-[16px] pb-0.5 transition-all ${
                activeSection === "home"
                  ? "font-semibold text-gray-900 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-red-500"
                  : "font-medium text-gray-500 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              className={`relative text-[16px] pb-0.5 transition-all ${
                activeSection === "how-it-works"
                  ? "font-semibold text-gray-900 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-red-500"
                  : "font-medium text-gray-500 hover:text-gray-900"
              }`}
            >
              How it Works
            </Link>
            <Link
              href="/talent"
              className={`relative text-[16px] pb-0.5 transition-all ${
                activeSection === "browse-talent"
                  ? "font-semibold text-gray-900 after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-red-500"
                  : "font-medium text-gray-500 hover:text-gray-900"
              }`}
            >
              Browse Talent
            </Link>
          </nav>

        </div>
      </div>
    </header>
  );
}
