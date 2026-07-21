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
    <section id="home" className="bg-[#F1F1F1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12 items-center min-h-[520px] pt-28 pb-16">

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
              src="/stock images/hero stock .png"
              alt="Work-ready talent"
              fill
              className="object-cover object-center"
              priority
            />
          </div>

        </div>
      </div>

      {/* Search Bar — contained, aligned to hero content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 -mb-[38px]">
        <div className="bg-[#E1E1E1] rounded-xl px-6 py-4 shadow-sm border border-gray-300/60">
          <div className="flex items-center gap-3">

            {/* Role */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
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
            <div className="w-px h-8 bg-gray-400" />

            {/* Location */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
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
            <div className="w-px h-8 bg-gray-400" />

            {/* Skills */}
            <div className="flex flex-col gap-0.5 flex-1">
              <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider">
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
            <div className="w-px h-8 bg-gray-400" />

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
              className="bg-[#01317F] text-white text-[18px] font-bold px-8 py-3 rounded hover:bg-blue-900 transition-colors whitespace-nowrap cursor-pointer"
            >
              Search
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
