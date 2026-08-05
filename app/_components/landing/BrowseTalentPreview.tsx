"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import { getFilteredTalents } from "@/app/talent/actions";
import { Talent } from "@/app/interface-types/talent";
import TalentCard from "@/app/_components/ui/TalentCard";
import TalentCardSkeleton from "@/app/talent/_components/TalentCardSkeleton";

const TABS = [
  { label: "ALL", value: "all" },
  { label: "AVAILBLE FOR WPE", value: "Available for WPE" },
  { label: "AVAILBLE FOR HIRE", value: "Available for Hire" },
  { label: "IN WPE", value: "In WPE" },
  { label: "EMPLOYED", value: "Employed" },
];

export default function BrowseTalentPreview() {
  const [activeTab, setActiveTab] = useState("all");
  const [talents, setTalents] = useState<Talent[]>([]);
  const [isPending, startTransition] = useTransition();
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    // Initial fetch
    const fetchInitial = async () => {
      try {
        const result = await getFilteredTalents({});
        // Slice to show only 6 cards as per design request
        setTalents((result.data || []).slice(0, 6));
      } catch (err) {
        console.error("Error fetching landing talents:", err);
      } finally {
        setInitialLoading(false);
      }
    };
    fetchInitial();
  }, []);

  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    startTransition(async () => {
      try {
        const filterStatus = tabValue === "all" ? undefined : tabValue;
        const result = await getFilteredTalents({ status: filterStatus });
        setTalents((result.data || []).slice(0, 6));
      } catch (err) {
        console.error("Error filtering landing talents:", err);
      }
    });
  };

  const getBrowseMoreUrl = () => {
    if (activeTab === "all") return "/talent";
    return `/talent?status=${encodeURIComponent(activeTab)}`;
  };

  const showSkeleton = initialLoading || isPending;

  return (
    <section id="browse-talent" className="bg-slate-50 py-3 md:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-6">

        {/* Heading — centered on mobile, left-aligned on desktop */}
        <div className="text-center md:text-left mb-10">
          <h2 className="text-[28px] sm:text-[34px] font-medium text-gray-900 leading-tight uppercase tracking-wider">
            BROWSE <span className="text-red-500 font-semibold">TALENT</span>
          </h2>
          <p className="mt-2 text-[16px] sm:text-[18px] text-gray-500 max-w-md mx-auto md:mx-0 leading-relaxed">
            Explore candidates at every stage of their professional journey.
          </p>
        </div>

        {/* Tab Filters — horizontally scrollable on mobile */}
        <div className="flex justify-start border-b border-gray-200 mb-12 overflow-x-auto scrollbar-none">
          <div className="flex gap-6 sm:gap-12 min-w-max">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.value;
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`pb-4 text-[14px] sm:text-[16px] font-bold tracking-wider sm:tracking-widest transition-all relative whitespace-nowrap ${
                    isActive
                      ? "text-gray-900 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gray-900"
                      : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Talent Grid */}
        <div className="min-h-[400px]">
          {showSkeleton ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <TalentCardSkeleton key={i} />
              ))}
            </div>
          ) : talents.length === 0 ? (
            <div className="text-center py-20 bg-white border border-slate-100 rounded-[3px] text-gray-500 font-medium">
              No talent profiles found matching this status.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {talents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Link
            href={getBrowseMoreUrl()}
            className="bg-[#01317F] text-white text-[18px] font-bold px-8 py-3.5 rounded-[3px] hover:bg-blue-900 transition-colors"
          >
            Browse More Talent
          </Link>
        </div>

      </div>
    </section>
  );
}
