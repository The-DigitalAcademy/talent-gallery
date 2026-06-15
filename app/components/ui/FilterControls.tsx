"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface LookUpItem {
  id: string;
  name?: string;
  city?: string; // For the location table
}

interface FilterControlsProps {
  locations: LookUpItem[];
  programs: LookUpItem[];
  cohorts: LookUpItem[];
  statuses: LookUpItem[];
  capabilities: LookUpItem[];
}

export default function FilterControls({ 
  locations, 
  programs, 
  cohorts, 
  statuses, 
  capabilities 
}: FilterControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    router.push(`/talent?${params.toString()}`);
  };

  return (
<div className="flex flex-wrap gap-x-6 gap-y-4 items-center w-full">
      
      {/* Dynamic Locations Dropdown */}
      <select 
        value={searchParams.get("location") || ""} 
        onChange={(e) => handleFilterChange("location", e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 outline-none focus:border-blue-500 capitalize"
      >
        <option value="">All Locations</option>
        {locations.map(loc => (
          <option key={loc.id} value={loc.city}>{loc.city}</option>
        ))}
      </select>

      {/* Dynamic Programs Dropdown */}
      <select 
        value={searchParams.get("programme") || ""} 
        onChange={(e) => handleFilterChange("programme", e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 outline-none focus:border-blue-500"
      >
        <option value="">All Programs</option>
        {programs.map(prog => (
          <option key={prog.id} value={prog.name}>{prog.name}</option>
        ))}
      </select>

      {/* Dynamic Cohorts Dropdown */}
      <select 
        value={searchParams.get("cohort") || ""} 
        onChange={(e) => handleFilterChange("cohort", e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 outline-none focus:border-blue-500"
      >
        <option value="">All Cohorts</option>
        {cohorts.map(coh => (
          <option key={coh.id} value={coh.name}>{coh.name}</option>
        ))}
      </select>

      {/* Dynamic Capabilities Dropdown */}
      <select 
        value={searchParams.get("capability") || ""} 
        onChange={(e) => handleFilterChange("capability", e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 outline-none focus:border-blue-500"
      >
        <option value="">All Capabilities</option>
        {capabilities.map(cap => (
          <option key={cap.id} value={cap.name}>{cap.name}</option>
        ))}
      </select>

      {/* Dynamic Statuses Dropdown */}
      <select 
        value={searchParams.get("status") || ""} 
        onChange={(e) => handleFilterChange("status", e.target.value)}
        className="bg-slate-50 border border-slate-200 text-slate-700 text-sm rounded-xl px-3 py-2 outline-none focus:border-blue-500 capitalize"
      >
        <option value="">All Statuses</option>
        {statuses.map(st => (
          <option key={st.id} value={st.name}>{st.name}</option>
        ))}
      </select>
      
      {/* Clear Active Filters Utility */}
      {searchParams.toString() && (
        <button 
          onClick={() => router.push('/talent')}
          className="text-xs text-red-500 font-semibold hover:underline ml-auto"
        >
          Clear Filters
        </button>
      )}
    </div>
  );
}