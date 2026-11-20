"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import {
  AlertTriangle,
  ChevronDown,
  Code2,
  GripVertical,
  Search,
  SquareUserRound,
  Trash2,
  X,
} from "lucide-react";

export type CandidateModalType =
  | "profile-image"
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
  feedback?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  tools: string;
  url: string;
  variant: "highlight" | "default";
  feedback?: string;
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
  feedback?: string;
}

export interface UrlsData {
  github: string;
  portfolio: string;
  linkedin: string;
  extraUrls: string[];
}

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[11px] font-medium text-[#C8102E] mt-1">{message}</p>
  );
}

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-[2px]">
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
  onRemove,
  onClose,
}: {
  currentFileName: string;
  currentPreviewUrl?: string | null;
  onSave: (fileName: string, previewUrl: string | null) => void;
  onRemove?: () => void;
  onClose: () => void;
}) {
  const [pickedFile, setPickedFile] = useState<string>(
    currentFileName !== "No file chosen" ? currentFileName : ""
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentPreviewUrl ?? null
  );
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Please select a JPG or PNG image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be 5 MB or less.");
      return;
    }

    setError("");
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

        <FieldError message={error} />

        <div className="mt-3.5 bg-[#F4F5F8] rounded-md px-3.5 py-2.5 text-[11px] text-slate-500 leading-relaxed">
          Choose an image to preview it before saving. Your current profile
          remains unchanged until you save.
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-2.5">
        <div>
          {previewUrl && onRemove && (
            <button
              type="button"
              onClick={() => {
                onRemove();
                onClose();
              }}
              className="text-xs font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>Remove photo</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2.5">
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
              if (!pickedFile) {
                setError("Please choose an image before saving.");
                return;
              }
              onSave(pickedFile, previewUrl);
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
      </div>
    </ModalOverlay>
  );
}

/* 2. Edit Summary / Bio Modal */
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
  const [error, setError] = useState<string>("");

  const handleSave = () => {
    const trimmed = bio.trim();
    if (trimmed.length < 20) {
      setError("Please write at least 20 characters so hiring partners understand your strengths.");
      return;
    }
    onSave(trimmed);
    onClose();
  };

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
          <span
            className={clsx(
              "text-[11px] font-semibold",
              bio.trim().length < 20 ? "text-[#C8102E]" : "text-slate-500"
            )}
          >
            {bio.length} / 500 characters
          </span>
        </div>

        <textarea
          rows={5}
          maxLength={500}
          value={bio}
          onChange={(e) => {
            setBio(e.target.value);
            if (error) setError("");
          }}
          placeholder="Summarize your core strengths, projects, and the impact you bring..."
          className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-lg p-3.5 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#02183B]"
        />
        <FieldError message={error} />
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
          onClick={handleSave}
          className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-7 py-2.5 rounded-md transition cursor-pointer"
        >
          Save
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 3. Edit Location Modal */
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
  const [error, setError] = useState<string>("");

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
          onChange={(e) => {
            setCity(e.target.value);
            if (error) setError("");
          }}
          placeholder="e.g. Johannesburg, South Africa"
          className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
        />
        <FieldError message={error} />

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
            if (!city.trim()) {
              setError("Please enter your city or town.");
              return;
            }
            onSave(city.trim());
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

