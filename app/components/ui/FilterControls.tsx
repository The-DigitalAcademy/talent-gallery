// components/ui/FilterControls.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface LookupItem {
  id: string | number;
  name?: string;
  city?: string;
}

interface FilterControlsProps {
  locations: LookupItem[];
  programs: LookupItem[];
  cohorts: LookupItem[];
  statuses: LookupItem[];
  capabilities: LookupItem[];
}

export default function FilterControls({
  locations,
  programs,
  cohorts,
  statuses,
  capabilities,
}: FilterControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Unified selection handler that clears out pagination pages seamlessly
  const handleSelectChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    // 💡 THE RESET KILL-SWITCH: Clears old page parameters entirely on filter adjustment
    // This forces your action routing rules to scan the entire database table records fresh!
    params.delete("page");

    router.push(`/talent?${params.toString()}`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-4 w-full">
      
      {/* 1. COHORT DROPDOWN */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 tracking-tight">Cohort</label>
        <select
          onChange={(e) => handleSelectChange("cohort", e.target.value)}
          value={searchParams.get("cohort") || "all"}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_center] bg-no-repeat pr-8"
        >
          <option value="all">All Cohorts</option>
          {cohorts.map((cohort) => (
            <option key={cohort.id} value={cohort.name}>
              {cohort.name}
            </option>
          ))}
        </select>
      </div>

      {/* 2. PROGRAMME DROPDOWN */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 tracking-tight">Programme</label>
        <select
          onChange={(e) => handleSelectChange("programme", e.target.value)}
          value={searchParams.get("programme") || "all"}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_center] bg-no-repeat pr-8"
        >
          <option value="all">All Programmes</option>
          {programs.map((prog) => (
            <option key={prog.id} value={prog.name}>
              {prog.name}
            </option>
          ))}
        </select>
      </div>

      {/* 3. CAPABILITY DROPDOWN */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 tracking-tight">Capability</label>
        <select
          onChange={(e) => handleSelectChange("capability", e.target.value)}
          value={searchParams.get("capability") || "all"}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_center] bg-no-repeat pr-8"
        >
          <option value="all">All Capabilities</option>
          {capabilities.map((cap) => (
            <option key={cap.id} value={cap.name}>
              {cap.name}
            </option>
          ))}
        </select>
      </div>

      {/* 4. STATUS DROPDOWN */}
      <div className="flex flex-col space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 tracking-tight">Status</label>
        <select
          onChange={(e) => handleSelectChange("status", e.target.value)}
          value={searchParams.get("status") || "all"}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_center] bg-no-repeat pr-8"
        >
          <option value="all">All Statuses</option>
          {statuses.map((status) => (
            <option key={status.id} value={status.name}>
              {status.name}
            </option>
          ))}
        </select>
      </div>

      {/* 5. LOCATION DROPDOWN */}
      <div className="flex flex-col space-y-1.5 col-span-1 sm:col-span-2 md:col-span-4 lg:col-span-1">
        <label className="text-xs font-semibold text-slate-700 tracking-tight">Location</label>
        <select
          onChange={(e) => handleSelectChange("location", e.target.value)}
          value={searchParams.get("location") || "all"}
          className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-800 outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_center] bg-no-repeat pr-8"
        >
          <option value="all">All Locations</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.city}>
              {loc.city}
            </option>
          ))}
        </select>
      </div>

    </div>
  );
}