"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PARTNERS = [
  { name: "Lombard", src: "/partners/lombard.png", width: 120, height: 40 },
  { name: "THESL", src: "/partners/Newest-Thesl-Logo.png", width: 90, height: 35 },
  { name: "Sanlam", src: "/partners/sanlam-blue-logo.png", width: 120, height: 40 },
  { name: "Absa", src: "/partners/Absa_Logo.svg.png", width: 45, height: 45 },
  { name: "MTN", src: "/partners/New-mtn-logo.jpg", width: 50, height: 50 },
  { name: "Leroy Merlin", src: "/partners/logo-leroy.png", width: 95, height: 40 },
  { name: "Oliver", src: "/partners/logo-oliver-black.png", width: 95, height: 35 },
  { name: "AppCentrix", src: "/partners/2024_AppCentrix-Colour-Logo-scaled.png", width: 110, height: 40 },
  { name: "Bradshaw LeRoux", src: "/partners/Bradshaw-LeRoux-Logo-green-PNGtransparent.png", width: 120, height: 40 },
  { name: "GSB", src: "/partners/GSB_Fullform Logo_20231109.png", width: 120, height: 40 },
  { name: "Mondtes", src: "/partners/Mondtes-Logo-New-2025.webp", width: 95, height: 40 },
  { name: "Retina", src: "/partners/Retina-logo.png", width: 95, height: 40 },
  { name: "Sun International", src: "/partners/Sun_International_logo.svg.png", width: 110, height: 40 },
  { name: "Slipstream", src: "/partners/slipstream-logo-colour.png", width: 110, height: 40 },
];

export default function TrustedBy() {
  const [startIndex, setStartIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-play sliding effect: triggers every 2.5 seconds for a dynamic flow
  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % PARTNERS.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [isHovered]);

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + PARTNERS.length) % PARTNERS.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % PARTNERS.length);
  };

  // Get 4 visible partners in an infinite wrapping slice
  const visiblePartners = [
    PARTNERS[startIndex % PARTNERS.length],
    PARTNERS[(startIndex + 1) % PARTNERS.length],
    PARTNERS[(startIndex + 2) % PARTNERS.length],
    PARTNERS[(startIndex + 3) % PARTNERS.length],
  ];

  return (
    <section className="bg-white py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {/* Grey outer card matching Candidate Status box style */}
        <div className="bg-[#EFEFEF] rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-[300px_1fr] items-stretch relative min-h-[300px]">
          
          {/* LEFT: Portrait Image spanning full height */}
          <div className="relative w-full h-full min-h-[280px]">
            <Image
              src="/stock images/partners stock.png"
              alt="Partner professional"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* RIGHT: Text content & Overlay Logo Carousel */}
          <div className="p-8 md:py-10 md:pr-10 md:pl-8 flex flex-col justify-center gap-6 relative z-10">
            
            {/* Heading & Subtitle */}
            <div>
              <h2 className="text-[24px] font-bold text-gray-900 uppercase tracking-wider">
                TRUSTED BY
              </h2>
              <p className="mt-2 text-[17px] text-gray-500 max-w-xl leading-relaxed">
                Organisations that have hosted WPE learners, partnered on talent initiatives, or
                hired Shaper candidates.
              </p>
            </div>

            {/* Logo Carousel Card — overlaps onto the image on the left */}
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-white rounded-xl px-4 py-4 flex items-center justify-between relative border border-gray-200 min-h-[90px] md:-ml-28 z-20"
            >
              
              {/* Left Arrow (Chevron Caret Icon) */}
              <button 
                onClick={handlePrev}
                aria-label="Previous partners"
                className="text-gray-400 hover:text-gray-700 transition-colors p-2 select-none cursor-pointer flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              {/* Rendered Partner Logos */}
              <div className="flex items-center justify-around flex-1 gap-6 px-4">
                {visiblePartners.map((partner) => (
                  <div key={partner.name} className="relative h-12 flex items-center justify-center flex-1 max-w-[130px]">
                    <Image
                      src={partner.src}
                      alt={`${partner.name} Logo`}
                      width={partner.width}
                      height={partner.height}
                      className="max-h-11 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                ))}
              </div>

              {/* Right Arrow (Chevron Caret Icon) */}
              <button 
                onClick={handleNext}
                aria-label="Next partners"
                className="text-gray-400 hover:text-gray-700 transition-colors p-2 select-none cursor-pointer flex items-center justify-center"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
