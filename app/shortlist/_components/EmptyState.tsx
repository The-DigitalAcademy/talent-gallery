"use client";

import Link from "next/link";
import { ClipboardListIcon } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-6">
      <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center">
        <ClipboardListIcon size={32} className="text-red-400" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-black mb-2">
          Your shortlist is empty
        </h2>
        <p className="text-black text-sm max-w-xs">
          Browse our talent directory and shortlist candidates you&apos;d like to
          connect with.
        </p>
      </div>
      <Link
        href="/talent"
        className="inline-flex items-center gap-2 bg-red-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-red-700 transition-colors text-sm"
      >
        Browse Talent
      </Link>
    </div>
  );
}
