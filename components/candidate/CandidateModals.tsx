"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  ChevronDown,
  Code2,
  Search,
  SquareUserRound,
  X,
} from "lucide-react";

export type CandidateModalType =
  | "profile-image"
  | "role"
  | "bio"
  | "location"
  | "skills"
  | "urls"
  | "experience"
  | "project"
  | "education"
  | "endorsement"
  | null;

export interface ExperienceItem {
  id: string;
  company: string;
  jobTitle: string;
  startYear: string;
  endYear: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  tools: string;
  url: string;
  variant: "highlight" | "default";
}

export interface EducationItem {
  id: string;
  qualification: string;
  institution: string;
  graduationYear: string;
  status: string;
  certificateName: string;
  certificateMeta: string;
}

export interface EndorsementItem {
  id: string;
  facilitatorName: string;
  organisation: string;
  relationship: string;
  statement: string;
}

export interface UrlsData {
  github: string;
  portfolio: string;
  linkedin: string;
  extraUrls: string[];
}

const ROLE_OPTIONS = [
  "Full-Stack Engineer",
  "Junior Data Scientist",
  "Quantitative Risk Analyst",
  "Project Manager",
];

function ModalOverlay({
  onClose,
  children,
  maxWidth = "max-w-[540px]",
}: {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[2px] animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          "relative z-10 w-full bg-white rounded-xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col",
          maxWidth
        )}
      >
        <div className="overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}

