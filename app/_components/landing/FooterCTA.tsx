export default function FooterCTA() {
  return (
    <section className="relative w-full overflow-hidden">
      
      {/* Background Split for Full-Width Screen */}
      <div className="absolute inset-0 grid grid-cols-[60%_40%] -z-10 pointer-events-none">
        <div className="bg-red-600" />
        <div className="bg-[#01317F]" />
      </div>

      {/* Content Container aligned to max-w-7xl */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-[60%_40%] text-white py-14 items-center">
        
        {/* LEFT: Red Info Block */}
        <div className="pr-12">
          <h2 className="text-4xl font-bold tracking-tight uppercase leading-tight">
            READY TO EXPLORE <span className="font-extrabold">TALENT?</span>
          </h2>
          <p className="mt-4 text-[15px] text-white/90 max-w-lg leading-relaxed">
            Tell us what role you're hiring for, and we'll help identify suitable
            candidates from the Shaper TALENT network.
          </p>
        </div>

        {/* RIGHT: Navy Contact Block */}
        <div className="pl-12 flex flex-col gap-6 items-center justify-center">
          
          {/* Email */}
          <div className="flex items-center gap-4 w-fit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6 text-white/80">
              <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <a href="mailto:info@shaper.co.za" className="text-[16px] font-semibold hover:underline">
              info@shaper.co.za
            </a>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-4 w-fit">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6 text-white/80">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <a href="tel:0115686887" className="text-[16px] font-semibold hover:underline">
              011 568 6887
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
