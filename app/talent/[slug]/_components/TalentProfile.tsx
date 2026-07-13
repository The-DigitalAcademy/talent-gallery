"use client"

import { useState } from "react";
import { ActionButton } from "@/app/components/ui/ActionButton";
import { CloseButton } from "@/app/components/ui/CloseButton";
import { ProfileAvatar } from "@/app/components/ui/ProfileAvatar";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { SkillTag } from "@/app/components/ui/SkillTag";
import { Tag } from "@/app/components/ui/Tag";
import { EndorsementCard } from "./EndorsementCard";
import { ProjectCard } from "./ProjectCard";
import { WorkExperienceCard } from "./WorkExperienceCard";
import { getTalentStatusColor, getYouTubeEmbedUrl } from "@/app/lib/utils";
import { CodeIcon, ProjectIcon, BriefcaseIcon, GitHubIcon, ExternalLinkIcon, ShareIcon } from "@/app/components/ui/Icons";
import { ShareModal } from "@/app/components/ui/ShareModal";

export type TalentProfileInterface = {
  id: string;
  fullname: string;
  bio: string | null;
  profile_image_url: string | null;
  youtube_url: string | null;
  github_url: string | null;
  portfolio_url: string | null;
  linkedin_url: string | null;
  slug: string;
  is_published: boolean;
  created_at: string;
  location_id: string;
  program_id: string;
  cohort_id: string;
  talent_status_id: string;
  location: { city: string; country: string } | null;
  cohort: { name: string } | null;
  program: { name: string } | null;
  talent_status: { name: string } | null;
  capabilities: { capability: { id: string; name: string } }[];
  work_experiences: {
    id: string;
    role: string;
    company: string;
    duration: string;
    description: string | null;
  }[];
  projects: {
    id: string;
    name: string;
    description: string | null;
    capabilities: { capability: { name: string } }[];
  }[];
  endorsements: {
    id: string;
    endorser_name: string;
    message: string;
  }[];
};

interface TalentProfileProps {
  talent: TalentProfileInterface;
}

export function TalentProfile({ talent }: TalentProfileProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const location = talent.location
    ? `${talent.location.city}, ${talent.location.country}`
    : null;

  const skills = talent.capabilities.map((c) => c.capability.name);

  const projects = talent.projects
  .filter((tp) => tp !== null)
  .map((tp) => ({
    title: tp.name,
    description: tp.description ?? "",
    contributions: [],
    capabilities: tp.capabilities.map((pc) => pc.capability.name),
  }));

  const endorsement = talent.endorsements?.[0] ?? null;

  const embedUrl = talent.youtube_url ? getYouTubeEmbedUrl(talent.youtube_url) : null;

  const handleShareClick = async () => {
    const shareUrl = `${window.location.origin}/talent/${talent.slug}`;
    const shareData = {
      title: `${talent.fullname} - Profile`,
      url: shareUrl,
    };

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error("Error sharing:", err);
        }
      }
    } else {
      setIsShareOpen(true);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-xl shadow-sm">

        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-4">
            <ProfileAvatar
              imageUrl={talent.profile_image_url ?? undefined}
              name={talent.fullname}
              size="w-20 h-20"
              radius="rounded-full"
            />
            <div>
              <h1 className="text-2xl font-semibold text-[#01317F]">{talent.fullname}</h1>
              {talent.program && <p className="text-gray-700 mt-1">{talent.program.name}</p>}
              {location && <p className="text-gray-600 text-sm mt-1">{location}</p>}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleShareClick}
              className="flex items-center justify-center w-8 h-8 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Share Profile"
            >
              <ShareIcon />
            </button>
            <a href="/talent" aria-label="Back to gallery">
              <CloseButton onClick={() => {}} />
            </a>
          </div>
        </div>

        <hr className="border-gray-200" />

        {/* Body */}
        <div className="px-6 py-5 space-y-6">

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {talent.cohort && <Tag label={talent.cohort.name} />}
            {talent.program && <Tag label={talent.program.name} />}
            {talent.talent_status && <Tag label={talent.talent_status.name} color="text-white"  bgColor={getTalentStatusColor(talent.talent_status.name)} />}
          </div>

          {/* About */}
          {talent.bio && (
            <div className="space-y-2">
              <h3 className="text-[#01317F] font-bold text-base">About</h3>
              <p className="text-gray-700 leading-relaxed">{talent.bio}</p>
            </div>
          )}

          {/* Video */}
          {embedUrl && (
            <div className="rounded-lg overflow-hidden aspect-video">
              <iframe
                src={embedUrl}
                title="Profile video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {/* Core Capabilities */}
          {skills.length > 0 && (
            <div className="space-y-3">
              <SectionHeading title="Core Capabilities" icon={<CodeIcon />} />
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <SkillTag key={index} label={skill} bgColor="bg-gray-100" />
                ))}
              </div>
            </div>
          )}

          {/* Selected Project Experience */}
          {projects.length > 0 && (
            <div className="space-y-3">
              <SectionHeading title="Selected Project Experience" icon={<ProjectIcon />} />
              <div className="space-y-3">
                {projects.map((project, i) => (
                  <ProjectCard key={i} {...project} />
                ))}
              </div>
            </div>
          )}

          {/* Work Experience */}
          {talent.work_experiences.length > 0 && (
            <div className="space-y-3">
              <SectionHeading title="Work Experience" icon={<BriefcaseIcon />} />
              <div className="space-y-3">
                {talent.work_experiences.map((job) => (
                  <WorkExperienceCard
                    key={job.id}
                    role={job.role}
                    company={job.company}
                    duration={job.duration}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Endorsement */}
          {endorsement && (
            <EndorsementCard
              quote={endorsement.message}
              author={endorsement.endorser_name}
            />
          )}

          {/* Action Buttons */}
          {(talent.github_url || talent.portfolio_url) && (
            <div className="flex gap-3 pt-2 pb-2">
              {talent.github_url && (
                <ActionButton
                  label="View GitHub"
                  href={talent.github_url}
                  color="bg-[#01317F] text-white"
                  icon={<GitHubIcon />}
                />
              )}
              {talent.portfolio_url && (
                <ActionButton
                  label="View Portfolio"
                  href={talent.portfolio_url}
                  color="bg-[#FF7900] text-white"
                  icon={<ExternalLinkIcon />}
                />
              )}
            </div>
          )}
        </div>
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          talent={talent}
        />
      </div>
    </main>
  );
}