/* 1. Edit Profile Image Modal */
export function EditProfileImageModal({
  currentFileName,
  currentPreviewUrl,
  onSave,
  onClose,
}: {
  currentFileName: string;
  currentPreviewUrl?: string | null;
  onSave: (fileName: string, previewUrl: string | null) => void;
  onClose: () => void;
}) {
  const [pickedFile, setPickedFile] = useState<string>(
    currentFileName !== "No file chosen" ? currentFileName : ""
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentPreviewUrl ?? null
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPickedFile(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[500px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            Edit profile image
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Upload a clear photo to personalize your candidate profile.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6">
        <div className="text-xs font-bold text-slate-900 mb-2.5">
          Profile image
        </div>

        <div className="bg-[#F4F5F8] border border-dashed border-slate-300 rounded-lg py-6 px-6 flex flex-col items-center justify-center text-center">
          {previewUrl ? (
            <div className="mb-3.5 flex flex-col items-center">
              <div className="size-24 rounded-full overflow-hidden border-2 border-[#02183B]/15 shadow-sm bg-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="Profile preview"
                  className="size-full object-cover"
                />
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-600 mb-3.5">
              Upload a profile image to personalize your profile.
            </p>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileChange}
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-semibold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            {previewUrl ? "Change image" : "Choose image"}
          </button>
          <div className="text-[11px] text-slate-500 mt-2.5">
            {pickedFile || "No file chosen"}
          </div>
          <div className="text-[10.5px] text-slate-400 mt-1">
            JPG or PNG - Max. 5 MB
          </div>
        </div>

        <div className="mt-3.5 bg-[#F4F5F8] rounded-md px-3.5 py-2.5 text-[11px] text-slate-500 leading-relaxed">
          Choose an image to preview it before saving. Your current profile
          remains unchanged until you save.
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (pickedFile) onSave(pickedFile, previewUrl);
            onClose();
          }}
          className={clsx(
            "text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer",
            pickedFile
              ? "bg-[#02183B] hover:bg-[#052659] text-white"
              : "bg-[#E2E5EC] text-slate-500"
          )}
        >
          Save image
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 2. Edit Role Modal */
export function EditRoleModal({
  currentRole,
  onSave,
  onClose,
}: {
  currentRole: string;
  onSave: (role: string) => void;
  onClose: () => void;
}) {
  const [selected, setSelected] = useState<string>(currentRole);

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[500px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">Edit role</h2>
          <p className="text-xs text-slate-500 mt-1">
            Choose the role you want hiring partners to consider you for.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6">
        <label className="block text-xs font-bold text-slate-900 mb-2">
          Primary role
        </label>

        <div className="bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 flex items-center justify-between text-xs text-slate-600">
          <span>{selected || "Select Role"}</span>
          <ChevronDown className="size-4 text-slate-500" />
        </div>

        <div className="mt-2.5 border border-slate-200 rounded-lg divide-y divide-slate-100 overflow-hidden bg-white">
          {ROLE_OPTIONS.map((role) => {
            const isSelected = selected === role;
            return (
              <button
                key={role}
                type="button"
                onClick={() => setSelected(role)}
                className={clsx(
                  "w-full text-left px-4 py-2.5 text-xs transition cursor-pointer",
                  isSelected
                    ? "bg-[#F1F5F9] font-bold text-[#02183B]"
                    : "text-[#1E3A5F] hover:bg-slate-50 font-medium"
                )}
              >
                {role}
              </button>
            );
          })}
        </div>

        <p className="text-[11px] text-slate-500 mt-2.5">
          Choose one role that best represents the opportunities you are looking
          for.
        </p>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (selected) onSave(selected);
            onClose();
          }}
          className={clsx(
            "text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer",
            selected
              ? "bg-[#02183B] hover:bg-[#052659] text-white"
              : "bg-[#E2E5EC] text-slate-500"
          )}
        >
          Save role
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 3. Edit Summary / Bio Modal */
export function EditBioModal({
  currentBio,
  onSave,
  onClose,
}: {
  currentBio: string;
  onSave: (bio: string) => void;
  onClose: () => void;
}) {
  const [bio, setBio] = useState<string>(currentBio);

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[540px]">
      <div className="px-6 pt-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5">
          <span className="size-10 rounded-lg bg-[#F4F5F8] text-[#02183B] flex items-center justify-center shrink-0 mt-0.5">
            <SquareUserRound className="size-5" />
          </span>
          <div>
            <h2 className="text-lg font-extrabold text-[#02183B]">Summary</h2>
            <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
              Update how your profile summary appears to hiring partners across
              the Shaper Talent Marketplace.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-slate-500 hover:text-slate-800 p-1 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold text-[#02183B]">Bio</label>
          <span className="text-[11px] font-semibold text-slate-500">
            {bio.length} / 500 characters
          </span>
        </div>

        <textarea
          rows={5}
          maxLength={500}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-lg p-3.5 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#02183B]"
        />
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex items-center gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#E9EEF5] hover:bg-slate-200 text-[#02183B] text-xs font-bold px-5 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onSave(bio);
            onClose();
          }}
          className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-7 py-2.5 rounded-md transition cursor-pointer"
        >
          Save
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 4. Edit Location Modal */
export function EditLocationModal({
  currentLocation,
  onSave,
  onClose,
}: {
  currentLocation: string;
  onSave: (location: string) => void;
  onClose: () => void;
}) {
  const [city, setCity] = useState<string>(currentLocation);

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[500px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            Edit location
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Update the location shown on your candidate profile.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6">
        <label className="block text-xs font-bold text-slate-900 mb-2">
          City or town
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city or town"
          className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
        />

        <div className="mt-3 bg-[#F4F5F8] rounded-md px-3.5 py-2.5 text-[11px] text-slate-500 leading-relaxed">
          Use your current location. This information is shown to companies
          alongside your candidate profile.
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onSave(city);
            onClose();
          }}
          className={clsx(
            "text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer",
            city.trim()
              ? "bg-[#02183B] hover:bg-[#052659] text-white"
              : "bg-[#E2E5EC] text-slate-500"
          )}
        >
          Save location
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 5. Edit Technical & Core Skills Modal (Desktop & Mobile responsive) */
export function EditSkillsModal({
  currentSkills,
  onSave,
  onClose,
}: {
  currentSkills: string[];
  onSave: (skills: string[]) => void;
  onClose: () => void;
}) {
  const [skills, setSkills] = useState<string[]>(currentSkills);
  const [newSkill, setNewSkill] = useState<string>("");

  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = newSkill.trim();
    if (!trimmed) return;
    if (!skills.includes(trimmed)) {
      const updated = [...skills, trimmed];
      setSkills(updated);
      onSave(updated);
    }
    setNewSkill("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    setSkills(updated);
    onSave(updated);
  };

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[590px]">
      <div className="bg-[#F6F5FA] px-5 md:px-6 py-4 border-b border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="size-9 rounded-lg bg-[#02183B] text-white flex items-center justify-center shrink-0">
            <Code2 className="size-4" />
          </span>
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">
            Edit Technical &amp; Core Skills
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-5 md:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
          <h3 className="text-xs md:text-sm font-bold text-slate-900">
            Primary Verified Stack &amp; Competencies
          </h3>
          <span className="text-[11px] font-bold text-[#0D7A5F]">
            {skills.length} Skills Added
          </span>
        </div>

        <div className="bg-[#F4F4F8] border border-slate-200/70 rounded-lg p-3.5 flex flex-wrap gap-2 min-h-[84px]">
          {skills.map((skill) => (
            <span
              key={skill}
              className="bg-white border border-slate-200/80 rounded-md px-3 py-1.5 text-[11px] font-bold text-slate-800 inline-flex items-center gap-2 shadow-2xs"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="text-slate-400 hover:text-slate-700 cursor-pointer"
                aria-label={`Remove ${skill}`}
              >
                <X className="size-3" />
              </button>
            </span>
          ))}
        </div>

        <form
          onSubmit={handleAddSkill}
          className="mt-4 flex items-center gap-2.5"
        >
          <div className="relative flex-1">
            <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add skill (e.g. PyTorch, Apache Spark, Snowflake)..."
              className="w-full bg-white border border-slate-200 rounded-md pl-8 pr-3 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>
          <button
            type="submit"
            className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md shrink-0 transition cursor-pointer"
          >
            + Add Skill
          </button>
        </form>
      </div>
    </ModalOverlay>
  );
}

/* 6. Edit Profile URLs Modal */
export function EditUrlsModal({
  currentUrls,
  onSave,
  onClose,
}: {
  currentUrls: UrlsData;
  onSave: (urls: UrlsData) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<UrlsData>(currentUrls);

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[500px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            Edit profile URLs
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Keep your portfolio and code links up to date for hiring partners.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            GitHub URL
          </label>
          <input
            type="url"
            value={form.github}
            onChange={(e) => setForm({ ...form, github: e.target.value })}
            placeholder="https://github.com/"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <p className="text-[10.5px] text-slate-400 mt-1">
            Link to your public profile or the repository you want to share.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Portfolio URL (optional)
          </label>
          <input
            type="url"
            value={form.portfolio}
            onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
            placeholder="https://your-portfolio.com"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            LinkedIn URL (optional)
          </label>
          <input
            type="url"
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            placeholder="https://www.linkedin.com/in/your-profile"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
        </div>

        {form.extraUrls.map((extra, idx) => (
          <div key={idx}>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Additional URL {idx + 1}
            </label>
            <input
              type="url"
              value={extra}
              onChange={(e) => {
                const updated = [...form.extraUrls];
                updated[idx] = e.target.value;
                setForm({ ...form, extraUrls: updated });
              }}
              placeholder="https://"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>
        ))}

        <div>
          <button
            type="button"
            onClick={() =>
              setForm({ ...form, extraUrls: [...form.extraUrls, ""] })
            }
            className="bg-[#F4F5F8] hover:bg-slate-200/70 text-[#02183B] text-[11px] font-bold px-3.5 py-2 rounded-md transition cursor-pointer"
          >
            + Add another URL
          </button>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onSave(form);
            onClose();
          }}
          className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Save URLs
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 7. Edit Professional Experience Modal */
export function EditExperienceModal({
  experience,
  onSave,
  onClose,
}: {
  experience: ExperienceItem;
  onSave: (item: ExperienceItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ExperienceItem>(experience);

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[540px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            Edit professional experience
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Show where you worked, what you did, and the impact you made.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              placeholder="Company name"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Job title
            </label>
            <input
              type="text"
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
              placeholder="Role / title"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Start year
            </label>
            <input
              type="text"
              value={form.startYear}
              onChange={(e) => setForm({ ...form, startYear: e.target.value })}
              placeholder="2012"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              End year
            </label>
            <div className="relative">
              <select
                value={form.endYear}
                onChange={(e) => setForm({ ...form, endYear: e.target.value })}
                className="w-full appearance-none bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 pr-9 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
              >
                <option value="Current">Current</option>
                <option value="2026">2026</option>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
              </select>
              <ChevronDown className="size-4 text-slate-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        {form.endYear === "Current" && (
          <div className="text-[11px] font-bold text-[#1E3A5F]">
            Currently working in this role
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Responsibilities &amp; achievements
          </label>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md p-3.5 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <p className="text-[10.5px] text-slate-400 mt-1.5">
            Include your responsibilities, the tools you used, and the outcomes
            of your work.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onSave(form);
            onClose();
          }}
          className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Save experience
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 8. Edit Project Modal */
export function EditProjectModal({
  project,
  onSave,
  onClose,
}: {
  project: ProjectItem;
  onSave: (project: ProjectItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProjectItem>(project);

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[540px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            Edit project
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Showcase your contribution, tools, and measurable project outcomes.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Project name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Project name"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Project description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Describe the project, your role, and the key outcomes to showcase your work."
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md p-3.5 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Tools &amp; technologies
            </label>
            <input
              type="text"
              value={form.tools}
              onChange={(e) => setForm({ ...form, tools: e.target.value })}
              placeholder="Add tools used"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Project URL (optional)
            </label>
            <input
              type="url"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onSave(form);
            onClose();
          }}
          className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Save project
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 9. Edit / Add Education & Qualifications Modal */
export function EditEducationModal({
  education,
  isNew = false,
  onSave,
  onClose,
}: {
  education: EducationItem;
  isNew?: boolean;
  onSave: (education: EducationItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<EducationItem>(education);
  const certInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[540px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            {isNew
              ? "Add education & qualifications"
              : "Edit education & qualifications"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Keep your qualification details and supporting certificate together.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Qualification
          </label>
          <input
            type="text"
            value={form.qualification}
            onChange={(e) =>
              setForm({ ...form, qualification: e.target.value })
            }
            placeholder="e.g. Bachelor of Science in Computer Science"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Institution
          </label>
          <input
            type="text"
            value={form.institution}
            onChange={(e) => setForm({ ...form, institution: e.target.value })}
            placeholder="e.g. University of the Witwatersrand"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Graduation year
            </label>
            <input
              type="text"
              value={form.graduationYear}
              onChange={(e) =>
                setForm({ ...form, graduationYear: e.target.value })
              }
              placeholder="e.g. 2024"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Completion status
            </label>
            <div className="relative">
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full appearance-none bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 pr-9 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
              >
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
              </select>
              <ChevronDown className="size-4 text-slate-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Graduation certificate
          </label>
          <input
            ref={certInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setForm({
                  ...form,
                  certificateName: file.name,
                  certificateMeta: `Updated just now • ${Math.max(
                    1,
                    Math.round(file.size / 1024)
                  )} KB`,
                });
              }
            }}
          />
          <div className="bg-[#F4F5F8] border border-slate-200/70 rounded-md px-4 py-3 flex items-center justify-between gap-3">
            {form.certificateName ? (
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="bg-[#FDE8E8] text-[#C8102E] text-[8px] font-extrabold px-1.5 py-1 rounded-xs uppercase shrink-0">
                  PDF
                </span>
                <div className="min-w-0">
                  <div className="text-[11px] font-medium text-slate-700 truncate">
                    {form.certificateName}
                  </div>
                  <div className="text-[9.5px] text-slate-400">
                    {form.certificateMeta}
                  </div>
                </div>
              </div>
            ) : (
              <span className="text-[11px] text-slate-500">
                No certificate uploaded (PDF)
              </span>
            )}

            <button
              type="button"
              onClick={() => certInputRef.current?.click()}
              className="text-[11px] font-bold text-[#02183B] hover:underline cursor-pointer shrink-0"
            >
              {form.certificateName ? "Replace" : "Upload PDF"}
            </button>
          </div>
          <p className="text-[10.5px] text-slate-400 mt-1.5">
            {form.certificateName
              ? "The current certificate is kept unless you replace it."
              : "Upload a PDF copy of your qualification or certificate (optional)."}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (!form.qualification.trim()) return;
            onSave(form);
            onClose();
          }}
          className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Save education
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 10. Edit / Add Endorsement Modal */
export function EditEndorsementModal({
  endorsement,
  isNew = false,
  onSave,
  onClose,
}: {
  endorsement: EndorsementItem;
  isNew?: boolean;
  onSave: (endorsement: EndorsementItem) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<EndorsementItem>(endorsement);

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[540px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            {isNew ? "Add endorsement" : "Edit endorsement"}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Manage the facilitator statement displayed on your profile.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="size-7 rounded-md bg-slate-200/70 hover:bg-slate-300/70 flex items-center justify-center text-slate-600 cursor-pointer shrink-0"
          aria-label="Close modal"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Facilitator name
            </label>
            <input
              type="text"
              value={form.facilitatorName}
              onChange={(e) =>
                setForm({ ...form, facilitatorName: e.target.value })
              }
              placeholder="e.g. Kabelo Molefe"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Organisation
            </label>
            <input
              type="text"
              value={form.organisation}
              onChange={(e) =>
                setForm({ ...form, organisation: e.target.value })
              }
              placeholder="e.g. Shaper Academy"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Relationship
          </label>
          <div className="relative">
            <select
              value={form.relationship}
              onChange={(e) =>
                setForm({ ...form, relationship: e.target.value })
              }
              className="w-full appearance-none bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 pr-9 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            >
              <option value="Facilitator">Facilitator</option>
              <option value="Technical Mentor">Technical Mentor</option>
              <option value="Program Manager">Program Manager</option>
            </select>
            <ChevronDown className="size-4 text-slate-500 pointer-events-none absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Endorsement statement
          </label>
          <textarea
            rows={4}
            value={form.statement}
            onChange={(e) => setForm({ ...form, statement: e.target.value })}
            placeholder="Write or paste the facilitator endorsement statement..."
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md p-3.5 text-xs text-slate-700 placeholder:text-slate-400 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
        </div>

        <div className="bg-[#F4F5F8] rounded-md px-3.5 py-2.5 text-[11px] text-slate-500">
          Confirm any changes to the statement with your facilitator before
          saving.
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex justify-end gap-2.5">
        <button
          type="button"
          onClick={onClose}
          className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            if (!form.statement.trim() && !form.facilitatorName.trim()) return;
            onSave(form);
            onClose();
          }}
          className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Save endorsement
        </button>
      </div>
    </ModalOverlay>
  );
}
