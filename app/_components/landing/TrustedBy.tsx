"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PARTNERS = [
  { name: "Lombard", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/lombard.png", width: 120, height: 40 },
  { name: "THESL", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/thesl.png", width: 90, height: 35 },
  { name: "Sanlam", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/sanlam.png", width: 120, height: 40 },
  { name: "Absa", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/absa.png", width: 45, height: 45 },
  { name: "MTN", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/mtn.jpg", width: 50, height: 50 },
  { name: "Leroy Merlin", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/leroy-merlin.png", width: 95, height: 40 },
  { name: "Oliver", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/oliver.png", width: 95, height: 35 },
  { name: "AppCentrix", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/appcentrix.png", width: 110, height: 40 },
  { name: "Bradshaw LeRoux", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/bradshaw-leroux.png", width: 120, height: 40 },
  { name: "GSB", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/gsb.png", width: 120, height: 40 },
  { name: "Mondtes", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/mondtes.webp", width: 95, height: 40 },
  { name: "Philippi Village", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/philippi-village.png", width: 95, height: 40 },
  { name: "Sun International", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/sun-international.png", width: 110, height: 40 },
  { name: "Slipstream", src: "https://w4u9ywo6wdd8vjiq.public.blob.vercel-storage.com/partners/slipstream.png", width: 110, height: 40 },
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

  // Get 5 visible partners in an infinite wrapping slice
  const visiblePartners = [
    PARTNERS[startIndex % PARTNERS.length],
    PARTNERS[(startIndex + 1) % PARTNERS.length],
    PARTNERS[(startIndex + 2) % PARTNERS.length],
    PARTNERS[(startIndex + 3) % PARTNERS.length],
    PARTNERS[(startIndex + 4) % PARTNERS.length],
  ];

  return (
    <section className="bg-white py-12 overflow-hidden w-full">
      <div className="w-full">
        
        {/* Grey outer card matching Candidate Status box style — full width and border-radius reset */}
        <div className="bg-[#EFEFEF] rounded-[3px] overflow-hidden grid grid-cols-1 md:grid-cols-[540px_1fr] items-stretch relative min-h-[300px] md:min-h-[440px] w-full">
          
          {/* LEFT: Portrait Image spanning full height */}
          <div className="relative w-full h-full  min-h-[280px]">
            <Image
              src="/stock images/partners stock.png"
              alt="Partner professional"
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* RIGHT: Text content & Overlay Logo Carousel */}
          <div className="p-8 md:py-12 md:pr-16 md:pl-12 flex flex-col justify-center gap-7 relative z-10">
            
            {/* Heading & Subtitle */}
            <div className="md:-mt-9.5">
              <h2 className="text-[32px] font-medium text-black uppercase tracking-wider">
                TRUSTED BY
              </h2>
              <p className="mt-2 text-[18px] text-black max-w-3xl leading-relaxed">
                Organisations that have hosted WPE learners, partnered on talent initiatives, or
                hired Shaper candidates.
              </p>
            </div>

            {/* Logo Carousel Card — overlaps onto the image on the left on desktop */}
            <div 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="bg-white rounded-[3px] px-4 py-4 flex items-center justify-between relative border border-gray-200 min-h-[90px] md:-ml-110 md:top-8 z-20"
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

              {/* Rendered Partner Logos — 2 visible on mobile (larger & prominent), 3 on sm, 5 on md+ */}
              <div className="flex items-center justify-around flex-1 gap-4 sm:gap-6 px-2 sm:px-4">
                {visiblePartners.map((partner, index) => (
                  <div
                    key={partner.name}
                    className={`relative h-12 sm:h-20 items-center justify-center flex-1 max-w-[260px] sm:max-w-[130px] ${
                      index >= 2 ? (index === 2 ? "hidden sm:flex" : "hidden md:flex") : "flex"
                    }`}
                  >
                    <Image
                      src={partner.src}
                      alt={`${partner.name} Logo`}
                      width={partner.width}
                      height={partner.height}
                      className="max-h-12 sm:max-h-20 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
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
