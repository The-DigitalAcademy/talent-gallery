"use client"

import EmploymentHr from "@/app/components/ui/EmploymentHr";
import EmploymentTag from "@/app/components/ui/EmploymentTag";
import EndorsementCard from "@/app/components/ui/EndorsementCard";
import ExperienceCard from "@/app/components/ui/ExperienceCard";
import { GitHubIcon, Location, ShareIcon } from "@/app/components/ui/Icons";
import { ShareModal } from "@/app/components/ui/ShareModal";
import ShortlistTag from "@/app/components/ui/ShortlistTag";
import { SkillTag } from "@/app/components/ui/SkillTag";
import { TalentProfileInterface } from "@/app/interface-types/talent";
import { firstWord, getStatusBadgeStyle, getYouTubeEmbedUrl, restOfWords } from "@/app/lib/utils";
import { useState } from "react";

interface TalentProfileProps {
  talent: TalentProfileInterface;
}

export function TalentProfile({ talent }: TalentProfileProps) {
  const displayStatus = talent.talent_status?.name;
  const bgColorEmployement = getStatusBadgeStyle(displayStatus!);

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
    <div className="bg-[#ffffff] w-full rounded-lg">
      <EmploymentHr bgColor={bgColorEmployement} height={"h-2"}/>

      <div className="px-32 w-full">
        <div className="flex justify-between w-full">
          {displayStatus ?
            <EmploymentTag margin={"-mt-[8px]"} textColor={"text-white"} label={displayStatus!} textSize={"text-xl"} padding={"p-4"} bgColor={bgColorEmployement} /> :
            <div/>
          }
          <ShortlistTag padding={"pb-0 pt-6 px-3.5"} margin={"-mt-[8px]"} isShortlisted={true}/>
        </div>
        
        <div className="flex flex-col py-14 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <h1 className="font-black text-4xl">{firstWord(talent?.fullname)}</h1>
                <h1 className="text-4xl">{restOfWords(talent?.fullname)}</h1>
              </div>
              <div className="flex gap-2">
                <GitHubIcon/>
                <div onClick={handleShareClick}>
                  <ShareIcon/>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <h3 className="text-xl">Full-Stack Developer</h3> 

              {location &&
                <div className="flex gap-1">
                  <Location/>
                  <p className="text-[#C1C1C1] text-lg">{location}</p>
                </div>
              }
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {/* Youtube video */}
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

              {/* Bio */}
              {talent.bio && (
                <p className="text-base">{talent.bio}</p>
              )}
            </div>

            {/* Core Skills */}
            {(skills.length > 0 || talent.capabilities_summary) &&
              <div className="flex flex-col gap-4">
                <EmploymentHr bgColor={"bg-[#FFB800]"} height={"h-1"} width={"w-[18%]"}/>

                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-2xl">CORE SKILLS</h2>

                  {/* Skill tags */}
                  {skills.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <SkillTag key={index} label={skill} bgColor="bg-gray-100" />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-base">{talent.capabilities_summary}</p>
              </div>
            }

            {/* Experience highlights */}
            {(talent.work_experiences[0] || projects.length > 0) &&
              <div className="flex flex-col gap-4">
                <EmploymentHr bgColor={"bg-[#FFB800]"} height={"h-1"} width={"w-[18%]"}/>

                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-2xl">EXPERIENCE HIGHLIGHTS</h2>

                  {/* Work experience */}
                  {talent.work_experiences[0] &&
                    <ExperienceCard 
                      title={talent.work_experiences[0]?.role} subTitle={talent.work_experiences[0]?.company} description={talent.work_experiences[0]?.description!} 
                      bgColor={"bg-[#f8f8f8]"} titleStyle={"font-bold text-base"} subTitleStyle={"text-base"} descriptionStyle={"text-base"} padding={"py-4 px-8"} 
                      externalLink={false}
                    />
                  }

                  {/* Projects */}
                  {projects.length > 0 &&
                    <div className="grid grid-cols-2 gap-4">
                      {projects.map((project, key) => (                    
                        <ExperienceCard 
                          key={key}
                          title={project.title} subTitle={"Project"} description={project.description} 
                          bgColor={"bg-[#f8f8f8]"} titleStyle={"font-bold text-base"} subTitleStyle={"text-base"} descriptionStyle={"text-base"} padding={"py-4 px-8"} 
                          externalLink={true}
                        />
                      ))}
                    </div>
                  }
                </div>
              </div>
            }

            {/* Endorsement */}
            {endorsement &&
              <div className="flex flex-col gap-4">
                <EmploymentHr bgColor={"bg-[#FFB800]"} height={"h-1"} width={"w-[18%]"}/>
                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-2xl">ENDORSEMENT</h2>
                  <EndorsementCard endorser={endorsement?.endorser_name} description={endorsement?.message} 
                    bgColor={"bg-[#f8f8f8]"} endoserStyle={"text-base"} descriptionStyle={"py-4 text-base italic"} padding={"p-4"}
                  />
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        talent={talent}
      />
    </div>
  );
}
