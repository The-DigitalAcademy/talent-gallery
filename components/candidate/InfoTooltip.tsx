"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  text: string;
}

export default function InfoTooltip({ text }: InfoTooltipProps) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        onBlur={() => setOpen(false)}
        aria-label={text}
        className="text-slate-400 hover:text-[#02183B] transition cursor-pointer focus:outline-none inline-flex items-center"
      >
        <Info className="size-3.5" />
      </button>

      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-40 w-56 rounded-lg bg-[#02183B] text-white text-[10.5px] font-normal leading-relaxed px-3 py-2 shadow-lg pointer-events-none"
        >
          {text}
          <span className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-[#02183B]" />
        </span>
      )}
    </span>
  );
}
