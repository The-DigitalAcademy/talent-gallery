"use client";

import React from "react";
import clsx from "clsx";
import { HelpCircle, Menu, User } from "lucide-react";
import { MOCK_CANDIDATE_USER } from "./navigation-data";

interface CandidateHeaderProps {
  onOpenMobileMenu?: () => void;
  reviewStatus?: "UNDER REVIEW" | "PENDING REVIEW" | "DRAFT";
  candidateRole?: string;
  avatarPreviewUrl?: string | null;
}

export default function CandidateHeader({
  onOpenMobileMenu,
  reviewStatus = "UNDER REVIEW",
  candidateRole = MOCK_CANDIDATE_USER.role,
  avatarPreviewUrl = null,
}: CandidateHeaderProps) {
  const isPending = reviewStatus === "PENDING REVIEW";

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0">
      {/* Left: Mobile Drawer Trigger + Status Pill */}
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden p-1.5 -ml-1.5 rounded-md text-slate-600 hover:text-[#02183B] hover:bg-slate-100 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu className="size-5" />
          </button>
        )}

        <div
          className={clsx(
            "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase inline-flex items-center gap-1.5",
            isPending
              ? "bg-amber-50 text-amber-700"
              : "bg-[#FCE8E8] text-[#C8102E]"
          )}
        >
          <span
            className={clsx(
              "size-1.5 rounded-full",
              isPending ? "bg-amber-500" : "bg-[#D91B24]"
            )}
          />
          <span>{reviewStatus}</span>
        </div>
      </div>

      {/* Right: Support Link + Candidate Identity */}
      <div className="flex items-center">
        <a
          href="mailto:talent@shaper.co.za?subject=Candidate%20Portal%20Support"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-[#02183B] transition"
        >
          <HelpCircle className="size-3.5 text-slate-500" />
          <span className="hidden sm:inline">Support</span>
        </a>

        <div className="h-5 w-px bg-slate-200 mx-3 sm:mx-4" />

        <div className="flex items-center gap-2.5">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold text-[#02183B] leading-tight">
              {MOCK_CANDIDATE_USER.name}
            </div>
            <div className="text-[10.5px] text-slate-500 leading-tight mt-0.5">
              {candidateRole || MOCK_CANDIDATE_USER.role}
            </div>
          </div>

          <div
            className="size-8 rounded-full bg-[#02183B] text-white flex items-center justify-center shrink-0 overflow-hidden border border-slate-200"
            aria-label={MOCK_CANDIDATE_USER.name}
          >
            {avatarPreviewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarPreviewUrl}
                alt={MOCK_CANDIDATE_USER.name}
                className="size-full object-cover"
              />
            ) : (
              <User className="size-4" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
