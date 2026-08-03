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
        fixed bottom-6 left-6 z-50
        flex items-center gap-2
        bg-red-600 text-white
        rounded-xl
        shadow-xl
        transition-all duration-200
        hover:bg-red-700 hover:scale-105 active:scale-95
        px-4 py-3
      "
    >
      <ClipboardListIcon size={22} strokeWidth={2} />
      {hasHydrated && count > 0 && (
        <span className="text-[13px] font-bold leading-none">{count}</span>
      )}
    </Link>
  );
}
