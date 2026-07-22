"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface LookupItem {
  id: string | number;
  name?: string;
  city?: string;
}

interface HeroSectionProps {
  locations?: LookupItem[];
  programs?: LookupItem[];
  capabilities?: LookupItem[];
  statuses?: LookupItem[];
}

export default function HeroSection({
  locations = [],
  programs = [],
  capabilities = [],
  statuses = [],
}: HeroSectionProps) {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [availability, setAvailability] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (role) params.set("programme", role);
    if (location) params.set("location", location);
    if (skill) params.set("capability", skill);
    if (availability) params.set("status", availability);

    router.push(`/talent?${params.toString()}`);
  };

  return (
    <section id="home" className="bg-[#F1F1F1] relative">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-6">
        
        {/* MOBILE HERO (< md): Full-bleed Dark Photo Overlay Banner starting right where Nav ends with zero margins */}
        <div className="block md:hidden relative w-[calc(100%+2rem)] sm:w-[calc(100%+3rem)] -mx-4 sm:-mx-6 overflow-hidden text-center text-white py-20 px-6 mb-8">
          <Image
            src="/stock images/hero stock .png"
            alt="Work-ready talent"
            fill
            className="object-cover object-center brightness-[0.4]"
            priority
          />
          <div className="relative z-10 flex flex-col items-center gap-4 max-w-sm mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold leading-snug tracking-wide uppercase">
              Work-Ready <span className="text-red-500">Talent.</span> Ready to Shape the Future.
            </h1>
            <p className="text-sm text-gray-200 leading-relaxed">
              Browse verified learners, graduates, and candidates who have
              completed practical training and workplace projects through Shaper
              programmes.
            </p>

            {/* Equal Height & Equal Width Single-Line Buttons */}
            <div className="flex items-center justify-center gap-3 mt-4 w-full">
              <Link
                href="/talent"
                className="h-12 flex-1 max-w-[160px] inline-flex items-center justify-center bg-red-600 text-white text-sm font-bold rounded-[3px] hover:bg-red-700 transition-colors whitespace-nowrap px-3"
              >
                Browse Talent
              </Link>
              <Link
                href="#contact"
                className="h-12 flex-1 max-w-[160px] inline-flex items-center justify-center border border-white text-white text-sm font-bold rounded-[3px] hover:bg-white/10 transition-colors whitespace-nowrap px-3"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP HERO (>= md): Exact original 2-column layout preserved */}
        <div className="hidden md:grid md:grid-cols-2 gap-12 items-center min-h-[520px] pt-28 pb-16">

          {/* LEFT: Copy */}
          <div className="flex flex-col gap-6">
            <h1 className="text-[43px] font-medium text-gray-900 leading-tight tracking-tight uppercase">
              Work-Ready{" "}
              <span className="text-red-500">Talent.</span> Ready
              <br />
              to Shape the Future.
            </h1>

            <p className="text-[21px] text-gray-500 leading-relaxed max-w-lg">
              Browse verified learners, graduates, and candidates who have
              completed practical training and workplace projects through Shaper
              programmes.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/talent"
                className="bg-[#01317F] text-white text-[18px] font-semibold px-6 py-3 rounded-[3px] hover:bg-blue-900 transition-colors"
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
          <div className="relative h-[460px] w-full overflow-hidden rounded-[3px]">
            <Image
              src="/stock images/hero stock .png"
              alt="Work-ready talent"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

        </div>
      </div>

      {/* Search Bar — hidden on mobile, visible on desktop (perfectly centered on transition line) */}
      <div className="hidden md:block absolute bottom-0 left-0 right-0 z-10 translate-y-1/2">
        <div className="max-w-[1360px] mx-auto px-6 lg:px-6">
          <div className="bg-[#E1E1E1] rounded-[3px] px-4 sm:px-6 py-4 border border-gray-300/60">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-3">

            {/* Role */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[12px] sm:text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                Role
              </label>
              <select 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                className={`text-[15px] border-0 outline-none bg-transparent cursor-pointer font-normal ${
                  role ? "text-gray-900" : "text-gray-600"
                }`}
              >
                <option value="">Select a role</option>
                {programs.map((prog) => (
                  <option key={prog.id} value={prog.name} className="text-gray-800">
                    {prog.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-400" />

            {/* Location */}
            <div className="flex flex-col gap-0.5 flex-1 border-t md:border-t-0 border-gray-300/70 pt-2 md:pt-0">
              <label className="text-[12px] sm:text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                Location
              </label>
              <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}
                className={`text-[15px] border-0 outline-none bg-transparent cursor-pointer font-normal ${
                  location ? "text-gray-900" : "text-gray-600"
                }`}
              >
                <option value="">Select a location</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.city} className="text-gray-800">
                    {loc.city}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-400" />

            {/* Skills */}
            <div className="flex flex-col gap-0.5 flex-1 border-t md:border-t-0 border-gray-300/70 pt-2 md:pt-0">
              <label className="text-[12px] sm:text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                Skills
              </label>
              <select 
                value={skill} 
                onChange={(e) => setSkill(e.target.value)}
                className={`text-[15px] border-0 outline-none bg-transparent cursor-pointer font-normal ${
                  skill ? "text-gray-900" : "text-gray-600"
                }`}
              >
                <option value="">Select skills</option>
                {capabilities.map((cap) => (
                  <option key={cap.id} value={cap.name} className="text-gray-800">
                    {cap.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden md:block w-px h-8 bg-gray-400" />

            {/* Availability */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
                Availability
              </label>
              <select 
                value={availability} 
                onChange={(e) => setAvailability(e.target.value)}
                className={`text-[15px] border-0 outline-none bg-transparent cursor-pointer font-normal ${
                  availability ? "text-gray-900" : "text-gray-600"
                }`}
              >
                <option value="">Select availability</option>
                {statuses.map((stat) => (
                  <option key={stat.id} value={stat.name} className="text-gray-800">
                    {stat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              className="bg-[#01317F] text-white text-[18px] font-bold px-8 py-3 rounded-[3px] hover:bg-blue-900 transition-colors whitespace-nowrap cursor-pointer"
            >
              Search
            </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
