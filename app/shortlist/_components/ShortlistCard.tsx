"use client";

import { MapPinIcon, Trash2Icon } from "lucide-react";
import { Avatar } from "@base-ui/react";
import { Talent } from "@/app/interface-types/talent";

// ─── Status badge colour map ────────────────────────────────────────────────
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
    <div className="relative bg-[#f8f8f8] rounded-md overflow-hidden min-h-[110px] sm:min-h-[120px] flex flex-col justify-center border border-gray-100 transition-shadow hover:shadow-sm">
      {/* Top Accent Line & Status Badge Header */}
      <div className="absolute top-0 left-0 w-full z-10 pointer-events-none">
        <div className={`h-[5px] w-full ${statusColour}`} />
        <div className="flex justify-end px-4 sm:px-8">
          <div
            className={`${statusColour} text-white text-[10px] sm:text-xs font-bold px-3 py-1 rounded-b-md shadow-xs pointer-events-auto`}
          >
            {talent.talent_status?.name ?? ""}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5 px-4 sm:px-6 pt-7 sm:pt-6 pb-4 sm:pb-5 pr-12 sm:pr-16">
        {/* Avatar */}
        <Avatar.Root className="inline-flex size-12 sm:size-14 md:size-16 items-center justify-center overflow-hidden rounded-full bg-gray-200 align-middle text-sm sm:text-base leading-none font-semibold select-none shrink-0 border border-white shadow-xs">
          <Avatar.Image
            src={talent.profile_image_url || undefined}
            className="size-full object-cover"
          />
          <Avatar.Fallback className="text-sm sm:text-base font-bold text-gray-700">
            {initials(talent.fullname)}
          </Avatar.Fallback>
        </Avatar.Root>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg md:text-xl uppercase tracking-wide leading-snug truncate">
            <span className="font-bold text-gray-900">{firstName}</span>
            {lastInitial && (
              <span className="font-medium text-gray-700"> {lastInitial}</span>
            )}
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 font-medium truncate mt-0.5 sm:mt-1">
            {talent.role?.name}
          </p>
          {talent.location && (
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 flex items-center gap-1 mt-1 sm:mt-1.5 truncate">
              <MapPinIcon size={12} className="shrink-0 text-gray-400" />
              <span>
                {talent.location.city}, {talent.location.country}
              </span>
            </p>
          )}
        </div>
      </div>

      {/* Remove button */}
      <button
        onClick={() => onRemove(talent.id)}
        className="absolute bottom-3 sm:bottom-4 right-3 sm:right-5 text-red-500 hover:text-red-700 transition-colors p-1.5 sm:p-2 rounded-md hover:bg-red-50 z-20"
        aria-label={`Remove ${talent.fullname} from shortlist`}
      >
        <Trash2Icon className="size-4 sm:size-5" />
      </button>
    </div>
  );
}
