import React from "react";
import { MOCK_CANDIDATE_USER } from "@/components/candidate/navigation-data";

export default function CandidateSettingsPage() {
  return (
    <div className="max-w-[720px] mx-auto pb-16">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#02183B]">
          Settings &amp; Account
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your Candidate Portal account details and notification
          preferences.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-[#1E3A5F] p-6 shadow-2xs space-y-4">
        <div>
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Candidate Name
          </div>
          <div className="text-sm font-bold text-[#02183B] mt-1">
            {MOCK_CANDIDATE_USER.name}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Current Role
          </div>
          <div className="text-sm font-medium text-slate-700 mt-1">
            {MOCK_CANDIDATE_USER.role}
          </div>
        </div>

        <div className="border-t border-slate-100 pt-4">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Profile Status
          </div>
          <div className="mt-1.5 inline-flex items-center gap-1.5 bg-[#FCE8E8] text-[#C8102E] px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
            <span className="size-1.5 rounded-full bg-[#D91B24]" />
            <span>{MOCK_CANDIDATE_USER.statusLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