/* 4. Edit Technical & Core Skills Modal (Drag-and-Drop + Add/Remove + Validation) */
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
  const [error, setError] = useState<string>("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = newSkill.trim();
    if (!trimmed) {
      setError("Enter a skill name before clicking Add Skill.");
      return;
    }
    if (skills.some((s) => s.toLowerCase() === trimmed.toLowerCase())) {
      setError(`"${trimmed}" is already in your skill list.`);
      return;
    }
    const updated = [...skills, trimmed];
    setSkills(updated);
    onSave(updated);
    setNewSkill("");
    setError("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter((s) => s !== skillToRemove);
    setSkills(updated);
    onSave(updated);
  };

  const handleDrop = (targetIndex: number) => {
    if (dragIndex === null || dragIndex === targetIndex) return;
    const updated = [...skills];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setSkills(updated);
    onSave(updated);
    setDragIndex(null);
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
          <h3 className="text-xs md:text-sm font-bold text-slate-900">
            Primary Verified Stack &amp; Competencies
          </h3>
          <span className="text-[11px] font-bold text-[#0D7A5F]">
            {skills.length} Skills Added
          </span>
        </div>

        <p className="text-[11px] text-slate-500 mb-3">
          Drag skills to reorder them from most important to least important.
        </p>

        <div className="bg-[#F4F4F8] border border-slate-200/70 rounded-lg p-3.5 flex flex-wrap gap-2 min-h-[84px]">
          {skills.length > 0 ? (
            skills.map((skill, idx) => (
              <span
                key={skill}
                draggable
                onDragStart={() => setDragIndex(idx)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(idx)}
                onDragEnd={() => setDragIndex(null)}
                className={clsx(
                  "bg-white border rounded-md px-2.5 py-1.5 text-[11px] font-bold text-slate-800 inline-flex items-center gap-1.5 shadow-2xs cursor-grab active:cursor-grabbing select-none transition",
                  dragIndex === idx
                    ? "opacity-50 border-[#02183B]"
                    : "border-slate-200/80 hover:border-slate-300"
                )}
              >
                <GripVertical className="size-3 text-slate-400 shrink-0" />
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="text-slate-400 hover:text-[#C8102E] cursor-pointer ml-0.5"
                  aria-label={`Remove ${skill}`}
                >
                  <X className="size-3" />
                </button>
              </span>
            ))
          ) : (
            <div className="w-full text-center text-xs text-slate-400 py-4">
              No skills added yet. Add your core technical and soft skills below.
            </div>
          )}
        </div>

        <form
          onSubmit={handleAddSkill}
          className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5"
        >
          <div className="relative flex-1">
            <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={newSkill}
              onChange={(e) => {
                setNewSkill(e.target.value);
                if (error) setError("");
              }}
              placeholder="Add skill (e.g. PyTorch, Apache Spark, Communication)..."
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
        <FieldError message={error} />
      </div>
    </ModalOverlay>
  );
}

/* 5. Edit Profile URLs Modal (with validation + remove extra URL) */
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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const nextErrors: Record<string, string> = {};
    if (form.github.trim() && !isValidHttpUrl(form.github.trim())) {
      nextErrors.github = "Enter a valid URL starting with https:// or http://";
    }
    if (form.portfolio.trim() && !isValidHttpUrl(form.portfolio.trim())) {
      nextErrors.portfolio = "Enter a valid URL starting with https:// or http://";
    }
    if (form.linkedin.trim() && !isValidHttpUrl(form.linkedin.trim())) {
      nextErrors.linkedin = "Enter a valid URL starting with https:// or http://";
    }
    form.extraUrls.forEach((url, idx) => {
      if (url.trim() && !isValidHttpUrl(url.trim())) {
        nextErrors[`extra-${idx}`] =
          "Enter a valid URL starting with https:// or http://";
      }
    });

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      ...form,
      extraUrls: form.extraUrls.map((u) => u.trim()).filter(Boolean),
    });
    onClose();
  };

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
            onChange={(e) => {
              setForm({ ...form, github: e.target.value });
              setErrors((prev) => ({ ...prev, github: "" }));
            }}
            placeholder="https://github.com/username"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.github} />
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
            onChange={(e) => {
              setForm({ ...form, portfolio: e.target.value });
              setErrors((prev) => ({ ...prev, portfolio: "" }));
            }}
            placeholder="https://your-portfolio.com"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.portfolio} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            LinkedIn URL (optional)
          </label>
          <input
            type="url"
            value={form.linkedin}
            onChange={(e) => {
              setForm({ ...form, linkedin: e.target.value });
              setErrors((prev) => ({ ...prev, linkedin: "" }));
            }}
            placeholder="https://www.linkedin.com/in/your-profile"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.linkedin} />
        </div>

        {form.extraUrls.map((extra, idx) => (
          <div key={idx}>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold text-slate-900">
                Additional URL {idx + 1}
              </label>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    ...form,
                    extraUrls: form.extraUrls.filter((_, i) => i !== idx),
                  })
                }
                className="text-[11px] font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="size-3" />
                <span>Remove</span>
              </button>
            </div>
            <input
              type="url"
              value={extra}
              onChange={(e) => {
                const updated = [...form.extraUrls];
                updated[idx] = e.target.value;
                setForm({ ...form, extraUrls: updated });
                setErrors((prev) => ({ ...prev, [`extra-${idx}`]: "" }));
              }}
              placeholder="https://"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
            <FieldError message={errors[`extra-${idx}`]} />
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
          onClick={handleSave}
          className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
        >
          Save URLs
        </button>
      </div>
    </ModalOverlay>
  );
}

