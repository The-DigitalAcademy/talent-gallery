"use client";

import { useState } from "react";
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
    <section className="bg-[#EFEFEF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14">
        <div className="grid grid-cols-[300px_1fr] gap-12 items-center">
          
          {/* LEFT: Grayscale Portrait */}
          <div className="relative h-[220px] w-full rounded-lg overflow-hidden grayscale">
            <Image
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80&grayscale"
              alt="Partner professional"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* RIGHT: Text content & Logo Carousel Card */}
          <div className="flex flex-col gap-6">
            
            {/* Heading */}
            <div>
              <h2 className="text-[27px] font-extrabold text-gray-900 uppercase tracking-widest">
                TRUSTED BY
              </h2>
              <p className="mt-2 text-[18px] text-gray-500 max-w-2xl leading-relaxed">
                Organisations that have hosted WPE learners, partnered on talent initiatives, or
                hired Shaper candidates.
              </p>
            </div>

            {/* Logo Carousel Card */}
            <div className="bg-white rounded-xl shadow-sm px-4 py-5 flex items-center justify-between relative border border-gray-100 min-h-[90px]">
              
              {/* Left Arrow */}
              <button 
                onClick={handlePrev}
                className="text-gray-400 hover:text-gray-700 transition-colors text-lg font-bold px-3 select-none cursor-pointer"
              >
                &lt;
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

              {/* Right Arrow */}
              <button 
                onClick={handleNext}
                className="text-gray-400 hover:text-gray-700 transition-colors text-lg font-bold px-3 select-none cursor-pointer"
              >
                &gt;
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
