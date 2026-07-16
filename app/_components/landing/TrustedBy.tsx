import Image from "next/image";

export default function TrustedBy() {
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
              <h2 className="text-2xl font-extrabold text-gray-900 uppercase tracking-widest">
                TRUSTED BY
              </h2>
              <p className="mt-2 text-[15px] text-gray-500 max-w-2xl leading-relaxed">
                Organisations that have hosted WPE learners, partnered on talent initiatives, or
                hired Shaper candidates.
              </p>
            </div>

            {/* Logo Carousel Card */}
            <div className="bg-white rounded-xl shadow-sm px-8 py-5 flex items-center justify-between relative border border-gray-100">
              
              {/* Left Arrow */}
              <button className="text-gray-400 hover:text-gray-700 transition-colors text-xs font-bold">
                &lt;
              </button>

              {/* LOGO 1: Lombard */}
              <div className="flex items-center gap-3">
                {/* Lombard Logo Mark (Grid of Dots) */}
                <div className="grid grid-cols-4 gap-1 w-7 h-7 flex-shrink-0">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#01317F]" />
                  ))}
                </div>
                <span className="text-[13px] font-extrabold tracking-widest text-[#01317F] uppercase font-sans">
                  Lombard
                </span>
              </div>

              {/* LOGO 2: THESL */}
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold tracking-widest text-[#2B79A3] font-sans relative">
                  THESL
                  <span className="absolute bottom-[-2px] left-[35%] right-[35%] h-[2.5px] bg-lime-500 rounded" />
                </span>
              </div>

              {/* LOGO 3: Sanlam */}
              <div className="flex items-center gap-2">
                {/* Sanlam Logo Icon */}
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-[#005B94]" fill="currentColor">
                  <path d="M12 2L4 10v4l8 8 8-8v-4L12 2zm0 3.5l5.5 5.5H6.5L12 5.5zm0 13L6.5 13h11l-5.5 5.5z" />
                </svg>
                <span className="text-lg font-bold text-[#005B94] tracking-tight">
                  Sanlam
                </span>
              </div>

              {/* LOGO 4: ABSA */}
              <div className="flex items-center">
                <div className="bg-[#C00] text-white rounded-full w-9 h-9 flex items-center justify-center font-bold text-xs uppercase tracking-tighter">
                  absa
                </div>
              </div>

              {/* Right Arrow */}
              <button className="text-gray-400 hover:text-gray-700 transition-colors text-xs font-bold">
                &gt;
              </button>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
