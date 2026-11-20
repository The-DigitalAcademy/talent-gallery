"use client";

import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import {
  AlertTriangle,
  Briefcase,
  Camera,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Code2,
  FileText,
  GraduationCap,
  GripVertical,
  Headphones,
  Landmark,
  Link2,
  Loader2,
  MapPin,
  Rocket,
  SendHorizontal,
  ShieldCheck,
  SquareUserRound,
  Trash2,
  UserSquare2,
} from "lucide-react";
import {
  FilterCategory,
  MOCK_CANDIDATE_USER,
  SectionStatus,
} from "./navigation-data";
import {
  CandidateModalType,
  EditBioModal,
  EditEducationModal,
  EditEndorsementModal,
  EditExperienceModal,
  EditLocationModal,
  EditProfileImageModal,
  EditProjectModal,
  EditSkillsModal,
  EditUrlsModal,
  EducationItem,
  EndorsementItem,
  ExperienceItem,
  ProjectItem,
  UrlsData,
} from "./CandidateModals";
import InfoTooltip from "./InfoTooltip";
import CandidateProfilePreviewModal from "./CandidateProfilePreviewModal";
import { useCandidatePortal } from "./CandidatePortalShell";

const INITIAL_BIO =
  "Transforms messy survey and trade data into reliable financial health predictions for SMEs. Data practitioner with an engineering core specializing in building exploratory data pipelines, automated credit scoring heuristics, and deploying interpretable ML models.";

const INITIAL_SKILLS = [
  "Google BigQuery",
  "Python",
  "PowerBI",
  "Scikit-Learn",
  "SQL (PostgreSQL)",
  "Tableau",
  "Predictive Modeling",
];

const INITIAL_URLS: UrlsData = {
  github: "https://github.com/",
  portfolio: "",
  linkedin: "",
  extraUrls: [],
};

const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Shaper",
    jobTitle: "Project Management",
    startYear: "2012",
    endYear: "Current",
    description:
      "Experience in end-to-end machine learning, from data preparation and exploratory data analysis to predictive modelling and deployment. I work with supervised and unsupervised learning techniques to generate insights.",
    feedback:
      "Please fix the description for the work experience and include measurable outcomes.",
  },
  {
    id: "exp-2",
    company: "WeBuyCars",
    jobTitle: "Learnership",
    startYear: "2021",
    endYear: "2022",
    description:
      "Supported data pipeline automation, reporting dashboards, and pricing analytics models across vehicle inventory streams.",
  },
];

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "Cook IT - Project",
    variant: "highlight",
    description:
      "Describe the project, your role, and the key outcomes to showcase your work.",
    tools: "Python, React, FastAPI",
    url: "",
    feedback:
      "Cook IT - Project isn't valid — please add your specific role, tools used, and measurable outcomes.",
  },
  {
    id: "proj-2",
    name: "Dream League - Project",
    variant: "default",
    description:
      "Built an interactive fantasy sports analytics tracker with real-time player statistics and leaderboards.",
    tools: "Next.js, PostgreSQL, Tailwind CSS",
    url: "",
  },
];

const INITIAL_EDUCATIONS: EducationItem[] = [
  {
    id: "edu-1",
    qualification: "Bachelor of Science in Mathematical Sciences",
    institution: "University of the Witwatersrand",
    graduationYear: "2023",
    status: "Completed",
    certificateName: "Sasekani Graduation Certificate .pdf",
    certificateMeta: "Updated 3 days ago • 412 KB",
  },
];

const INITIAL_ENDORSEMENTS: EndorsementItem[] = [
  {
    id: "end-1",
    facilitatorName: "Kabelo Molefe",
    organisation: "Shaper Academy",
    relationship: "Facilitator",
    statement:
      "Sakhile actively contributes to team activities by completing assigned responsibilities and voluntarily assisting peers when additional support is needed.",
    feedback:
      "Please request an updated endorsement statement that matches your current profile name.",
  },
];

function reorderList<T>(list: T[], fromIndex: number, toIndex: number): T[] {
  const updated = [...list];
  const [moved] = updated.splice(fromIndex, 1);
  updated.splice(toIndex, 0, moved);
  return updated;
}