/* 6. Edit / Add Professional Experience Modal */
export function EditExperienceModal({
  experience,
  isNew = false,
  onSave,
  onDelete,
  onClose,
}: {
  experience: ExperienceItem;
  isNew?: boolean;
  onSave: (item: ExperienceItem) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ExperienceItem>(experience);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.company.trim()) nextErrors.company = "Company name is required.";
    if (!form.jobTitle.trim()) nextErrors.jobTitle = "Job title is required.";
    if (!form.startYear.trim())
      nextErrors.startYear = "Start year is required.";
    if (form.description.trim().length < 15) {
      nextErrors.description =
        "Please describe your responsibilities and outcomes (min. 15 characters).";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onSave({
      ...form,
      company: form.company.trim(),
      jobTitle: form.jobTitle.trim(),
      startYear: form.startYear.trim(),
      description: form.description.trim(),
    });
    onClose();
  };

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[540px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            {isNew
              ? "Add professional experience"
              : "Edit professional experience"}
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
        {form.feedback && (
          <div className="bg-[#FDF2F2] border border-[#F8D7DA] rounded-md px-3.5 py-2.5 flex items-start gap-2.5">
            <AlertTriangle className="size-4 text-[#C8102E] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#C8102E]">
                Reviewer Feedback
              </div>
              <p className="text-[11.5px] text-[#9B1C1C] mt-0.5 leading-relaxed">
                {form.feedback}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Company
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => {
                setForm({ ...form, company: e.target.value });
                setErrors((p) => ({ ...p, company: "" }));
              }}
              placeholder="Company name"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
            <FieldError message={errors.company} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Job title
            </label>
            <input
              type="text"
              value={form.jobTitle}
              onChange={(e) => {
                setForm({ ...form, jobTitle: e.target.value });
                setErrors((p) => ({ ...p, jobTitle: "" }));
              }}
              placeholder="Role / title"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
            <FieldError message={errors.jobTitle} />
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
              onChange={(e) => {
                setForm({ ...form, startYear: e.target.value });
                setErrors((p) => ({ ...p, startYear: "" }));
              }}
              placeholder="2023"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
            <FieldError message={errors.startYear} />
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
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
              setErrors((p) => ({ ...p, description: "" }));
            }}
            placeholder="Describe your responsibilities, tools used, and measurable achievements..."
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md p-3.5 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.description} />
          <p className="text-[10.5px] text-slate-400 mt-1.5">
            Include your responsibilities, the tools you used, and the outcomes
            of your work.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-2.5">
        <div>
          {!isNew && onDelete && (
            <button
              type="button"
              onClick={() => {
                onDelete(form.id);
                onClose();
              }}
              className="text-xs font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>Remove</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            Save experience
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* 7. Edit / Add Project Modal */
export function EditProjectModal({
  project,
  isNew = false,
  onSave,
  onDelete,
  onClose,
}: {
  project: ProjectItem;
  isNew?: boolean;
  onSave: (project: ProjectItem) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<ProjectItem>(project);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Project name is required.";
    if (form.description.trim().length < 15) {
      nextErrors.description =
        "Please describe the project, your role, and key outcomes (min. 15 characters).";
    }
    if (form.url.trim() && !isValidHttpUrl(form.url.trim())) {
      nextErrors.url = "Enter a valid URL starting with https:// or http://";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      tools: form.tools.trim(),
      url: form.url.trim(),
    });
    onClose();
  };

  return (
    <ModalOverlay onClose={onClose} maxWidth="max-w-[540px]">
      <div className="bg-[#F6F5FA] px-6 py-5 border-b border-slate-100 flex items-start justify-between">
        <div>
          <h2 className="text-lg font-extrabold text-[#02183B]">
            {isNew ? "Add project" : "Edit project"}
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
        {form.feedback && (
          <div className="bg-[#FDF2F2] border border-[#F8D7DA] rounded-md px-3.5 py-2.5 flex items-start gap-2.5">
            <AlertTriangle className="size-4 text-[#C8102E] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#C8102E]">
                Reviewer Feedback
              </div>
              <p className="text-[11.5px] text-[#9B1C1C] mt-0.5 leading-relaxed">
                {form.feedback}
              </p>
            </div>
          </div>
        )}

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Project name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => {
              setForm({ ...form, name: e.target.value });
              setErrors((p) => ({ ...p, name: "" }));
            }}
            placeholder="Project name"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.name} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Project description
          </label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => {
              setForm({ ...form, description: e.target.value });
              setErrors((p) => ({ ...p, description: "" }));
            }}
            placeholder="Describe the project, your role, and the key outcomes to showcase your work."
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md p-3.5 text-xs text-slate-700 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.description} />
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
              placeholder="e.g. React, Python, SQL"
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
              onChange={(e) => {
                setForm({ ...form, url: e.target.value });
                setErrors((p) => ({ ...p, url: "" }));
              }}
              placeholder="https://"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
            <FieldError message={errors.url} />
          </div>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-2.5">
        <div>
          {!isNew && onDelete && (
            <button
              type="button"
              onClick={() => {
                onDelete(form.id);
                onClose();
              }}
              className="text-xs font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>Remove</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            Save project
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* 8. Edit / Add Education & Qualifications Modal */
export function EditEducationModal({
  education,
  isNew = false,
  onSave,
  onDelete,
  onClose,
}: {
  education: EducationItem;
  isNew?: boolean;
  onSave: (education: EducationItem) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<EducationItem>(education);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const certInputRef = useRef<HTMLInputElement | null>(null);

  const handleSave = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.qualification.trim())
      nextErrors.qualification = "Qualification title is required.";
    if (!form.institution.trim())
      nextErrors.institution = "Institution name is required.";
    if (!form.graduationYear.trim())
      nextErrors.graduationYear = "Graduation year is required.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      ...form,
      qualification: form.qualification.trim(),
      institution: form.institution.trim(),
      graduationYear: form.graduationYear.trim(),
    });
    onClose();
  };

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
            onChange={(e) => {
              setForm({ ...form, qualification: e.target.value });
              setErrors((p) => ({ ...p, qualification: "" }));
            }}
            placeholder="e.g. Bachelor of Science in Computer Science"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.qualification} />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-900 mb-1.5">
            Institution
          </label>
          <input
            type="text"
            value={form.institution}
            onChange={(e) => {
              setForm({ ...form, institution: e.target.value });
              setErrors((p) => ({ ...p, institution: "" }));
            }}
            placeholder="e.g. University of the Witwatersrand"
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.institution} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Graduation year
            </label>
            <input
              type="text"
              value={form.graduationYear}
              onChange={(e) => {
                setForm({ ...form, graduationYear: e.target.value });
                setErrors((p) => ({ ...p, graduationYear: "" }));
              }}
              placeholder="e.g. 2024"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
            <FieldError message={errors.graduationYear} />
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
              if (!file) return;
              if (file.type !== "application/pdf") {
                setErrors((p) => ({
                  ...p,
                  certificate: "Supporting certificates must be PDF files.",
                }));
                return;
              }
              if (file.size > 10 * 1024 * 1024) {
                setErrors((p) => ({
                  ...p,
                  certificate: "PDF file must be 10 MB or less.",
                }));
                return;
              }
              setErrors((p) => ({ ...p, certificate: "" }));
              setForm({
                ...form,
                certificateName: file.name,
                certificateMeta: `Updated just now • ${Math.max(
                  1,
                  Math.round(file.size / 1024)
                )} KB`,
              });
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
          <FieldError message={errors.certificate} />
          <p className="text-[10.5px] text-slate-400 mt-1.5">
            {form.certificateName
              ? "The current certificate is kept unless you replace it."
              : "Upload a PDF copy of your qualification or certificate (optional)."}
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-2.5">
        <div>
          {!isNew && onDelete && (
            <button
              type="button"
              onClick={() => {
                onDelete(form.id);
                onClose();
              }}
              className="text-xs font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>Remove</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            Save education
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}

/* 9. Edit / Add Endorsement Modal */
export function EditEndorsementModal({
  endorsement,
  isNew = false,
  onSave,
  onDelete,
  onClose,
}: {
  endorsement: EndorsementItem;
  isNew?: boolean;
  onSave: (endorsement: EndorsementItem) => void;
  onDelete?: (id: string) => void;
  onClose: () => void;
}) {
  const [form, setForm] = useState<EndorsementItem>(endorsement);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSave = () => {
    const nextErrors: Record<string, string> = {};
    if (!form.facilitatorName.trim())
      nextErrors.facilitatorName = "Facilitator name is required.";
    if (!form.organisation.trim())
      nextErrors.organisation = "Organisation is required.";
    if (form.statement.trim().length < 20)
      nextErrors.statement =
        "Please provide an endorsement statement (min. 20 characters).";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    onSave({
      ...form,
      facilitatorName: form.facilitatorName.trim(),
      organisation: form.organisation.trim(),
      statement: form.statement.trim(),
    });
    onClose();
  };

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
        {form.feedback && (
          <div className="bg-[#FDF2F2] border border-[#F8D7DA] rounded-md px-3.5 py-2.5 flex items-start gap-2.5">
            <AlertTriangle className="size-4 text-[#C8102E] shrink-0 mt-0.5" />
            <div>
              <div className="text-[10.5px] font-bold uppercase tracking-wider text-[#C8102E]">
                Reviewer Feedback
              </div>
              <p className="text-[11.5px] text-[#9B1C1C] mt-0.5 leading-relaxed">
                {form.feedback}
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Facilitator name
            </label>
            <input
              type="text"
              value={form.facilitatorName}
              onChange={(e) => {
                setForm({ ...form, facilitatorName: e.target.value });
                setErrors((p) => ({ ...p, facilitatorName: "" }));
              }}
              placeholder="e.g. Kabelo Molefe"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
            <FieldError message={errors.facilitatorName} />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-900 mb-1.5">
              Organisation
            </label>
            <input
              type="text"
              value={form.organisation}
              onChange={(e) => {
                setForm({ ...form, organisation: e.target.value });
                setErrors((p) => ({ ...p, organisation: "" }));
              }}
              placeholder="e.g. Shaper Academy"
              className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md px-3.5 py-2.5 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#02183B]"
            />
            <FieldError message={errors.organisation} />
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
            onChange={(e) => {
              setForm({ ...form, statement: e.target.value });
              setErrors((p) => ({ ...p, statement: "" }));
            }}
            placeholder="Write or paste the facilitator endorsement statement..."
            className="w-full bg-[#F4F5F8] border border-slate-200/80 rounded-md p-3.5 text-xs text-slate-700 placeholder:text-slate-400 leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#02183B]"
          />
          <FieldError message={errors.statement} />
        </div>

        <div className="bg-[#F4F5F8] rounded-md px-3.5 py-2.5 text-[11px] text-slate-500">
          Confirm any changes to the statement with your facilitator before
          saving.
        </div>
      </div>

      <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-between gap-2.5">
        <div>
          {!isNew && onDelete && (
            <button
              type="button"
              onClick={() => {
                onDelete(form.id);
                onClose();
              }}
              className="text-xs font-semibold text-[#C8102E] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>Remove</span>
            </button>
          )}
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="bg-[#F4F5F8] hover:bg-slate-200/80 text-[#02183B] text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="bg-[#02183B] hover:bg-[#052659] text-white text-xs font-bold px-4 py-2.5 rounded-md transition cursor-pointer"
          >
            Save endorsement
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}
