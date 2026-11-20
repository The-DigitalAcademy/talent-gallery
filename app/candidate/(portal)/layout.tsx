import React from "react";
import type { Metadata } from "next";
import CandidatePortalShell from "@/components/candidate/CandidatePortalShell";

export const metadata: Metadata = {
  title: "Candidate Portal | Shaper Talent",
  description: "Manage and curate your Shaper Talent candidate profile.",
};

export default function CandidatePortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <CandidatePortalShell>{children}</CandidatePortalShell>;
}

