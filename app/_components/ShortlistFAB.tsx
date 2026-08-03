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
      style={{
        position: "fixed",
        right: "48px",
        bottom: "48px",
        zIndex: 9999,
      }}
      className="
        flex items-center justify-center
        w-14 h-14
        bg-[#ff0000] text-white
        rounded-[10px]
        shadow-md
        transition-all duration-200
        hover:scale-105 active:scale-95
        relative
      "
    >
      <ClipboardListIcon className="w-8 h-8 text-white" strokeWidth={1.8} />
      {hasHydrated && count > 0 && (
        <span className="
          absolute -top-2.5 -right-2.5
          bg-black text-white text-xs font-bold
          w-6 h-6
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
