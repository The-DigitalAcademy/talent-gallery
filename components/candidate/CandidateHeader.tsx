"use client";

import React from "react";
import { HelpCircle, Menu, User } from "lucide-react";
import { MOCK_CANDIDATE_USER } from "./navigation-data";

interface CandidateHeaderProps {
  onOpenMobileMenu?: () => void;
}

export default function CandidateHeader({
  onOpenMobileMenu,
}: CandidateHeaderProps) {
  return (
    <header className="h-14 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0">
      {/* Left: Mobile Drawer Trigger + Status Pill */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 -ml-1.5 rounded-md text-slate-600 hover:text-[#02183B] hover:bg-slate-100"
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </button>
        )}

        <div className="bg-[#FCE8E8] text-[#C8102E] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-[#D91B24]" />
          <span>{MOCK_CANDIDATE_USER.statusLabel}</span>
        </div>
      </div>

      {/* Right: Support Link + Candidate Identity */}
      <div className="flex items-center">
        <a
          href="mailto:talent@shaper.co.za?subject=Candidate%20Portal%20Support"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#02183B] transition"
        >
          <HelpCircle className="size-3.5 text-slate-500" />
          <span>Support</span>
        </a>

        <div className="h-5 w-px bg-slate-200 mx-4" />

        <div className="flex items-center gap-2.5">
          <div className="text-right">
            <div className="text-xs font-bold text-[#02183B] leading-tight">
              {MOCK_CANDIDATE_USER.name}
            </div>
            <div className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
              {MOCK_CANDIDATE_USER.role}
            </div>
          </div>

          <div
            className="size-8 rounded-full bg-[#02183B] text-white flex items-center justify-center shrink-0"
            aria-label={MOCK_CANDIDATE_USER.name}
          >
            <User className="size-4" />
          </div>
        </div>
      </div>
    </header>
  );
}

