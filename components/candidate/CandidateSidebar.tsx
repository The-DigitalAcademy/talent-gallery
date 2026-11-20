"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import {
  AlertCircle,
  CheckCircle2,
  Hourglass,
  LayoutGrid,
  Lock,
  Settings,
  X,
} from "lucide-react";
import {
  CANDIDATE_PROFILE_SECTIONS,
  CandidateSectionNav,
  MOCK_CANDIDATE_USER,
  SectionStatus,
} from "./navigation-data";

interface CandidateSidebarProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

function StatusIcon({ status }: { status: SectionStatus }) {
  switch (status) {
    case "alert":
      return <AlertCircle className="size-3.5 text-[#D91B24] shrink-0" />;
    case "approved":
      return <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />;
    case "locked":
      return <Lock className="size-3.5 text-slate-600 shrink-0" />;
    case "pending":
      return <Hourglass className="size-3.5 text-slate-600 shrink-0" />;
    case "revision":
      return (
        <svg
          viewBox="0 0 16 16"
          fill="none"
          className="size-3.5 text-slate-400 shrink-0"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 5.5h8.5M9.5 3.5l2 2-2 2" />
          <path d="M13 10.5H4.5M6.5 8.5l-2 2 2 2" />
        </svg>
      );
  }
}

export default function CandidateSidebar({
  activeSection,
  onSelectSection,
  mobileOpen = false,
  onCloseMobile,
}: CandidateSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isDashboard =
    pathname === "/candidate" || pathname === "/candidate/";
  const isSettings = pathname?.startsWith("/candidate/settings");

  const handleSectionClick = (section: CandidateSectionNav) => {
    if (!isDashboard) {
      router.push(`/candidate#${section.id}`);
    }
    onSelectSection(section.id);
    onCloseMobile?.();
  };

  const sidebarContent = (
    <aside className="w-[240px] bg-white border-r border-slate-200 flex flex-col shrink-0 h-full select-none overflow-y-auto">
      {/* Top Brand Header */}
      <div className="bg-white px-5 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
        <div>
          <Link href="/candidate" className="flex items-center">
            <Image
              src="/shaper-logo-horizontal.png"
              alt="Shaper Logo"
              width={130}
              height={34}
              className="h-7 w-auto object-contain"
              priority
            />
          </Link>
          <div className="text-[9.5px] tracking-[0.18em] text-slate-500 uppercase mt-1.5 font-semibold">
            CANDIDATE PORTAL
          </div>
        </div>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            className="md:hidden text-slate-500 hover:text-slate-900 p-1"
            aria-label="Close navigation menu"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Profile Readiness Progress Card */}
      <div className="mx-3.5 mt-5 mb-4 p-3.5 rounded-lg bg-[#F8FAFC] border border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-600">
            Profile Readiness
          </span>
          <span className="text-xs font-extrabold text-[#02183B]">
            {MOCK_CANDIDATE_USER.sidebarReadiness}%
          </span>
        </div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden my-2">
          <div
            className="bg-[#C8102E] h-full rounded-full transition-all duration-300"
            style={{ width: `${MOCK_CANDIDATE_USER.sidebarReadiness}%` }}
          />
        </div>
        <div className="text-[11px] text-slate-500">
          {MOCK_CANDIDATE_USER.stepsToGallery}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2.5 pb-6" aria-label="Candidate Portal Navigation">
        {/* Dashboard Parent Item */}
        <Link
          href="/candidate"
          onClick={() => onCloseMobile?.()}
          className={clsx(
            "px-3 py-2.5 rounded-md flex items-center justify-between text-xs font-semibold transition",
            isDashboard
              ? "bg-[#02183B] text-white shadow-xs"
              : "text-[#02183B] hover:bg-slate-100"
          )}
        >
          <span className="flex items-center gap-2.5">
            <LayoutGrid className="size-4 shrink-0" />
            <span>Dashboard</span>
          </span>
          <span className="bg-[#D91B24] text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center">
            {MOCK_CANDIDATE_USER.dashboardAlertCount}
          </span>
        </Link>

        {/* Sub-navigation Tree for Candidate Profile Sections */}
        <div className="relative ml-4 pl-3.5 mt-1.5 space-y-0.5 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
          {CANDIDATE_PROFILE_SECTIONS.map((section) => {
            const isActive = isDashboard && activeSection === section.id;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => handleSectionClick(section)}
                className={clsx(
                  "group relative w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-left text-xs transition cursor-pointer",
                  isActive
                    ? "bg-[#F1F5F9] text-[#02183B] font-semibold"
                    : "text-slate-600 hover:text-[#02183B] hover:bg-slate-50 font-medium"
                )}
              >
                {/* Timeline Dot */}
                <span
                  className={clsx(
                    "absolute -left-[14px] top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all",
                    isActive
                      ? "size-2 bg-[#02183B] ring-2 ring-white"
                      : "size-1.5 bg-slate-300 group-hover:bg-slate-400"
                  )}
                />
                <span className="truncate">{section.label}</span>
                <StatusIcon status={section.status} />
              </button>
            );
          })}
        </div>

        {/* Settings & Account Link */}
        <div className="mt-3">
          <Link
            href="/candidate/settings"
            onClick={() => onCloseMobile?.()}
            className={clsx(
              "px-3 py-2.5 rounded-md flex items-center gap-2.5 text-xs font-semibold transition",
              isSettings
                ? "bg-[#02183B] text-white shadow-xs"
                : "text-[#02183B] hover:bg-slate-100"
            )}
          >
            <Settings
              className={clsx(
                "size-4 shrink-0",
                isSettings ? "text-white" : "text-slate-600"
              )}
            />
            <span>Settings &amp; Account</span>
          </Link>
        </div>
      </nav>
    </aside>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-full shrink-0">{sidebarContent}</div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10 flex h-full">{sidebarContent}</div>
        </div>
      )}
    </>
  );
}

