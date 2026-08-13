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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 z-50 bg-[#F1F1F1] border-b border-gray-200 w-screen">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-16">
        <div className="flex items-center justify-between h-16">

          {/* Logo + Hamburger (Mobile Left) */}
          <div className="flex items-center gap-3">
            {/* Hamburger Button on Mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-700 hover:text-black p-1 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/shaper-logo-horizontal.png"
                alt="Shaper Logo"
                width={140}
                height={36}
                className="h-8 md:h-9 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`relative text-[16px] pb-0.5 transition-all ${
                activeSection === "home"
                  ? "font-semibold text-black after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-red-500"
                  : "font-medium text-black hover:text-black"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              className={`relative text-[16px] pb-0.5 transition-all ${
                activeSection === "how-it-works"
                  ? "font-semibold text-black after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-red-500"
                  : "font-medium text-black hover:text-black"
              }`}
            >
              How it Works
            </Link>
            <Link
              href="/talent"
              className={`relative text-[16px] pb-0.5 transition-all ${
                activeSection === "browse-talent"
                  ? "font-semibold text-black after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-red-500"
                  : "font-medium text-black hover:text-black"
              }`}
            >
              Browse Talent
            </Link>
          </nav>

        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 flex flex-col gap-4 bg-[#F1F1F1]">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[16px] px-2 py-1 ${
                activeSection === "home" ? "font-bold text-red-600" : "font-medium text-gray-700"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[16px] px-2 py-1 ${
                activeSection === "how-it-works" ? "font-bold text-red-600" : "font-medium text-gray-700"
              }`}
            >
              How it Works
            </Link>
            <Link
              href="/talent"
              onClick={() => setMobileMenuOpen(false)}
              className={`text-[16px] px-2 py-1 ${
                activeSection === "browse-talent" ? "font-bold text-red-600" : "font-medium text-gray-700"
              }`}
            >
              Browse Talent
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
