"use client";

import React, { useEffect } from "react";
import {
  Briefcase,
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Landmark,
  Link2,
  MapPin,
  Rocket,
  ShieldCheck,
  User,
  X,
} from "lucide-react";
import {
  EducationItem,
  EndorsementItem,
  ExperienceItem,
  ProjectItem,
  UrlsData,
} from "./CandidateModals";
import { MOCK_CANDIDATE_USER } from "./navigation-data";

interface CandidateProfilePreviewModalProps {
  profileImage: string | null;
  role: string;
  bio: string;
  location: string;
  skills: string[];
  urls: UrlsData;
  experiences: ExperienceItem[];
  projects: ProjectItem[];
  educations: EducationItem[];
  endorsements: EndorsementItem[];
  onClose: () => void;
}

export default function CandidateProfilePreviewModal({
  profileImage,
  role,
  bio,
  location,
  skills,
  urls,
  experiences,
  projects,
  educations,
  endorsements,
  onClose,
}: CandidateProfilePreviewModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const urlLinks: { label: string; href: string }[] = [];
  if (urls.github.trim())
    urlLinks.push({ label: "GitHub", href: urls.github.trim() });
  if (urls.portfolio.trim())
    urlLinks.push({ label: "Portfolio", href: urls.portfolio.trim() });
  if (urls.linkedin.trim())
    urlLinks.push({ label: "LinkedIn", href: urls.linkedin.trim() });
  urls.extraUrls.forEach((u, i) => {
    if (u.trim()) urlLinks.push({ label: `Link ${i + 1}`, href: u.trim() });
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-slate-900/60 backdrop-blur-[2px]">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Candidate Profile Preview"
        className="relative z-10 w-full max-w-[820px] max-h-[92vh] bg-[#F8FAFC] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Top Preview Banner */}
        <div className="bg-[#02183B] text-white px-5 py-3.5 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="bg-[#D91B24] text-white text-[9.5px] font-bold px-2 py-0.5 rounded-xs uppercase tracking-wider shrink-0">
              PREVIEW
            </span>
            <span className="text-xs text-slate-200 truncate">
              Hiring Partner View — Reflects your live edits before submission
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition cursor-pointer shrink-0"
          >
            <X className="size-3.5" />
            <span>Close</span>
          </button>
        </div>

        {/* Scrollable Profile Preview Body */}
        <div className="overflow-y-auto p-5 md:p-7 space-y-5">
          {/* Header Card */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-2xs">
            <div className="size-20 rounded-full overflow-hidden bg-[#02183B] text-white flex items-center justify-center shrink-0 border-2 border-slate-100 shadow-xs">
              {profileImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profileImage}
                  alt={MOCK_CANDIDATE_USER.name}
                  className="size-full object-cover"
                />
              ) : (
                <User className="size-9" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-extrabold text-[#02183B]">
                  {MOCK_CANDIDATE_USER.name}
                </h2>
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full">
                  <CheckCircle2 className="size-3" />
                  <span>Shaper Candidate</span>
                </span>
              </div>

              <div className="text-sm font-semibold text-slate-600 mt-0.5">
                {role || MOCK_CANDIDATE_USER.role}
              </div>

              <div className="mt-2.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3.5 text-slate-400" />
                  <span>{location || "Location not specified"}</span>
                </span>

                {urlLinks.map((link) => (
                  <a
                    key={`${link.label}-${link.href}`}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[#02183B] font-semibold hover:underline"
                  >
                    <Link2 className="size-3" />
                    <span>{link.label}</span>
                    <ExternalLink className="size-2.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-2.5">
              <FileText className="size-4 text-[#02183B]" />
              <h3 className="text-sm font-bold text-[#02183B]">About</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {bio || "No summary provided yet."}
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <h3 className="text-sm font-bold text-[#02183B] mb-3">
              Technical &amp; Core Skills (Prioritized)
            </h3>
            {skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, idx) => (
                  <span
                    key={skill}
                    className="bg-[#F1F5F9] text-[#02183B] text-xs font-semibold px-3 py-1 rounded-md inline-flex items-center gap-1.5"
                  >
                    <span className="text-[10px] text-slate-400">
                      #{idx + 1}
                    </span>
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No skills added yet.</p>
            )}
          </div>

          {/* Professional Experience */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-3.5">
              <Briefcase className="size-4 text-[#02183B]" />
              <h3 className="text-sm font-bold text-[#02183B]">
                Professional Experience
              </h3>
            </div>
            {experiences.length > 0 ? (
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="border-l-2 border-slate-200 pl-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-xs font-bold text-[#02183B]">
                        {exp.company} • {exp.jobTitle}
                      </div>
                      <span className="text-[11px] font-medium text-slate-500">
                        {exp.startYear} – {exp.endYear}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mt-1">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No work experience records added yet.
              </p>
            )}
          </div>

          {/* Projects */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-3.5">
              <Rocket className="size-4 text-[#C8102E]" />
              <h3 className="text-sm font-bold text-[#02183B]">Projects</h3>
            </div>
            {projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-[#F8FAFC] border border-slate-200/70 rounded-lg p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#02183B]">
                        {proj.name}
                      </div>
                      <p className="text-[11.5px] text-slate-600 leading-relaxed mt-1.5">
                        {proj.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between gap-2 text-[10.5px]">
                      <span className="text-slate-500 font-medium truncate">
                        {proj.tools || "Tools not listed"}
                      </span>
                      {proj.url && (
                        <a
                          href={proj.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#02183B] font-bold inline-flex items-center gap-1 hover:underline shrink-0"
                        >
                          <span>View</span>
                          <ExternalLink className="size-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">No projects added yet.</p>
            )}
          </div>

          {/* Education */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-3.5">
              <GraduationCap className="size-4 text-[#02183B]" />
              <h3 className="text-sm font-bold text-[#02183B]">
                Education &amp; Qualifications
              </h3>
            </div>
            {educations.length > 0 ? (
              <div className="space-y-3">
                {educations.map((edu) => (
                  <div
                    key={edu.id}
                    className="bg-[#F8FAFC] rounded-lg p-3.5 flex items-start gap-3"
                  >
                    <span className="size-8 rounded-md bg-slate-200/70 flex items-center justify-center text-[#02183B] shrink-0">
                      <Landmark className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-[#02183B]">
                        {edu.qualification}
                      </div>
                      <div className="text-[11px] text-slate-600 mt-0.5">
                        {edu.institution} • {edu.graduationYear} ({edu.status})
                      </div>
                      {edu.certificateName && (
                        <div className="mt-1.5 inline-flex items-center gap-1.5 text-[10.5px] text-slate-500">
                          <span className="bg-[#FDE8E8] text-[#C8102E] text-[8px] font-extrabold px-1.5 py-0.5 rounded-xs">
                            PDF
                          </span>
                          <span>{edu.certificateName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No education records added yet.
              </p>
            )}
          </div>

          {/* Endorsements */}
          <div className="bg-white rounded-xl border border-slate-200/80 p-5 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="size-4 text-[#C8102E]" />
              <h3 className="text-sm font-bold text-[#02183B]">Endorsements</h3>
            </div>
            {endorsements.length > 0 ? (
              <div className="space-y-3">
                {endorsements.map((item) => (
                  <blockquote
                    key={item.id}
                    className="bg-[#F8FAFC] border-l-2 border-[#02183B] rounded-r-lg p-3.5 text-xs text-slate-600 leading-relaxed"
                  >
                    <p>&ldquo;{item.statement}&rdquo;</p>
                    <footer className="mt-2 font-bold text-[#02183B] text-[11px]">
                      — {item.facilitatorName}, {item.relationship}
                      {item.organisation ? ` at ${item.organisation}` : ""}
                    </footer>
                  </blockquote>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                No facilitator endorsements added yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
