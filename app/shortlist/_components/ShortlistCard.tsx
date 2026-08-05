"use client";

import { MapPinIcon, Trash2Icon } from "lucide-react";
import { Avatar } from "@base-ui/react";
import { Talent } from "@/app/interface-types/talent";

// ─── Status badge colour map (matches existing TalentCard) ──────────────────
const getStatusColour = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case "available for wpe":
      return "bg-orange-500";
    case "available for hire":
      return "bg-amber-400";
    case "in wpe":
      return "bg-purple-500";
    case "employed":
      return "bg-teal-400";
    default:
      return "bg-orange-400";
  }
};

// ─── Avatar fallback initials ────────────────────────────────────────────────
function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

interface ShortlistCardProps {
  talent: Talent;
  onRemove: (id: string) => void;
}

export default function ShortlistCard({ talent, onRemove }: ShortlistCardProps) {
  const statusColour = getStatusColour(talent.talent_status?.name);
  const nameParts = talent.fullname.split(" ");
  const firstName = nameParts[0];
  const lastInitial =
    nameParts.length > 1 ? `${nameParts[nameParts.length - 1][0]}.` : "";

  return (
    <div className="relative bg-[#f8f8f8] rounded-sm overflow-hidden">
      {/* Top status accent line */}
      <div className={`h-[5px] w-full ${statusColour}`} />

      {/* Status badge */}
      <div
        className={`absolute top-0 right-8 ${statusColour} text-white text-[11px] font-bold px-3 py-1.5 rounded-b-md`}
      >
        {talent.talent_status?.name ?? ""}
      </div>

      <div className="flex items-center gap-4 px-4 py-4 pr-12">
        {/* Avatar */}
        <Avatar.Root className="inline-flex size-12 items-center justify-center overflow-hidden rounded-full bg-gray-100 align-middle text-sm leading-none font-normal select-none shrink-0">
          <Avatar.Image
            src={talent.profile_image_url || undefined}
            className="size-full object-cover"
          />
          <Avatar.Fallback className="text-sm font-bold text-gray-600">
            {initials(talent.fullname)}
          </Avatar.Fallback>
        </Avatar.Root>

        {/* Info */}
        <div>
          <h3 className="text-[14px] uppercase tracking-wide leading-snug">
            <span className="font-bold">{firstName}</span>
            {lastInitial && <span className="font-light"> {lastInitial}</span>}
          </h3>
          <p className="text-[12px] text-gray-600">{talent.role?.name}</p>
          {talent.location && (
            <p className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
              <MapPinIcon size={10} />
              {talent.location.city}, {talent.location.country}
            </p>
          )}
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(talent.id)}
        className="absolute bottom-3 right-4 text-red-500 hover:text-red-700 transition-colors p-1 rounded hover:bg-red-50"
        aria-label={`Remove ${talent.fullname} from shortlist`}
      >
        <Trash2Icon size={16} />
      </button>
    </div>
  );
}
