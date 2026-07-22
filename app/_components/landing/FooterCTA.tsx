export default function FooterCTA() {
  return (
    <footer id="contact" className="relative w-full overflow-hidden">
      
      {/* Background Split for Full-Width Screen */}
      <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-[60%_40%] -z-10 pointer-events-none">
        <div className="bg-[#FF0000]" />
        <div className="bg-[#00338D]" />
      </div>

      {/* Content Container aligned to max-w-7xl */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-[60%_40%] py-12 md:py-14 items-center gap-8 md:gap-0">
        
        {/* LEFT: Red Info Block */}
        <div className="md:pr-12">
          <h2 className="text-[19px] sm:text-[24px] md:text-[32px] uppercase tracking-wider leading-snug sm:leading-tight">
            <span className="text-black font-normal">READY TO EXPLORE </span>
            <span className="text-white font-bold">TALENT?</span>
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-black font-normal max-w-lg leading-relaxed">
            Tell us what role you're hiring for, and we'll help identify suitable
            candidates from the Shaper TALENT network.
          </p>
        </div>

        {/* RIGHT: Navy Contact Block */}
        <div className="flex flex-col items-center md:items-center justify-center">
          <div className="flex flex-col gap-4 items-start">
            
            {/* Email */}
            <div className="flex items-center gap-3.5">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6 text-white">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <a href="mailto:talent@shaper.co.za" className="text-[17px] md:text-[18px] font-medium text-white hover:underline whitespace-nowrap">
                talent@shaper.co.za
              </a>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3.5">
              <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6 text-white">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <a href="tel:0115686887" className="text-[17px] md:text-[18px] font-medium text-white hover:underline whitespace-nowrap">
                011 568 6887
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Copyright Sub-Bar */}
      <div className="bg-[#002259] py-3 text-center text-xs text-white/70 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} Shaper Talent. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
