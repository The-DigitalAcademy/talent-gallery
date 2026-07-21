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
  roles: LookupItem[];
}

export default function FilterControls({
  locations,
  statuses,
  capabilities,
  roles
}: FilterControlsProps) {

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-4">
      <FilterItem label="Role" keyName="roles" options={roles.map(({ id, name }) => ({ id, value: name }))} />
      <FilterItem keyName="location" options={locations.map(({ id, city }) => ({ id, value: city }))} />
      <FilterItem label="Skills" keyName="capability" options={capabilities.map(({ id, name }) => ({ id, value: name }))} />
      <FilterItem label="Availablity" keyName="status" options={statuses.map(({ id, name }) => ({ id, value: name }))} />
    </div>
  );
}


function FilterSelect({ keyName, options = [] }: { keyName: string, options?: { id: string | number, value: string | undefined }[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Unified selection handler that clears out pagination pages seamlessly
  const handleSelectChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "all") params.set(key, value)
    else params.delete(key)
    // 💡 THE RESET KILL-SWITCH: Clears old page parameters entirely on filter adjustment
    // This forces your action routing rules to scan the entire database table records fresh!
    params.delete("page");

    router.push(`/talent?${params.toString()}`);
  };
  return (
    <select
      id={keyName}
      onChange={(e) => handleSelectChange(keyName, e.target.value)}
      value={searchParams.get(keyName) || "all"}
      className="bg-white text-sm outline-none focus:border-blue-500 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px_auto] bg-[right_14px_center] bg-no-repeat"
    >
      <option value="all" className="capitalize">Select {keyName}</option>
      {options.map((option) => (
        <option key={option.id} value={option.value}>
          {option.value}
        </option>
      ))}
    </select>
  )
}

function FilterItem({ label, keyName, options = [] }: { label?: string, keyName: string, options?: { id: string | number, value: string | undefined }[] }) {
  return (
    <div className="flex flex-col space-y-1 border-r border-neutral-400 px-5 py-3.5 last:border-r-0">
      <label className="font-bold tracking-tight capitalize" htmlFor={keyName}>{label || keyName}</label>
      <FilterSelect keyName={keyName} options={options} />
    </div>
  )
}