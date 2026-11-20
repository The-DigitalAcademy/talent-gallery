"use client";

import React, { useState } from "react";
import clsx from "clsx";
import {
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Code2,
  GraduationCap,
  Headphones,
  Info,
  Landmark,
  Link2,
  MapPin,
  Rocket,
  SendHorizontal,
  ShieldCheck,
  SquareUserRound,
  UserSquare2,
} from "lucide-react";
import {
  CANDIDATE_PROFILE_SECTIONS,
  FilterCategory,
  MOCK_CANDIDATE_USER,
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

const INITIAL_SKILLS = [
  "Google BigQuery",
  "Python",
  "PowerBI",
  "Scikit-Learn",
  "SQL (PostgreSQL)",
  "Tableau",
  "Predictive Modeling",
];

const INITIAL_EXPERIENCES: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Shaper",
    jobTitle: "Project Management",
    startYear: "2012",
    endYear: "Current",
    description:
      "Experience in end-to-end machine learning, from data preparation and exploratory data analysis to predictive modelling and deployment. I work with supervised and unsupervised learning techniques to generate insights.",
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
  },
];

export default function CandidateDashboard() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");
  const [activeModal, setActiveModal] = useState<CandidateModalType>(null);

  // Editable Profile Module states
  const [selectedFileName, setSelectedFileName] =
    useState<string>("No file chosen");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [bioText, setBioText] = useState<string>(
    "Transforms messy survey and trade data into reliable financial health predictions for SMEs. Data practitioner with an engineering core specializing in building exploratory data pipelines, automated credit scoring heuristics, and deploying interpretable ML models."
  );
  const [locationValue, setLocationValue] = useState<string>("");
  const [skillsList, setSkillsList] = useState<string[]>(INITIAL_SKILLS);
  const [urlsData, setUrlsData] = useState<UrlsData>({
    github: "https://github.com/",
    portfolio: "",
    linkedin: "",
    extraUrls: [],
  });
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

  // Accordion states matching the expanded designs
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
    const found = CANDIDATE_PROFILE_SECTIONS.find((s) => s.id === sectionId);
    return found ? found.category === activeFilter : true;
  };

  // Build visible list of all non-empty URLs added in the modal
  const displayedUrls: { label: string; value: string }[] = [];
  if (urlsData.github.trim()) {
    displayedUrls.push({ label: "GitHub", value: urlsData.github.trim() });
  }
  if (urlsData.portfolio.trim()) {
    displayedUrls.push({
      label: "Portfolio",
      value: urlsData.portfolio.trim(),
    });
  }
  if (urlsData.linkedin.trim()) {
    displayedUrls.push({ label: "LinkedIn", value: urlsData.linkedin.trim() });
  }
  urlsData.extraUrls.forEach((url, index) => {
    if (url.trim()) {
      displayedUrls.push({
        label: `Additional URL ${index + 1}`,
        value: url.trim(),
      });
    }
  });

  // Current items being edited/added in modals
  const currentExperienceForModal: ExperienceItem =
    experiences.find((e) => e.id === editingExperienceId) ?? {
      id: editingExperienceId,
      company: "",
      jobTitle: "",
      startYear: "2024",
      endYear: "Current",
      description: "",
    };

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
    circumference -
    (MOCK_CANDIDATE_USER.bannerReadiness / 100) * circumference;

  return (
    <div className="max-w-[960px] mx-auto pb-16">
      {/* Top Hero Welcome Banner */}
      <section className="relative rounded-xl overflow-hidden bg-linear-to-r from-[#011638] via-[#072F6B] to-[#02183B] text-white p-6 md:p-7 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-white/10 border border-white/15 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-slate-200 mb-3.5">
            <span className="size-2 rounded-full bg-[#D91B24]" />
            <span>ACTION REQUIRED</span>
          </div>

          <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Welcome back, {MOCK_CANDIDATE_USER.firstName}!
          </h1>

          <p className="text-xs text-slate-300 leading-relaxed mt-2">
            Your profile is{" "}
            <span className="font-bold text-white">
              {MOCK_CANDIDATE_USER.bannerReadiness}% complete.
            </span>{" "}
            Add 1 more workplace project with quantified outcomes and request
            your facilitator endorsement to unlock gallery submission.
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
                stroke="#D91B24"
                strokeWidth="7"
                strokeDasharray={circumference}
                strokeDashoffset={progressOffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-lg font-extrabold text-white leading-none">
                {MOCK_CANDIDATE_USER.bannerReadiness}%
              </span>
              <span className="text-[7.5px] font-semibold tracking-widest uppercase text-slate-300 mt-1">
                READINESS
              </span>
            </div>
          </div>

          <div className="text-[11px] font-semibold text-white mt-2">
            {MOCK_CANDIDATE_USER.milestonesRemaining}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {MOCK_CANDIDATE_USER.estimatedCompletion}
          </div>
        </div>
      </section>

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
            (6)
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
          <span className="text-[#D91B24] font-bold text-xs">(2)</span>
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
            (3)
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
            (1)
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

          <div className="space-y-5">
            {/* 1. Profile Image */}
            {isSectionVisible("profile-picture") && (
              <section
                id="profile-picture"
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-[#1E3A5F] p-5 shadow-2xs scroll-mt-6"
              >
                <h3 className="text-xs font-bold text-[#02183B]">
                  Profile Image
                </h3>
                <p className="text-[11px] text-slate-500 mt-1">
                  Upload a profile image to personalize your profile.
                </p>

                <div className="mt-3 bg-[#F4F6F9] rounded-md p-1.5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModal("profile-image")}
                    className="bg-[#02183B] hover:bg-[#052659] text-white text-[11px] font-semibold px-3.5 py-2 rounded-sm transition cursor-pointer shrink-0"
                  >
                    Upload profile image
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
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-[#1E3A5F] p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center gap-2">
                  <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                    <UserSquare2 className="size-3.5" />
                  </span>
                  <h3 className="text-xs font-bold text-[#02183B]">Role</h3>
                  <Info className="size-3.5 text-slate-400" />
                </div>

                <div className="mt-3 relative">
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
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
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-emerald-600 p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                      <Briefcase className="size-3.5" />
                    </span>
                    <h3 className="text-xs font-bold text-[#02183B]">Bio</h3>
                    <Info className="size-3.5 text-slate-400" />
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
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-emerald-600 p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-[#02183B]" />
                  <h3 className="text-xs font-bold text-[#02183B]">Location</h3>
                  <Info className="size-3.5 text-slate-400" />
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

            {/* 5. Technical & Core Skills */}
            {isSectionVisible("skills") && (
              <section
                id="skills"
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-emerald-600 p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                      <Code2 className="size-3.5" />
                    </span>
                    <h3 className="text-xs font-bold text-[#02183B]">
                      Technical &amp; Core Skills
                    </h3>
                    <Info className="size-3.5 text-slate-400" />
                  </div>

                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    <span>Completed</span>
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {skillsList.map((skill) => (
                    <span
                      key={skill}
                      className="bg-[#F4F6F9] text-[#02183B] text-[10.5px] font-semibold px-2.5 py-1 rounded-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-3 bg-[#F4F6F9] rounded-md p-3.5 text-[11.5px] text-slate-600 leading-relaxed">
                  Experience in end-to-end machine learning, from data
                  preparation and exploratory data analysis to predictive
                  modelling and deployment. I work with supervised and
                  unsupervised learning techniques to generate insights,
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">
                    Order your skill from most important
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveModal("skills")}
                    className="inline-flex items-center gap-0.5 font-bold text-[#02183B] hover:underline cursor-pointer"
                  >
                    <span>Edit Skills</span>
                    <ChevronRight className="size-3.5" />
                  </button>
                </div>
              </section>
            )}

            {/* 6. URLs (displays every URL added in the modal) */}
            {isSectionVisible("urls") && (
              <section
                id="urls"
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-[#1E3A5F] p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                      <Link2 className="size-3.5" />
                    </span>
                    <h3 className="text-xs font-bold text-[#02183B]">
                      URLs
                    </h3>
                    <Info className="size-3.5 text-slate-400" />
                  </div>

                  <span className="inline-flex items-center bg-[#F4F6F9] text-slate-600 text-[10px] font-medium px-2.5 py-1 rounded-full">
                    Completed
                  </span>
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
                      className="w-full text-left bg-white hover:bg-slate-50 border border-slate-200 rounded-md px-3.5 py-2.5 text-xs text-slate-400 cursor-pointer"
                    >
                      No URLs added yet — click to add
                    </button>
                  )}
                </div>

                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveModal("urls")}
                    className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                  >
                    {displayedUrls.length > 0 ? "Edit / Add URLs" : "Add URLs"}
                  </button>
                </div>
              </section>
            )}

            {/* 7. Professional Experience (Accordion) */}
            {isSectionVisible("experience") && (
              <section
                id="experience"
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-[#C8102E] p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-[#02183B]">
                    Professional Experience
                  </h3>
                  <Info className="size-3.5 text-slate-400" />
                </div>

                <div className="mt-3.5 space-y-2.5">
                  {experiences.map((item) => {
                    const isOpen = !!openExperiences[item.id];
                    return (
                      <div
                        key={item.id}
                        className="bg-[#F4F6F9] rounded-md overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleExperience(item.id)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer"
                        >
                          <span className="text-xs font-semibold text-[#02183B]">
                            {item.company} • {item.jobTitle}
                          </span>
                          <span className="flex items-center gap-2">
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

                        {isOpen && (
                          <div className="px-4 pb-3.5 pt-0.5">
                            <p className="text-[11.5px] text-slate-500 leading-relaxed">
                              {item.description}
                            </p>
                            <div className="mt-2.5 flex justify-end">
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

                <div className="mt-3.5 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingExperienceId(`exp-${Date.now()}`);
                      setActiveModal("experience");
                    }}
                    className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer"
                  >
                    Add Experience
                  </button>
                </div>
              </section>
            )}

            {/* 8. Projects (Accordion) */}
            {isSectionVisible("projects") && (
              <section
                id="projects"
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-[#C8102E] p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center gap-2">
                  <span className="size-6 rounded-md bg-[#FDE8E8] flex items-center justify-center text-[#C8102E]">
                    <Rocket className="size-3.5" />
                  </span>
                  <h3 className="text-xs font-bold text-[#02183B]">
                    Projects
                  </h3>
                  <Info className="size-3.5 text-slate-400" />
                </div>

                <div className="mt-3.5 space-y-2.5">
                  {projects.map((proj) => {
                    const isOpen = !!openProjects[proj.id];
                    return (
                      <div
                        key={proj.id}
                        className={clsx(
                          "rounded-md overflow-hidden",
                          proj.variant === "highlight"
                            ? "bg-[#FDF3F2]"
                            : "bg-[#F4F6F9]"
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => toggleProject(proj.id)}
                          className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer"
                        >
                          <span className="text-xs font-bold text-[#3B1816]">
                            {proj.name}
                          </span>
                          {isOpen ? (
                            <ChevronUp className="size-4 text-slate-600" />
                          ) : (
                            <ChevronDown className="size-4 text-slate-600" />
                          )}
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-3.5 pt-0.5">
                            <p className="text-[11.5px] text-slate-600 leading-relaxed">
                              {proj.description}
                            </p>
                            <div className="mt-2.5 flex justify-end">
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

            {/* 9. Education & Qualifications (Multiple Accordions + Add & Edit) */}
            {isSectionVisible("education") && (
              <section
                id="education"
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-emerald-600 p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="size-6 rounded-md bg-[#F4F6F9] flex items-center justify-center text-[#02183B]">
                      <GraduationCap className="size-3.5" />
                    </span>
                    <h3 className="text-xs font-bold text-[#02183B]">
                      Education &amp; Qualifications
                    </h3>
                    <Info className="size-3.5 text-slate-400" />
                  </div>

                  <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="size-3 text-emerald-600" />
                    <span>Completed</span>
                  </span>
                </div>

                <div className="mt-3.5 space-y-2.5">
                  {educations.map((edu) => {
                    const isOpen = !!openEducations[edu.id];
                    return (
                      <div
                        key={edu.id}
                        className="bg-[#F4F6F9] rounded-md overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => toggleEducation(edu.id)}
                          className="w-full px-4 py-3 flex items-start justify-between text-left cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <span className="size-7 rounded-md bg-slate-200/70 flex items-center justify-center text-[#02183B] shrink-0 mt-0.5">
                              <Landmark className="size-3.5" />
                            </span>
                            <div>
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

                        {isOpen && (
                          <div className="px-4 pb-3.5 pl-14 space-y-3">
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

                            <div className="flex justify-end pt-1">
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

            {/* 10. Endorsement (Multiple Endorsements + Add & Edit) */}
            {isSectionVisible("endorsement") && (
              <section
                id="endorsement"
                className="bg-white rounded-lg border border-slate-200/80 border-t-[3px] border-t-[#C8102E] p-5 shadow-2xs scroll-mt-6"
              >
                <div className="flex items-center gap-2">
                  <span className="size-6 rounded-md bg-[#FDE8E8] flex items-center justify-center text-[#C8102E]">
                    <ShieldCheck className="size-3.5" />
                  </span>
                  <h3 className="text-xs font-bold text-[#02183B]">
                    Endorsement
                  </h3>
                  <Info className="size-3.5 text-slate-400" />
                </div>

                <div className="mt-3 space-y-3">
                  {endorsements.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#F4F6F9] rounded-md p-3.5 text-[11.5px] text-slate-600 leading-relaxed"
                    >
                      <p>{item.statement}</p>
                      <div className="mt-2 flex items-center justify-between gap-3 flex-wrap">
                        <p className="font-semibold text-[#1E3A5F]">
                          {item.facilitatorName} • {item.relationship}
                          {item.organisation ? ` • ${item.organisation}` : ""}
                        </p>
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
                  ))}
                </div>

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

          {/* Bottom Submit / Discard Action Bar */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="bg-[#F1F5F9] hover:bg-slate-200 text-slate-700 text-xs font-semibold px-5 py-3 rounded-md transition cursor-pointer"
            >
              Discard Changes
            </button>

            <button
              type="button"
              className="bg-[#B90E1A] hover:bg-[#9E0B15] text-white text-xs font-semibold px-6 py-3 rounded-md inline-flex items-center gap-2 shadow-sm transition cursor-pointer"
            >
              <SendHorizontal className="size-3.5" />
              <span>Resubmit Updated Profile for Review</span>
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
          onSave={(fileName) => setSelectedFileName(fileName)}
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
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "project" && (
        <EditProjectModal
          project={currentProjectForModal}
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
          onClose={() => setActiveModal(null)}
        />
      )}
    </div>
  );
}
