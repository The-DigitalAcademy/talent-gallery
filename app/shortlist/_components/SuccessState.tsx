"use client";

import Link from "next/link";
import { CheckCircleIcon, ArrowLeftIcon } from "lucide-react";

export default function SuccessState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 px-6 text-center gap-6">
      <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center">
        <CheckCircleIcon size={36} className="text-green-500" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-black mb-2">
          Enquiry Submitted!
        </h2>
        <p className="text-black text-sm max-w-sm">
          A member of the Shaper team will be in touch shortly to discuss the
          next steps.
        </p>
      </div>
      <Link
        href="/talent"
        className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
      >
        <ArrowLeftIcon size={15} />
        Continue Browsing
      </Link>
    </div>
  );
}
