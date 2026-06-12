"use client"

import { ActionButton } from "@/app/components/ui/ActionButton";
import { CloseButton } from "@/app/components/ui/CloseButton";
import { ProfileAvatar } from "@/app/components/ui/ProfileAvatar";
import { SectionHeading } from "@/app/components/ui/SectionHeading";
import { SkillTag } from "@/app/components/ui/SkillTag";
import { Tag } from "@/app/components/ui/Tag";
import { EndorsementCard } from "./EndorsementCard";
import { ProjectCard } from "./ProjectCard";
import { TalentProfileInterface } from "./TalentModal";
import { WorkExperienceCard } from "./WorkExperienceCard";
import { getYouTubeEmbedUrl } from "@/app/lib/utils";
import { CodeIcon, ProjectIcon, BriefcaseIcon, GitHubIcon, ExternalLinkIcon } from "@/app/components/ui/Icons";

interface TalentProfileProps {
  talent: TalentProfileInterface;
}

export function TalentProfile({ talent }: TalentProfileProps) {
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
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm">

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
              <h1 className="text-2xl font-bold text-blue-900">{talent.fullname}</h1>
              {talent.program && <p className="text-gray-600">{talent.program.name}</p>}
              {location && <p className="text-gray-500 text-sm">{location}</p>}
            </div>
          </div>
          <a href="/gallery" aria-label="Back to gallery">
            <CloseButton onClick={() => {}} />
          </a>
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
    </main>
  );
}