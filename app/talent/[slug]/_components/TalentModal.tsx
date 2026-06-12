"use client";

import { ActionButton } from "@/app/components/ui/ActionButton";
import { CloseButton } from "@/app/components/ui/CloseButton";
import { ProfileAvatar } from "@/app/components/ui/ProfileAvatar";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { SkillTag } from "@/app/components/ui/SkillTag";
import { Tag } from "@/app/components/ui/Tag";
import { EndorsementCard } from "./EndorsementCard";
import { ProjectCard } from "./ProjectCard";
import { WorkExperienceCard } from "./WorkExperienceCard";

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
    project: {
      id: string;
      name: string;
      description: string | null;
      capabilities: { capability: { name: string } }[];
    } | null;
  }[];
  endorsements: {
    id: string;
    endorser_name: string;
    message: string;
  }[];
};

interface TalentModalProps {
  talent: TalentProfileInterface;
  onClose: () => void;
}

// Icons
function CodeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function ProjectIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.073a2.25 2.25 0 01-2.25 2.25h-12a2.25 2.25 0 01-2.25-2.25V6.75A2.25 2.25 0 016 4.5h12a2.25 2.25 0 012.25 2.25v3.4M15.75 4.5v-1.5A1.5 1.5 0 0014.25 1.5h-4.5A1.5 1.5 0 008.25 3v1.5" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export function TalentModal({ talent, onClose }: TalentModalProps) {
  const location = talent.location
    ? `${talent.location.city}, ${talent.location.country}`
    : null;

  const skills = talent.capabilities.map((c) => c.capability.name);

  const projects = talent.projects
    .filter((tp) => tp.project !== null)
    .map((tp) => ({
      title: tp.project!.name,
      description: tp.project!.description ?? "",
      contributions: [],
      technologies: tp.project!.capabilities.map((pc) => pc.capability.name),
    }));

  const endorsement = talent.endorsements?.[0] ?? null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-center gap-4">
            <ProfileAvatar
              imageUrl={talent.profile_image_url ?? undefined}
              name={talent.fullname}
              size="w-20 h-20"
              radius="rounded-full"
              ringColor="border-blue-800"
              ringWidth="border-2"
            />
            <div>
              <h2 className="text-2xl font-bold text-blue-900">{talent.fullname}</h2>
              {talent.program && <p className="text-gray-600">{talent.program.name}</p>}
              {location && <p className="text-gray-500 text-sm">{location}</p>}
            </div>
          </div>
          <CloseButton onClick={onClose} className="mt-1" />
        </div>

        <hr className="border-gray-200 mx-6" />

        {/* Body */}
        <div className="px-6 py-5 space-y-6">

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {talent.cohort && <Tag label={talent.cohort.name} />}
            {talent.program && <Tag label={talent.program.name} color="bg-blue-700 text-white" />}
            {talent.talent_status && <Tag label={talent.talent_status.name} color="bg-orange-500 text-white" />}
          </div>

          {/* About */}
          {talent.bio && (
            <div className="space-y-2">
              <h3 className="text-blue-900 font-bold text-base">About</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{talent.bio}</p>
            </div>
          )}

          {/* Video */}
          {talent.youtube_url && (
            <div className="rounded-lg overflow-hidden aspect-video">
              <iframe
                src={getYouTubeEmbedUrl(talent.youtube_url)}
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
                  <SkillTag key={index} label={skill} />
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
            <div className="flex gap-3 pt-2">
              {talent.github_url && (
                <ActionButton
                  label="View GitHub"
                  href={talent.github_url}
                  color="bg-blue-900 text-white hover:bg-blue-800"
                  icon={<GitHubIcon />}
                />
              )}
              {talent.portfolio_url && (
                <ActionButton
                  label="View Portfolio"
                  href={talent.portfolio_url}
                  color="bg-orange-500 text-white hover:bg-orange-600"
                  icon={<ExternalLinkIcon />}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}