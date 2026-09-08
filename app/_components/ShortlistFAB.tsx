"use client";

import Link from "next/link";
import { ClipboardListIcon } from "lucide-react";
import { useShortlistStore } from "@/app/store/useShortlistStore";
import { useShortlistHydrated } from "@/app/store/useHasHydrated";
import { usePathname } from "next/navigation";

export default function ShortlistFAB() {
  const shortlisted = useShortlistStore((s) => s.shortlisted);
  const hasHydrated = useShortlistHydrated();
  const pathname = usePathname();

  const count = hasHydrated ? Object.keys(shortlisted).length : 0;

  // Hide on the shortlist page itself
  if (pathname === "/shortlist") return null;

  return (
    <Link
      href="/shortlist"
      id="shortlist-fab"
      aria-label={`View shortlist${count > 0 ? ` (${count})` : ""}`}
      className="
        fixed
        bottom-5 right-5 sm:bottom-8 sm:right-8
        z-[9999]
        flex items-center justify-center
        w-12 h-12 sm:w-14 sm:h-14
        bg-[#ff0000] text-white
        rounded-[10px]
        shadow-lg
        transition-all duration-200
        hover:scale-105 active:scale-95
      "
    >
      <ClipboardListIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={1.8} />
      {hasHydrated && count > 0 && (
        <span className="
          absolute -top-2 -right-2
          bg-black text-white text-xs font-bold
          w-5 h-5 sm:w-6 sm:h-6
          rounded-full
          flex items-center justify-center
          shadow-sm
        ">
          {count}
        </span>
      )}
    </Link>
  );
}
