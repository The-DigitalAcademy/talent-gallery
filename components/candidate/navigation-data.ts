export type SectionStatus = "alert" | "locked" | "pending" | "revision";

export type FilterCategory =
  | "all"
  | "needs_revisions"
  | "approved_locked"
  | "pending_review";

export interface CandidateSectionNav {
  id: string;
  label: string;
  status: SectionStatus;
  category: Exclude<FilterCategory, "all">;
}

export const CANDIDATE_PROFILE_SECTIONS: CandidateSectionNav[] = [
  {
    id: "profile-picture",
    label: "Profile Picture",
    status: "alert",
    category: "needs_revisions",
  },
  {
    id: "role",
    label: "Role",
    status: "alert",
    category: "needs_revisions",
  },
  {
    id: "bio",
    label: "Bio",
    status: "alert",
    category: "approved_locked",
  },
  {
    id: "location",
    label: "Location",
    status: "locked",
    category: "approved_locked",
  },
  {
    id: "skills",
    label: "Skills",
    status: "locked",
    category: "approved_locked",
  },
  {
    id: "urls",
    label: "URL",
    status: "pending",
    category: "pending_review",
  },
  {
    id: "experience",
    label: "Experience",
    status: "revision",
    category: "needs_revisions",
  },
  {
    id: "projects",
    label: "Projects",
    status: "revision",
    category: "needs_revisions",
  },
  {
    id: "education",
    label: "Education",
    status: "revision",
    category: "approved_locked",
  },
  {
    id: "endorsement",
    label: "Endorsement",
    status: "revision",
    category: "needs_revisions",
  },
];

export const MOCK_CANDIDATE_USER = {
  name: "Sasekani M.",
  firstName: "Sasekani",
  role: "Full-Stack Engineer",
  statusLabel: "UNDER REVIEW",
  sidebarReadiness: 78,
  bannerReadiness: 75,
  stepsToGallery: "2 steps to live gallery",
  milestonesRemaining: "2 Milestones Remaining",
  estimatedCompletion: "Estimated completion: ~15 mins",
  dashboardAlertCount: 2,
};