export default function CandidateDashboard() {
  const { setMetrics } = useCandidatePortal();

  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [activeModal, setActiveModal] = useState<CandidateModalType>(null);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);

  // Submission & status feedback states (loading / success / error / notice)
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [discardNotice, setDiscardNotice] = useState<string>("");

  // Editable Profile Module states
  const [selectedFileName, setSelectedFileName] =
    useState<string>("No file chosen");
  const [profileImagePreview, setProfileImagePreview] = useState<string | null>(
    null
  );
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [bioText, setBioText] = useState<string>(INITIAL_BIO);
  const [locationValue, setLocationValue] = useState<string>(
    "Johannesburg, South Africa"
  );
  const [skillsList, setSkillsList] = useState<string[]>(INITIAL_SKILLS);
  const [urlsData, setUrlsData] = useState<UrlsData>(INITIAL_URLS);
  const [experiences, setExperiences] =
    useState<ExperienceItem[]>(INITIAL_EXPERIENCES);
  const [editingExperienceId, setEditingExperienceId] =
    useState<string>("exp-1");
  const [projects, setProjects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [editingProjectId, setEditingProjectId] = useState<string>("proj-1");
  const [educations, setEducations] =
    useState<EducationItem[]>(INITIAL_EDUCATIONS);
  const [editingEducationId, setEditingEducationId] =
    useState<string>("edu-1");
  const [endorsements, setEndorsements] =
    useState<EndorsementItem[]>(INITIAL_ENDORSEMENTS);
  const [editingEndorsementId, setEditingEndorsementId] =
    useState<string>("end-1");

  // Drag-and-drop state indices
  const [draggedSkillIdx, setDraggedSkillIdx] = useState<number | null>(null);
  const [draggedExpIdx, setDraggedExpIdx] = useState<number | null>(null);
  const [draggedProjIdx, setDraggedProjIdx] = useState<number | null>(null);
  const [draggedEduIdx, setDraggedEduIdx] = useState<number | null>(null);

  // Accordion states
  const [openExperiences, setOpenExperiences] = useState<
    Record<string, boolean>
  >({
    "exp-1": true,
    "exp-2": false,
  });
  const [openProjects, setOpenProjects] = useState<Record<string, boolean>>({
    "proj-1": true,
    "proj-2": false,
  });
  const [openEducations, setOpenEducations] = useState<Record<string, boolean>>(
    {
      "edu-1": true,
    }
  );

  // Build visible list of all non-empty URLs added in the modal
  const displayedUrls = useMemo(() => {
    const list: { label: string; value: string }[] = [];
    if (urlsData.github.trim()) {
      list.push({ label: "GitHub", value: urlsData.github.trim() });
    }
    if (urlsData.portfolio.trim()) {
      list.push({ label: "Portfolio", value: urlsData.portfolio.trim() });
    }
    if (urlsData.linkedin.trim()) {
      list.push({ label: "LinkedIn", value: urlsData.linkedin.trim() });
    }
    urlsData.extraUrls.forEach((url, index) => {
      if (url.trim()) {
        list.push({
          label: `Additional URL ${index + 1}`,
          value: url.trim(),
        });
      }
    });
    return list;
  }, [urlsData]);

  // Dynamic section statuses & categories derived from live local state
  const sectionStates = useMemo(() => {
    const hasExpFeedback = experiences.some((e) => Boolean(e.feedback));
    const hasProjFeedback = projects.some((p) => Boolean(p.feedback));
    const hasEndFeedback = endorsements.some((e) => Boolean(e.feedback));

    const map: Record<
      string,
      {
        status: SectionStatus;
        category: Exclude<FilterCategory, "all">;
        complete: boolean;
      }
    > = {
      "profile-picture": profileImagePreview
        ? {
            status: submitState === "success" ? "pending" : "approved",
            category:
              submitState === "success" ? "pending_review" : "approved_locked",
            complete: true,
          }
        : { status: "alert", category: "needs_revisions", complete: false },
      role: selectedRole
        ? {
            status: submitState === "success" ? "pending" : "approved",
            category:
              submitState === "success" ? "pending_review" : "approved_locked",
            complete: true,
          }
        : { status: "alert", category: "needs_revisions", complete: false },
      bio:
        bioText.trim().length >= 20
          ? { status: "approved", category: "approved_locked", complete: true }
          : { status: "alert", category: "needs_revisions", complete: false },
      location: locationValue.trim()
        ? { status: "approved", category: "approved_locked", complete: true }
        : { status: "alert", category: "needs_revisions", complete: false },
      skills:
        skillsList.length > 0
          ? { status: "approved", category: "approved_locked", complete: true }
          : { status: "alert", category: "needs_revisions", complete: false },
      urls:
        displayedUrls.length > 0
          ? { status: "pending", category: "pending_review", complete: true }
          : { status: "alert", category: "needs_revisions", complete: false },
      experience:
        experiences.length === 0
          ? { status: "alert", category: "needs_revisions", complete: false }
          : hasExpFeedback && submitState !== "success"
            ? {
                status: "revision",
                category: "needs_revisions",
                complete: true,
              }
            : { status: "pending", category: "pending_review", complete: true },
      projects:
        projects.length === 0
          ? { status: "alert", category: "needs_revisions", complete: false }
          : hasProjFeedback && submitState !== "success"
            ? {
                status: "revision",
                category: "needs_revisions",
                complete: true,
              }
            : { status: "pending", category: "pending_review", complete: true },
      education:
        educations.length > 0
          ? { status: "approved", category: "approved_locked", complete: true }
          : { status: "alert", category: "needs_revisions", complete: false },
      endorsement:
        endorsements.length === 0
          ? { status: "alert", category: "needs_revisions", complete: false }
          : hasEndFeedback && submitState !== "success"
            ? {
                status: "revision",
                category: "needs_revisions",
                complete: true,
              }
            : { status: "pending", category: "pending_review", complete: true },
    };

    return map;
  }, [
    profileImagePreview,
    selectedRole,
    bioText,
    locationValue,
    skillsList.length,
    displayedUrls.length,
    experiences,
    projects,
    educations.length,
    endorsements,
    submitState,
  ]);

  const tabCounts = useMemo(() => {
    const entries = Object.values(sectionStates);
    return {
      all: entries.length,
      needs_revisions: entries.filter((e) => e.category === "needs_revisions")
        .length,
      approved_locked: entries.filter((e) => e.category === "approved_locked")
        .length,
      pending_review: entries.filter((e) => e.category === "pending_review")
        .length,
    };
  }, [sectionStates]);

  const readinessPercent = useMemo(() => {
    const entries = Object.values(sectionStates);
    const score = entries.reduce((acc, item) => {
      if (item.status === "approved") return acc + 1;
      if (item.status === "pending") return acc + 0.9;
      if (item.status === "revision") return acc + 0.6;
      return acc;
    }, 0);
    return Math.round((score / entries.length) * 100);
  }, [sectionStates]);

  const milestonesRemaining = useMemo(() => {
    return Object.values(sectionStates).filter(
      (s) => s.category === "needs_revisions"
    ).length;
  }, [sectionStates]);

  // Keep Sidebar & Header metrics synchronized with Dashboard edits
  useEffect(() => {
    const statusMap: Record<string, SectionStatus> = Object.fromEntries(
      Object.entries(sectionStates).map(([k, v]) => [k, v.status])
    );
    setMetrics({
      readinessPercent,
      stepsRemaining: milestonesRemaining,
      alertCount: milestonesRemaining,
      reviewStatus:
        submitState === "success" ? "PENDING REVIEW" : "UNDER REVIEW",
      candidateRole: selectedRole || MOCK_CANDIDATE_USER.role,
      avatarPreviewUrl: profileImagePreview,
      sectionStatuses: statusMap,
    });
  }, [
    sectionStates,
    readinessPercent,
    milestonesRemaining,
    submitState,
    selectedRole,
    profileImagePreview,
    setMetrics,
  ]);

  const toggleExperience = (id: string) => {
    setOpenExperiences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleProject = (id: string) => {
    setOpenProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleEducation = (id: string) => {
    setOpenEducations((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isSectionVisible = (sectionId: string) => {
    if (activeFilter === "all") return true;
    return sectionStates[sectionId]?.category === activeFilter;
  };

  const visibleSectionCount = Object.keys(sectionStates).filter(
    isSectionVisible
  ).length;

  const handleDiscardChanges = () => {
    setSelectedFileName("No file chosen");
    setProfileImagePreview(null);
    setSelectedRole("");
    setBioText(INITIAL_BIO);
    setLocationValue("Johannesburg, South Africa");
    setSkillsList(INITIAL_SKILLS);
    setUrlsData(INITIAL_URLS);
    setExperiences(INITIAL_EXPERIENCES);
    setProjects(INITIAL_PROJECTS);
    setEducations(INITIAL_EDUCATIONS);
    setEndorsements(INITIAL_ENDORSEMENTS);
    setSubmitState("idle");
    setSubmitMessage("");
    setDiscardNotice("All unsaved changes have been reset to the initial state.");
    window.setTimeout(() => setDiscardNotice(""), 4000);
  };

  const handleSubmitForReview = () => {
    setDiscardNotice("");
    const missing: string[] = [];
    if (!selectedRole) missing.push("Role");
    if (bioText.trim().length < 20) missing.push("Bio");
    if (skillsList.length === 0) missing.push("Skills");
    if (projects.length === 0) missing.push("at least 1 Project");

    if (missing.length > 0) {
      setSubmitState("error");
      setSubmitMessage(
        `Please complete the following before submitting for review: ${missing.join(", ")}.`
      );
      return;
    }

    setSubmitState("submitting");
    setSubmitMessage("");
    window.setTimeout(() => {
      // Clear local reviewer feedback flags once candidate resubmits
      setExperiences((prev) => prev.map((e) => ({ ...e, feedback: undefined })));
      setProjects((prev) =>
        prev.map((p) => ({ ...p, variant: "default", feedback: undefined }))
      );
      setEndorsements((prev) =>
        prev.map((e) => ({ ...e, feedback: undefined }))
      );
      setSubmitState("success");
      setSubmitMessage(
        "Your updated profile has been submitted for review. You will be notified once approved for the live gallery."
      );
    }, 900);
  };

  // Current items being edited/added in modals
  const isAddingExperience = !experiences.some(
    (e) => e.id === editingExperienceId
  );
  const currentExperienceForModal: ExperienceItem =
    experiences.find((e) => e.id === editingExperienceId) ?? {
      id: editingExperienceId,
      company: "",
      jobTitle: "",
      startYear: "2024",
      endYear: "Current",
      description: "",
    };

  const isAddingProject = !projects.some((p) => p.id === editingProjectId);
  const currentProjectForModal: ProjectItem =
    projects.find((p) => p.id === editingProjectId) ?? {
      id: editingProjectId,
      name: "",
      description: "",
      tools: "",
      url: "",
      variant: "default",
    };

  const isAddingEducation = !educations.some(
    (e) => e.id === editingEducationId
  );
  const currentEducationForModal: EducationItem =
    educations.find((e) => e.id === editingEducationId) ?? {
      id: editingEducationId,
      qualification: "",
      institution: "",
      graduationYear: "",
      status: "Completed",
      certificateName: "",
      certificateMeta: "",
    };

  const isAddingEndorsement = !endorsements.some(
    (e) => e.id === editingEndorsementId
  );
  const currentEndorsementForModal: EndorsementItem =
    endorsements.find((e) => e.id === editingEndorsementId) ?? {
      id: editingEndorsementId,
      facilitatorName: "",
      organisation: "",
      relationship: "Facilitator",
      statement: "",
    };

  // SVG Circle Readiness Ring math
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const progressOffset =
    circumference - (Math.min(100, readinessPercent) / 100) * circumference;

  const getCardTopBorder = (sectionId: string) => {
    const status = sectionStates[sectionId]?.status;
    if (status === "approved") return "border-t-emerald-600";
    if (status === "revision") return "border-t-[#C8102E]";
    return "border-t-[#1E3A5F]";
  };

  return (
    <div className="max-w-[960px] mx-auto pb-16">
      {/* Top Hero Welcome Banner */}
      <section className="relative rounded-xl overflow-hidden bg-linear-to-r from-[#011638] via-[#072F6B] to-[#02183B] text-white p-5 sm:p-6 md:p-7 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-slate-200 mb-3.5">
            <span
              className={clsx(
                "size-2 rounded-full",
                submitState === "success" ? "bg-emerald-400" : "bg-[#D91B24]"
              )}
            />
            <span>
              {submitState === "success"
                ? "SUBMITTED FOR REVIEW"
                : milestonesRemaining === 0
                  ? "READY TO SUBMIT"
                  : "ACTION REQUIRED"}
            </span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Welcome back, {MOCK_CANDIDATE_USER.firstName}!
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            Your profile is{" "}
            <span className="font-bold text-white">
              {readinessPercent}% complete.
            </span>{" "}
            {submitState === "success"
              ? "Your latest updates have been submitted and are currently pending facilitator review."
              : milestonesRemaining === 0
                ? "All required sections look great! Preview your profile or submit it for live gallery review."
                : "Address any flagged feedback and complete remaining sections to unlock gallery submission."}
          </p>
        </div>

        {/* Readiness Gauge Card */}
        <div className="bg-[#0A254E]/75 border border-white/10 rounded-xl px-6 py-4 flex flex-col items-center justify-center min-w-[215px] self-stretch md:self-auto">
          <div className="relative size-22 flex items-center justify-center">
            <svg className="size-22 -rotate-90" viewBox="0 0 88 88">
              <circle
                cx="44"
                cy="44"
                r={radius}
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="44"
                cy="44"
                r={radius}
                stroke={readinessPercent >= 90 ? "#10B981" : "#D91B24"}
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-extrabold text-white leading-none">
                {readinessPercent}%
              </span>
              <span className="text-[7.5px] font-semibold tracking-widest uppercase text-slate-300 mt-1">
                READINESS
              </span>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-white mt-2">
            {milestonesRemaining === 0
              ? "All Milestones Complete"
              : `${milestonesRemaining} ${milestonesRemaining === 1 ? "Milestone" : "Milestones"} Remaining`}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {milestonesRemaining === 0
              ? "Ready for review"
              : `Estimated completion: ~${milestonesRemaining * 5} mins`}
          </div>
        </div>
      </section>

      {/* Submission / Discard Status Banners */}
      {submitState === "success" && submitMessage && (
        <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 flex items-start gap-2.5 text-xs text-emerald-800">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Profile Submitted! </span>
            {submitMessage}
          </div>
        </div>
      )}

      {submitState === "error" && submitMessage && (
        <div className="mt-5 bg-[#FDF2F2] border border-[#F8D7DA] rounded-lg px-4 py-3 flex items-start gap-2.5 text-xs text-[#9B1C1C]">
          <AlertTriangle className="size-4 text-[#C8102E] shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="font-bold">Action Needed: </span>
            {submitMessage}
          </div>
        </div>
      )}

      {discardNotice && (
        <div className="mt-5 bg-slate-100 border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-medium text-slate-700">
          {discardNotice}
        </div>
      )}

      {/* Filter Tabs Row */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setActiveFilter("all")}
          className={clsx(
            "px-4 py-2 rounded-md text-xs font-semibold transition cursor-pointer flex flex-col items-center min-w-[105px]",
            activeFilter === "all"
              ? "bg-[#02183B] text-white shadow-xs"
              : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
          )}
        >
          <span>All Sections</span>
          <span
            className={clsx(
              "text-[10px]",
              activeFilter === "all" ? "text-slate-300" : "text-slate-400"
            )}
          >
            ({tabCounts.all})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("needs_revisions")}
          className={clsx(
            "px-4 py-2 rounded-md text-xs font-semibold transition cursor-pointer flex items-center gap-2.5 min-h-[46px]",
            activeFilter === "needs_revisions"
              ? "bg-[#02183B] text-white shadow-xs"
              : "bg-white border border-slate-200 text-[#02183B] hover:bg-slate-50"
          )}
        >
          <span className="size-1.5 rounded-full bg-[#D91B24]" />
          <span className="leading-tight text-center">
            Needs
            <br />
            Revisions
          </span>
          <span
            className={clsx(
              "font-bold text-xs",
              activeFilter === "needs_revisions"
                ? "text-red-300"
                : "text-[#D91B24]"
            )}
          >
            ({tabCounts.needs_revisions})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("approved_locked")}
          className={clsx(
            "px-4 py-2 rounded-md text-xs font-medium transition cursor-pointer flex flex-col items-center min-w-[130px]",
            activeFilter === "approved_locked"
              ? "bg-[#02183B] text-white shadow-xs"
              : "bg-[#F1F5F9] text-slate-600 hover:bg-slate-200/70"
          )}
        >
          <span>Approved &amp; Locked</span>
          <span
            className={clsx(
              "text-[10px]",
              activeFilter === "approved_locked"
                ? "text-slate-300"
                : "text-slate-400"
            )}
          >
            ({tabCounts.approved_locked})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveFilter("pending_review")}
          className={clsx(
            "px-4 py-2 rounded-md text-xs font-medium transition cursor-pointer flex flex-col items-center min-w-[120px]",
            activeFilter === "pending_review"
              ? "bg-[#02183B] text-white shadow-xs"
              : "bg-[#F1F5F9] text-slate-600 hover:bg-slate-200/70"
          )}
        >
          <span>Pending Review</span>
          <span
            className={clsx(
              "text-[10px]",
              activeFilter === "pending_review"
                ? "text-slate-300"
                : "text-slate-400"
            )}
          >
            ({tabCounts.pending_review})
          </span>
        </button>
      </div>

      {/* Main Two-Column Content Area */}
      <div className="mt-7 flex flex-col lg:flex-row items-start gap-6">
        {/* Left Column: Profile Modules Stack */}
        <div className="w-full lg:max-w-[590px] flex-1">
          <div className="mb-5">
            <h2 className="text-base font-bold text-[#02183B]">
              Profile Modules
            </h2>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xs leading-relaxed">
              Update, audit, and curate information shown to companies.
            </p>
          </div>

          {visibleSectionCount === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300 p-10 text-center">
              <div className="text-sm font-bold text-[#02183B]">
                No sections in this category
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Switch back to All Sections to view and edit your full profile.
              </p>
              <button
                type="button"
                onClick={() => setActiveFilter("all")}
                className="mt-4 bg-[#02183B] hover:bg-[#052659] text-white text-xs font-semibold px-4 py-2 rounded-md transition cursor-pointer"
              >
                Show All Sections
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              {/* 1. Profile Image */}
              {isSectionVisible("profile-picture") && (
                <section
                  id="profile-picture"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("profile-picture")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                        <Camera className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">
                        Profile Image
                      </h3>
                      <InfoTooltip text="Use a well-lit, professional headshot on a clean background. JPG or PNG up to 5 MB." />
                    </div>
                    {profileImagePreview && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        <span>Uploaded</span>
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    Upload a profile image to personalize your profile.
                  </p>

                  <div className="mt-3 bg-[#F4F6F9] rounded-md p-1.5 flex items-center gap-3">
                    {profileImagePreview && (
                      <div className="size-9 rounded-full overflow-hidden border border-slate-200 shrink-0 bg-white">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={profileImagePreview}
                          alt="Saved profile"
                          className="size-full object-cover"
                        />
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveModal("profile-image")}
                      className="bg-[#02183B] hover:bg-[#052659] text-white text-[11px] font-semibold px-3.5 py-2 rounded-sm transition cursor-pointer shrink-0"
                    >
                      {profileImagePreview
                        ? "Change profile image"
                        : "Upload profile image"}
                    </button>
                    <span className="text-[11px] text-slate-500 truncate">
                      {selectedFileName}
                    </span>
                  </div>

                  <div className="text-[10px] text-slate-400 mt-2">
                    JPG or PNG - Max. 5 MB
                  </div>
                </section>
              )}

              {/* 2. Role (Inline dropdown — no modal) */}
              {isSectionVisible("role") && (
                <section
                  id="role"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("role")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                        <UserSquare2 className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">Role</h3>
                      <InfoTooltip text="Select the primary job title you want hiring partners to filter and discover you under." />
                    </div>
                    {selectedRole && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-3 relative">
                    <select
                      value={selectedRole}
                      onChange={(e) => {
                        setSelectedRole(e.target.value);
                        if (submitState === "error") setSubmitState("idle");
                      }}
                      aria-label="Select Role"
                      className="w-full appearance-none bg-[#F4F6F9] text-xs text-slate-600 rounded-md px-3.5 py-2.5 pr-9 focus:outline-none focus:ring-1 focus:ring-[#02183B] cursor-pointer"
                    >
                      <option value="">Select Role</option>
                      <option value="Full-Stack Engineer">
                        Full-Stack Engineer
                      </option>
                      <option value="Junior Data Scientist">
                        Junior Data Scientist
                      </option>
                      <option value="Quantitative Risk Analyst">
                        Quantitative Risk Analyst
                      </option>
                      <option value="Project Manager">Project Manager</option>
                      <option value="Data Scientist">Data Scientist</option>
                      <option value="AI Engineer">AI Engineer</option>
                      <option value="Software Developer">
                        Software Developer
                      </option>
                    </select>
                    <ChevronDown className="size-4 text-slate-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
                  </div>
                </section>
              )}

              {/* 3. Bio */}
              {isSectionVisible("bio") && (
                <section
                  id="bio"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("bio")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                        <FileText className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">Bio</h3>
                      <InfoTooltip text="Write a concise 2–3 sentence summary highlighting your specialization, tools, and measurable value." />
                    </div>

                    <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      <span>Completed</span>
                    </span>
                  </div>

                  <div className="mt-3 bg-[#F4F6F9] rounded-md p-3.5 text-xs italic text-slate-600 leading-relaxed">
                    &ldquo;{bioText}&rdquo;
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      {bioText.length} / 500 characters
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveModal("bio")}
                      className="inline-flex items-center gap-0.5 font-bold text-[#02183B] hover:underline cursor-pointer"
                    >
                      <span>Edit Bio</span>
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </section>
              )}

              {/* 4. Location */}
              {isSectionVisible("location") && (
                <section
                  id="location"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("location")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                        <MapPin className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">
                        Location
                      </h3>
                      <InfoTooltip text="Your current city/town helps companies match you with nearby hybrid or on-site roles." />
                    </div>
                    {locationValue.trim() && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModal("location")}
                    className="mt-3 w-full text-left bg-white hover:bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-600 transition cursor-pointer"
                  >
                    {locationValue || "Select Location"}
                  </button>
                </section>
              )}

              {/* 5. Technical & Core Skills (Drag-and-drop reorderable!) */}
              {isSectionVisible("skills") && (
                <section
                  id="skills"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("skills")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                        <Code2 className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">
                        Technical &amp; Core Skills
                      </h3>
                      <InfoTooltip text="Drag skills to rank your strongest technical & soft skills first. Top skills appear on your talent card." />
                    </div>

                    {skillsList.length > 0 && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  {skillsList.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {skillsList.map((skill, idx) => (
                        <span
                          key={skill}
                          draggable
                          onDragStart={() => setDraggedSkillIdx(idx)}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={() => {
                            if (
                              draggedSkillIdx !== null &&
                              draggedSkillIdx !== idx
                            ) {
                              setSkillsList((prev) =>
                                reorderList(prev, draggedSkillIdx, idx)
                              );
                            }
                            setDraggedSkillIdx(null);
                          }}
                          onDragEnd={() => setDraggedSkillIdx(null)}
                          title="Drag to reorder"
                          className={clsx(
                            "bg-[#F4F6F9] hover:bg-slate-200/70 text-[#02183B] text-[10.5px] font-semibold px-2 py-1 rounded-sm inline-flex items-center gap-1 cursor-grab active:cursor-grabbing select-none transition",
                            draggedSkillIdx === idx && "opacity-40"
                          )}
                        >
                          <GripVertical className="size-3 text-slate-400" />
                          <span>{skill}</span>
                        </span>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3 border border-dashed border-slate-200 rounded-md p-4 text-center text-xs text-slate-400">
                      No skills added yet. Click &ldquo;Edit Skills&rdquo; to
                      add your top capabilities.
                    </div>
                  )}

                  <div className="mt-3 bg-[#F4F6F9] rounded-md p-3.5 text-[11.5px] text-slate-600 leading-relaxed">
                    Experience in end-to-end machine learning, from data
                    preparation and exploratory data analysis to predictive
                    modelling and deployment. I work with supervised and
                    unsupervised learning techniques to generate insights.
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">
                      Drag chips to order your skills from most important
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveModal("skills")}
                      className="inline-flex items-center gap-0.5 font-bold text-[#02183B] hover:underline cursor-pointer shrink-0 ml-2"
                    >
                      <span>Edit Skills</span>
                      <ChevronRight className="size-3.5" />
                    </button>
                  </div>
                </section>
              )}

              {/* 6. URLs */}
              {isSectionVisible("urls") && (
                <section
                  id="urls"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("urls")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                        <Link2 className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">URLs</h3>
                      <InfoTooltip text="Add live links to your GitHub, LinkedIn, portfolio, or deployed demos so recruiters can inspect your work." />
                    </div>

                    {displayedUrls.length > 0 && (
                      <span className="inline-flex items-center bg-[#F4F6F9] text-slate-600 text-[10px] font-medium px-2.5 py-1 rounded-full">
                        Pending Review
                      </span>
                    )}
                  </div>

                  <div className="mt-3 space-y-2.5">
                    {displayedUrls.length > 0 ? (
                      displayedUrls.map((entry, idx) => (
                        <div key={`${entry.label}-${idx}`}>
                          {displayedUrls.length > 1 && (
                            <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                              {entry.label}
                            </div>
                          )}
                          <input
                            type="url"
                            readOnly
                            onClick={() => setActiveModal("urls")}
                            value={entry.value}
                            className="w-full bg-white hover:bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-600 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#02183B]"
                          />
                        </div>
                      ))
                    ) : (
                      <button
                        type="button"
                        onClick={() => setActiveModal("urls")}
                        className="w-full text-center bg-slate-50/70 hover:bg-slate-100 border border-dashed border-slate-300 rounded-md px-3.5 py-4 text-xs text-slate-500 cursor-pointer"
                      >
                        No URLs added yet — click to add GitHub, Portfolio, or
                        LinkedIn links
                      </button>
                    )}
                  </div>

                  <div className="mt-3 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveModal("urls")}
                      className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                    >
                      {displayedUrls.length > 0
                        ? "Edit / Add URLs"
                        : "Add URLs"}
                    </button>
                  </div>
                </section>
              )}

              {/* 7. Professional Experience (Accordion + Drag-and-drop + Remove) */}
              {isSectionVisible("experience") && (
                <section
                  id="experience"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("experience")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#FDE8E8] flex items-center justify-center text-[#C8102E]">
                        <Briefcase className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">
                        Professional Experience
                      </h3>
                      <InfoTooltip text="List internships, learnerships, and work roles. Drag rows to reorder and include quantified impact." />
                    </div>
                    {experiences.length > 1 && (
                      <span className="text-[10px] text-slate-400">
                        Drag to reorder
                      </span>
                    )}
                  </div>

                  {experiences.length > 0 ? (
                    <div className="mt-3.5 space-y-2.5">
                      {experiences.map((item, idx) => {
                        const isOpen = !!openExperiences[item.id];
                        return (
                          <div
                            key={item.id}
                            draggable
                            onDragStart={() => setDraggedExpIdx(idx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (
                                draggedExpIdx !== null &&
                                draggedExpIdx !== idx
                              ) {
                                setExperiences((prev) =>
                                  reorderList(prev, draggedExpIdx, idx)
                                );
                              }
                              setDraggedExpIdx(null);
                            }}
                            onDragEnd={() => setDraggedExpIdx(null)}
                            className={clsx(
                              "bg-[#F4F6F9] rounded-md overflow-hidden transition",
                              draggedExpIdx === idx && "opacity-50"
                            )}
                          >
                            <div className="px-3 py-3 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <GripVertical className="size-3.5 text-slate-400 cursor-grab shrink-0" />
                                <button
                                  type="button"
                                  onClick={() => toggleExperience(item.id)}
                                  className="flex-1 flex items-center justify-between text-left cursor-pointer focus:outline-none min-w-0 gap-2"
                                >
                                  <span className="text-xs font-semibold text-[#02183B] truncate">
                                    {item.company} • {item.jobTitle}
                                  </span>
                                  <span className="flex items-center gap-2 shrink-0">
                                    {isOpen && (
                                      <span className="text-[10.5px] text-slate-500">
                                        {item.startYear}-{item.endYear}
                                      </span>
                                    )}
                                    {isOpen ? (
                                      <ChevronUp className="size-4 text-slate-500" />
                                    ) : (
                                      <ChevronDown className="size-4 text-slate-500" />
                                    )}
                                  </span>
                                </button>
                              </div>
                            </div>

                            {isOpen && (
                              <div className="px-4 pb-3.5 pt-0.5 pl-9">
                                <p className="text-[11.5px] text-slate-500 leading-relaxed">
                                  {item.description}
                                </p>
                                <div className="mt-2.5 flex items-center justify-end gap-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setExperiences((prev) =>
                                        prev.filter((e) => e.id !== item.id)
                                      )
                                    }
                                    className="text-[11px] font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="size-3" />
                                    <span>Remove</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingExperienceId(item.id);
                                      setActiveModal("experience");
                                    }}
                                    className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                                  >
                                    Edit Experience
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-3.5 border border-dashed border-slate-300 rounded-md p-5 text-center">
                      <p className="text-xs text-slate-500">
                        No work experience records added yet.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingExperienceId(`exp-${Date.now()}`);
                          setActiveModal("experience");
                        }}
                        className="mt-2.5 bg-[#02183B] text-white text-[11px] font-semibold px-3.5 py-2 rounded-md cursor-pointer"
                      >
                        + Add Your First Experience
                      </button>
                    </div>
                  )}

                  {experiences
                    .filter((item) => item.feedback)
                    .map((item) => (
                      <div
                        key={`feedback-${item.id}`}
                        className="mt-3 bg-[#FDF2F2] border border-[#F8D7DA] rounded-md px-3.5 py-2.5 flex items-center gap-2 text-[11px] font-medium text-[#C8102E]"
                      >
                        <AlertTriangle className="size-3.5 shrink-0" />
                        <span>{item.feedback}</span>
                      </div>
                    ))}

                  <div className="mt-3.5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingExperienceId(`exp-${Date.now()}`);
                        setActiveModal("experience");
                      }}
                      className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                    >
                      + Add Experience
                    </button>
                  </div>
                </section>
              )}

              {/* 8. Projects (Accordion + Drag-and-drop + Remove) */}
              {isSectionVisible("projects") && (
                <section
                  id="projects"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("projects")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#FDE8E8] flex items-center justify-center text-[#C8102E]">
                        <Rocket className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">
                        Projects
                      </h3>
                      <InfoTooltip text="Highlight real-world or capstone projects with your role, stack, and measurable results. Drag to reorder." />
                    </div>
                    {projects.length > 1 && (
                      <span className="text-[10px] text-slate-400">
                        Drag to reorder
                      </span>
                    )}
                  </div>

                  {projects.length > 0 ? (
                    <div className="mt-3.5 space-y-2.5">
                      {projects.map((proj, idx) => {
                        const isOpen = !!openProjects[proj.id];
                        return (
                          <div
                            key={proj.id}
                            draggable
                            onDragStart={() => setDraggedProjIdx(idx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (
                                draggedProjIdx !== null &&
                                draggedProjIdx !== idx
                              ) {
                                setProjects((prev) =>
                                  reorderList(prev, draggedProjIdx, idx)
                                );
                              }
                              setDraggedProjIdx(null);
                            }}
                            onDragEnd={() => setDraggedProjIdx(null)}
                            className={clsx(
                              "rounded-md overflow-hidden transition",
                              proj.variant === "highlight"
                                ? "bg-[#FDF3F2]"
                                : "bg-[#F4F6F9]",
                              draggedProjIdx === idx && "opacity-50"
                            )}
                          >
                            <div className="px-3 py-3 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0 flex-1">
                                <GripVertical className="size-3.5 text-slate-400 cursor-grab shrink-0" />
                                <button
                                  type="button"
                                  onClick={() => toggleProject(proj.id)}
                                  className="flex-1 flex items-center justify-between text-left cursor-pointer focus:outline-none min-w-0 gap-2"
                                >
                                  <span className="text-xs font-bold text-[#3B1816] truncate">
                                    {proj.name}
                                  </span>
                                  {isOpen ? (
                                    <ChevronUp className="size-4 text-slate-600 shrink-0" />
                                  ) : (
                                    <ChevronDown className="size-4 text-slate-600 shrink-0" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {isOpen && (
                              <div className="px-4 pb-3.5 pt-0.5 pl-9">
                                <p className="text-[11.5px] text-slate-600 leading-relaxed">
                                  {proj.description}
                                </p>
                                {proj.tools && (
                                  <div className="mt-2 text-[10.5px] font-medium text-slate-500">
                                    Tools: {proj.tools}
                                  </div>
                                )}
                                <div className="mt-2.5 flex items-center justify-end gap-4">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setProjects((prev) =>
                                        prev.filter((p) => p.id !== proj.id)
                                      )
                                    }
                                    className="text-[11px] font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="size-3" />
                                    <span>Remove</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingProjectId(proj.id);
                                      setActiveModal("project");
                                    }}
                                    className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                                  >
                                    Edit Project
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-3.5 border border-dashed border-slate-300 rounded-md p-5 text-center">
                      <p className="text-xs text-slate-500">
                        No projects added yet. Add at least one project to
                        showcase your work.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingProjectId(`proj-${Date.now()}`);
                          setActiveModal("project");
                        }}
                        className="mt-2.5 bg-[#02183B] text-white text-[11px] font-semibold px-3.5 py-2 rounded-md cursor-pointer"
                      >
                        + Add Your First Project
                      </button>
                    </div>
                  )}

                  {projects
                    .filter((proj) => proj.feedback)
                    .map((proj) => (
                      <div
                        key={`feedback-${proj.id}`}
                        className="mt-3 bg-[#FDF2F2] border border-[#F8D7DA] rounded-md px-3.5 py-2.5 flex items-center gap-2 text-[11px] font-medium text-[#C8102E]"
                      >
                        <AlertTriangle className="size-3.5 shrink-0" />
                        <span>{proj.feedback}</span>
                      </div>
                    ))}

                  <div className="mt-3.5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingProjectId(`proj-${Date.now()}`);
                        setActiveModal("project");
                      }}
                      className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                    >
                      + Add Project
                    </button>
                  </div>
                </section>
              )}

              {/* 9. Education & Qualifications (Multiple Accordions + Drag + Remove) */}
              {isSectionVisible("education") && (
                <section
                  id="education"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("education")
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                        <GraduationCap className="size-3.5" />
                      </span>
                      <h3 className="text-xs font-bold text-[#02183B]">
                        Education &amp; Qualifications
                      </h3>
                      <InfoTooltip text="Add degrees, diplomas, bootcamps, or certifications along with supporting PDF certificates." />
                    </div>

                    {educations.length > 0 && (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="size-3 text-emerald-600" />
                        <span>Completed</span>
                      </span>
                    )}
                  </div>

                  {educations.length > 0 ? (
                    <div className="mt-3.5 space-y-2.5">
                      {educations.map((edu, idx) => {
                        const isOpen = !!openEducations[edu.id];
                        return (
                          <div
                            key={edu.id}
                            draggable
                            onDragStart={() => setDraggedEduIdx(idx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => {
                              if (
                                draggedEduIdx !== null &&
                                draggedEduIdx !== idx
                              ) {
                                setEducations((prev) =>
                                  reorderList(prev, draggedEduIdx, idx)
                                );
                              }
                              setDraggedEduIdx(null);
                            }}
                            onDragEnd={() => setDraggedEduIdx(null)}
                            className={clsx(
                              "bg-[#F4F6F9] rounded-md overflow-hidden transition",
                              draggedEduIdx === idx && "opacity-50"
                            )}
                          >
                            <div className="px-3 py-3 flex items-start justify-between gap-2">
                              <div className="flex items-start gap-2 min-w-0 flex-1">
                                <GripVertical className="size-3.5 text-slate-400 cursor-grab shrink-0 mt-1.5" />
                                <button
                                  type="button"
                                  onClick={() => toggleEducation(edu.id)}
                                  className="flex-1 flex items-start justify-between text-left cursor-pointer focus:outline-none min-w-0 gap-2"
                                >
                                  <div className="flex items-start gap-3 min-w-0">
                                    <span className="size-7 rounded-md bg-slate-200/70 flex items-center justify-center text-[#02183B] shrink-0 mt-0.5">
                                      <Landmark className="size-3.5" />
                                    </span>
                                    <div className="min-w-0">
                                      <div className="text-xs font-bold text-[#02183B]">
                                        {edu.qualification}
                                      </div>
                                      <div className="text-[11px] text-slate-500 mt-0.5">
                                        {edu.graduationYear
                                          ? `${edu.graduationYear} • ${edu.status}`
                                          : edu.status}
                                      </div>
                                    </div>
                                  </div>

                                  {isOpen ? (
                                    <ChevronUp className="size-4 text-slate-500 mt-1 shrink-0" />
                                  ) : (
                                    <ChevronDown className="size-4 text-slate-500 mt-1 shrink-0" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {isOpen && (
                              <div className="px-4 pb-3.5 pl-16 space-y-3">
                                {edu.institution && (
                                  <div className="text-[11px] text-slate-600">
                                    {edu.institution}
                                  </div>
                                )}

                                {edu.certificateName && (
                                  <div className="flex items-center gap-2.5 pt-1">
                                    <span className="bg-[#FDE8E8] text-[#C8102E] text-[8px] font-extrabold px-1.5 py-1 rounded-xs uppercase">
                                      PDF
                                    </span>
                                    <div>
                                      <div className="text-[11px] font-medium text-slate-700">
                                        {edu.certificateName}
                                      </div>
                                      <div className="text-[9.5px] text-slate-400">
                                        {edu.certificateMeta}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-end gap-4 pt-1">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setEducations((prev) =>
                                        prev.filter((e) => e.id !== edu.id)
                                      )
                                    }
                                    className="text-[11px] font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                                  >
                                    <Trash2 className="size-3" />
                                    <span>Remove</span>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setEditingEducationId(edu.id);
                                      setActiveModal("education");
                                    }}
                                    className="inline-flex items-center gap-0.5 text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                                  >
                                    <span>Edit Education</span>
                                    <ChevronRight className="size-3.5" />
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="mt-3.5 border border-dashed border-slate-300 rounded-md p-5 text-center">
                      <p className="text-xs text-slate-500">
                        No education or qualifications added yet.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEducationId(`edu-${Date.now()}`);
                          setActiveModal("education");
                        }}
                        className="mt-2.5 bg-[#02183B] text-white text-[11px] font-semibold px-3.5 py-2 rounded-md cursor-pointer"
                      >
                        + Add Your First Qualification
                      </button>
                    </div>
                  )}

                  <div className="mt-3.5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEducationId(`edu-${Date.now()}`);
                        setActiveModal("education");
                      }}
                      className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                    >
                      + Add Education
                    </button>
                  </div>
                </section>
              )}

              {/* 10. Endorsement (Multiple Endorsements + Add, Edit & Remove) */}
              {isSectionVisible("endorsement") && (
                <section
                  id="endorsement"
                  className={clsx(
                    "bg-white rounded-lg border border-slate-200/80 border-t-[3px] p-5 shadow-2xs scroll-mt-6",
                    getCardTopBorder("endorsement")
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-md bg-[#FDE8E8] flex items-center justify-center text-[#C8102E]">
                      <ShieldCheck className="size-3.5" />
                    </span>
                    <h3 className="text-xs font-bold text-[#02183B]">
                      Endorsement
                    </h3>
                    <InfoTooltip text="Add verified facilitator, mentor, or manager endorsements vouching for your teamwork and delivery." />
                  </div>

                  {endorsements.length > 0 ? (
                    <div className="mt-3 space-y-3">
                      {endorsements.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#F4F6F9] rounded-md p-3.5 text-[11.5px] text-slate-600 leading-relaxed"
                        >
                          <p>{item.statement}</p>
                          <div className="mt-2.5 flex items-center justify-between gap-3 flex-wrap">
                            <p className="font-semibold text-[#1E3A5F]">
                              {item.facilitatorName} • {item.relationship}
                              {item.organisation
                                ? ` • ${item.organisation}`
                                : ""}
                            </p>
                            <div className="flex items-center gap-3.5">
                              <button
                                type="button"
                                onClick={() =>
                                  setEndorsements((prev) =>
                                    prev.filter((e) => e.id !== item.id)
                                  )
                                }
                                className="text-[11px] font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
                              >
                                <Trash2 className="size-3" />
                                <span>Remove</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setEditingEndorsementId(item.id);
                                  setActiveModal("endorsement");
                                }}
                                className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                              >
                                Edit endorsement
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-3.5 border border-dashed border-slate-300 rounded-md p-5 text-center">
                      <p className="text-xs text-slate-500">
                        No facilitator endorsements added yet.
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEndorsementId(`end-${Date.now()}`);
                          setActiveModal("endorsement");
                        }}
                        className="mt-2.5 bg-[#02183B] text-white text-[11px] font-semibold px-3.5 py-2 rounded-md cursor-pointer"
                      >
                        + Add Your First Endorsement
                      </button>
                    </div>
                  )}

                  {endorsements
                    .filter((item) => item.feedback)
                    .map((item) => (
                      <div
                        key={`feedback-${item.id}`}
                        className="mt-3 bg-[#FDF2F2] border border-[#F8D7DA] rounded-md px-3.5 py-2.5 flex items-center gap-2 text-[11px] font-medium text-[#C8102E]"
                      >
                        <AlertTriangle className="size-3.5 shrink-0" />
                        <span>{item.feedback}</span>
                      </div>
                    ))}

                  <div className="mt-3.5 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingEndorsementId(`end-${Date.now()}`);
                        setActiveModal("endorsement");
                      }}
                      className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                    >
                      + Add Endorsement
                    </button>
                  </div>
                </section>
              )}
            </div>
          )}

          {/* Bottom Submit / Discard Action Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              disabled={submitState === "submitting"}
              onClick={handleDiscardChanges}
              className="bg-[#F1F5F9] hover:bg-slate-200 disabled:opacity-50 text-slate-700 text-xs font-semibold px-5 py-3 rounded-md transition cursor-pointer"
            >
              Discard Changes
            </button>

            <button
              type="button"
              disabled={submitState === "submitting"}
              onClick={handleSubmitForReview}
              className="bg-[#B90E1A] hover:bg-[#9E0B15] disabled:opacity-70 text-white text-xs font-semibold px-6 py-3 rounded-md inline-flex items-center gap-2 shadow-sm transition cursor-pointer"
            >
              {submitState === "submitting" ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Submitting for Review...</span>
                </>
              ) : (
                <>
                  <SendHorizontal className="size-3.5" />
                  <span>Resubmit Updated Profile for Review</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Assistance Card + Bottom See Profile View Button */}
        <div className="w-full lg:w-[250px] shrink-0 flex flex-col justify-between self-stretch">
          <div className="bg-white rounded-xl border border-slate-100 p-4 shadow-2xs flex items-start gap-3">
            <span className="size-8 rounded-full bg-[#F1F5F9] text-[#02183B] flex items-center justify-center shrink-0">
              <Headphones className="size-4" />
            </span>
            <div>
              <div className="text-xs font-bold text-[#02183B] leading-snug">
                Need assistance with your Profile?
              </div>
              <a
                href="mailto:talent@shaper.co.za?subject=Profile%20Assistance"
                className="text-[11px] text-slate-500 hover:text-[#02183B] mt-1 inline-block"
              >
                Email Shaper
              </a>
            </div>
          </div>

          <div className="mt-8 lg:mt-auto flex justify-end pt-6">
            <button
              type="button"
              onClick={() => setShowPreviewModal(true)}
              className="bg-[#B90E1A] hover:bg-[#9E0B15] text-white text-xs font-semibold px-4 py-2.5 rounded-md shadow-md inline-flex items-center gap-2 transition cursor-pointer"
            >
              <SquareUserRound className="size-4" />
              <span>See Profile View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Form Popup Modals */}
      {activeModal === "profile-image" && (
        <EditProfileImageModal
          currentFileName={selectedFileName}
          currentPreviewUrl={profileImagePreview}
          onSave={(fileName, previewUrl) => {
            setSelectedFileName(fileName);
            setProfileImagePreview(previewUrl);
          }}
          onRemove={() => {
            setSelectedFileName("No file chosen");
            setProfileImagePreview(null);
          }}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "bio" && (
        <EditBioModal
          currentBio={bioText}
          onSave={(bio) => setBioText(bio)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "location" && (
        <EditLocationModal
          currentLocation={locationValue}
          onSave={(loc) => setLocationValue(loc)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "skills" && (
        <EditSkillsModal
          currentSkills={skillsList}
          onSave={(skills) => setSkillsList(skills)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "urls" && (
        <EditUrlsModal
          currentUrls={urlsData}
          onSave={(updated) => setUrlsData(updated)}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "experience" && (
        <EditExperienceModal
          experience={currentExperienceForModal}
          isNew={isAddingExperience}
          onSave={(saved) => {
            setExperiences((prev) => {
              const exists = prev.some((e) => e.id === saved.id);
              if (exists) {
                return prev.map((e) => (e.id === saved.id ? saved : e));
              }
              return [...prev, saved];
            });
            setOpenExperiences((prev) => ({ ...prev, [saved.id]: true }));
          }}
          onDelete={(id) =>
            setExperiences((prev) => prev.filter((e) => e.id !== id))
          }
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "project" && (
        <EditProjectModal
          project={currentProjectForModal}
          isNew={isAddingProject}
          onSave={(saved) => {
            setProjects((prev) => {
              const exists = prev.some((p) => p.id === saved.id);
              if (exists) {
                return prev.map((p) => (p.id === saved.id ? saved : p));
              }
              return [...prev, saved];
            });
            setOpenProjects((prev) => ({ ...prev, [saved.id]: true }));
          }}
          onDelete={(id) =>
            setProjects((prev) => prev.filter((p) => p.id !== id))
          }
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "education" && (
        <EditEducationModal
          education={currentEducationForModal}
          isNew={isAddingEducation}
          onSave={(saved) => {
            setEducations((prev) => {
              const exists = prev.some((e) => e.id === saved.id);
              if (exists) {
                return prev.map((e) => (e.id === saved.id ? saved : e));
              }
              return [...prev, saved];
            });
            setOpenEducations((prev) => ({ ...prev, [saved.id]: true }));
          }}
          onDelete={(id) =>
            setEducations((prev) => prev.filter((e) => e.id !== id))
          }
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "endorsement" && (
        <EditEndorsementModal
          endorsement={currentEndorsementForModal}
          isNew={isAddingEndorsement}
          onSave={(saved) => {
            setEndorsements((prev) => {
              const exists = prev.some((e) => e.id === saved.id);
              if (exists) {
                return prev.map((e) => (e.id === saved.id ? saved : e));
              }
              return [...prev, saved];
            });
          }}
          onDelete={(id) =>
            setEndorsements((prev) => prev.filter((e) => e.id !== id))
          }
          onClose={() => setActiveModal(null)}
        />
      )}

      {/* Candidate Profile Preview Modal */}
      {showPreviewModal && (
        <CandidateProfilePreviewModal
          profileImage={profileImagePreview}
          role={selectedRole}
          bio={bioText}
          location={locationValue}
          skills={skillsList}
          urls={urlsData}
          experiences={experiences}
          projects={projects}
          educations={educations}
          endorsements={endorsements}
          onClose={() => setShowPreviewModal(false)}
        />
      )}
    </div>
  );
}
