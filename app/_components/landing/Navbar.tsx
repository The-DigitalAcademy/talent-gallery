"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero");
      const howItWorks = document.getElementById("how-it-works");
      const browseTalent = document.getElementById("browse-talent");

      // Offset by navbar height (approx 80px) to trigger tab switch accurately
      const scrollPos = window.scrollY + 120;

      if (browseTalent && scrollPos >= browseTalent.offsetTop) {
        setActiveSection("browse-talent");
      } else if (howItWorks && scrollPos >= howItWorks.offsetTop) {
        setActiveSection("how-it-works");
      } else {
        setActiveSection("hero");
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call handler once to set initial active tab on page mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/#hero" className="flex items-center">
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
              href="/#hero"
              className={`relative text-[16px] pb-0.5 transition-all ${
                activeSection === "hero"
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
              href="/#browse-talent"
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
