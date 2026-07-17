import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section id="hero" className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 items-center min-h-[520px] pt-28 pb-16">

          {/* LEFT: Copy */}
          <div className="flex flex-col gap-6">
            <h1 className="text-[43px] font-medium text-gray-900 leading-tight tracking-tight uppercase">
              Work-Ready{" "}
              <span className="text-red-500">Talent.</span>
              <br />
              Ready to Shape
              <br />
              the Future.
            </h1>

            <p className="text-[21px] text-gray-500 leading-relaxed max-w-sm">
              Browse verified learners, graduates, and candidates who have
              completed practical training and workplace projects through Shaper
              programmes.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/talent"
                className="bg-[#01317F] text-white text-[18px] font-semibold px-6 py-3 rounded hover:bg-blue-900 transition-colors"
              >
                Browse Talent
              </Link>
              <Link
                href="#contact"
                className="text-[18px] font-semibold text-gray-700 hover:text-gray-900 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* RIGHT: Hero Image */}
          <div className="relative h-[460px] w-full overflow-hidden rounded-lg">
            <Image
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&grayscale"
              alt="Work-ready talent"
              fill
              className="object-cover object-center grayscale"
              priority
            />
          </div>

        </div>
      </div>

      {/* Search Bar — contained, aligned to hero content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 -mb-[38px]">
        <div className="bg-slate-200 border border-slate-300 rounded-xl px-6 py-4 shadow-sm">
          <div className="flex items-center gap-3">

            {/* Role */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[14px] font-bold text-gray-500 uppercase tracking-wider">
                Role
              </label>
              <select className="text-[18px] text-gray-500 border-0 outline-none bg-transparent cursor-pointer font-medium">
                <option value="">Select a role</option>
              </select>
            </div>
            <div className="w-px h-8 bg-slate-300" />

            {/* Location */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[14px] font-bold text-gray-500 uppercase tracking-wider">
                Location
              </label>
              <select className="text-[18px] text-gray-500 border-0 outline-none bg-transparent cursor-pointer font-medium">
                <option value="">Select a location</option>
              </select>
            </div>
            <div className="w-px h-8 bg-slate-300" />

            {/* Skills */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[14px] font-bold text-gray-500 uppercase tracking-wider">
                Skills
              </label>
              <select className="text-[18px] text-gray-500 border-0 outline-none bg-transparent cursor-pointer font-medium">
                <option value="">Select skills</option>
              </select>
            </div>
            <div className="w-px h-8 bg-slate-300" />

            {/* Availability */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[14px] font-bold text-gray-500 uppercase tracking-wider">
                Availability
              </label>
              <select className="text-[18px] text-gray-500 border-0 outline-none bg-transparent cursor-pointer font-medium">
                <option value="">Select availability</option>
              </select>
            </div>

            {/* Search Button */}
            <Link
              href="/talent"
              className="bg-[#01317F] text-white text-[18px] font-bold px-8 py-3 rounded hover:bg-blue-900 transition-colors whitespace-nowrap"
            >
              Search
            </Link>

          </div>
        </div>
      </div>
    </section>

  );
}
