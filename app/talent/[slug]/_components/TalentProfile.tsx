"use client"

import EmploymentHr from "@/app/components/ui/EmploymentHr";
import EmploymentTag from "@/app/components/ui/EmploymentTag";
import EndorsementCard from "@/app/components/ui/EndorsementCard";
import ExperienceCard from "@/app/components/ui/ExperienceCard";
import { Back, Cross, GitHubIcon, Location, ShareIcon } from "@/app/components/ui/Icons";
import { ShareModal } from "@/app/components/ui/ShareModal";
import ShortlistTag from "@/app/components/ui/ShortlistTag";
import { SkillTag } from "@/app/components/ui/SkillTag";
import { TalentProfileInterface } from "@/app/interface-types/talent";
import { firstWord, getStatusBadgeStyle, getYouTubeEmbedUrl, restOfWords } from "@/app/lib/utils";
import { useShortlistHydrated } from "@/app/store/useHasHydrated";
import { useShortlistStore } from "@/app/store/useShortlistStore";
import Link from "next/link";
import { Fragment, useState } from "react";
import { toast } from "sonner";

interface TalentProfileProps {
  talent: TalentProfileInterface;
  onClose: () => void;
  isModal: boolean
}

export function TalentProfile({ talent, onClose, isModal }: TalentProfileProps) {
  const displayStatus = talent.talent_status?.name;
  const bgColorEmployement = getStatusBadgeStyle(displayStatus!);

  const [isShareOpen, setIsShareOpen] = useState(false);

  const isShortlisted = useShortlistStore((s) => s.isShortlisted(talent.id));
  const toggleShortlist = useShortlistStore((s) => s.toggle);
  const hasHydrated = useShortlistHydrated();

  const location = talent.location
    ? `${talent.location.city}, ${talent.location.country}`
    : null;

  const skills = talent.capabilities.map((c) => c.capability.name);

  const projects = talent.projects
  .filter((tp) => tp !== null)
  .map((tp) => ({
    id: tp.id,
    title: tp.name,
    description: tp.description ?? "",
    contributions: [],
    capabilities: tp.capabilities.map((pc) => pc.capability.name),
    project_url: tp.project_url
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

  const handleShortlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    toggleShortlist(talent.id)

    if (hasHydrated && isShortlisted) {
      toast(`Removed ${talent.fullname ?? 'talent'} from shortlist`);
    } else {
      toast.success(`Added ${talent.fullname ?? 'talent'} to shortlist`);
    }
  };

  return (
    <div className="relative bg-[#ffffff] w-full h-full rounded-[3px] overflow-auto overflow-x-hidden">
      {isModal &&
        <Fragment>
          <div onClick={onClose} className="hidden fixed md:block z-50 right-6 top-6 cursor-pointer">
            <Cross/>
          </div>
          <div
            onClick={onClose}
            className="fixed md:hidden z-50 py-2 flex gap-2 items-center active:scale-95 transition left-0 top-1 sm:top-2 md:left-56 cursor-pointer"
          >
            <Back/>
            <p className="text-sm sm:text-base">Browse talents</p>
          </div> 
        </Fragment>
      }
      <EmploymentHr bgColor={bgColorEmployement} height="h-1 sm:h-2 fixed z-30" width="w-screen md:w-3xl lg:w-240 xl:w-293"/>

      <div className="px-4 sm:px-10 md:px-16 lg:px-24 xl:px-32 w-screen md:w-3xl lg:w-240 xl:w-293 relative">
        <div className="flex justify-between w-[calc(100vw-32px)] sm:w-[calc(100vw-80px)] md:w-160 lg:w-3xl xl:w-229 fixed z-40">
          {displayStatus ?
            <EmploymentTag textColor={"text-white"} label={displayStatus!} textSize={"text-base sm:text-xl"} padding={"p-2 sm:p-4"} bgColor={bgColorEmployement} /> :
            <div/>
          }
          <div className="cursor-pointer" onClick={handleShortlistToggle}>
            <ShortlistTag 
              padding={"pt-4 sm:pb-0 sm:pt-6 px-2 sm:px-3.5"}
              isShortlisted={hasHydrated && isShortlisted}
            />
          </div>
        </div>
        
        <div className="flex flex-col pb-8 pt-16 sm:pb-14 sm:pt-28 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <h1 className="font-black text-2xl sm:text-4xl">{firstWord(talent?.fullname)}</h1>
                <h1 className="text-2xl sm:text-4xl">{restOfWords(talent?.fullname)}</h1>
              </div>
              <div className="flex gap-2">
                <Link href={talent.github_url || ""} className="cursor-pointer">
                  <GitHubIcon/>
                </Link>
                <div onClick={handleShareClick} className="cursor-pointer">
                  <ShareIcon/>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <h3 className="text-lg sm:text-xl">{talent.role?.name}</h3> 

              {location &&
                <div className="flex gap-1 items-center">
                  <Location/>
                  <p className="text-[#C1C1C1] text-base sm:text-lg">{location}</p>
                </div>
              }
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              {/* Youtube video */}
              {embedUrl && (
                <div className="rounded-[3px] overflow-hidden aspect-video">
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
                <p className="text-sm sm:text-base">{talent.bio}</p>
              )}
            </div>

            {/* Core Skills */}
            {(skills.length > 0 || talent.capabilities_summary) &&
              <div className="flex flex-col gap-4">
                <EmploymentHr bgColor={"bg-[#FFB800]"} height={"h-1"} width={"w-[30%] sm:w-[18%]"}/>

                <div className="flex flex-col gap-2">
                  <h2 className="font-semibold text-xl sm:text-2xl">CORE SKILLS</h2>

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
                <p className="text-sm sm:text-base">{talent.capabilities_summary}</p>
              </div>
            }

            {/* Experience highlights */}
            {(talent.work_experiences[0] || projects.length > 0) &&
              <div className="flex flex-col gap-4">
                <EmploymentHr bgColor={"bg-[#FFB800]"} height={"h-1"} width={"w-[30%] sm:w-[18%]"}/>

                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-xl sm:text-2xl">EXPERIENCE HIGHLIGHTS</h2>

                  {/* Work experience */}
                  {talent.work_experiences[0] &&
                    <ExperienceCard 
                      title={talent.work_experiences[0]?.role} subTitle={talent.work_experiences[0]?.company} description={talent.work_experiences[0]?.description!} 
                      bgColor={"bg-[#f8f8f8]"} titleStyle={"font-bold text-sm sm:text-base"} subTitleStyle={"text-sm sm:text-base"} descriptionStyle={"text-sm sm:text-base"} padding={"py-2 sm:py-4 px-5 sm:px-8"} 
                      externalLink={false}
                    />
                  }

                  {/* Projects */}
                  {projects.length > 0 &&
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {projects.map((project) => (   
                        <Link href={project.project_url ? project.project_url : ""} key={project.id}>            
                          <ExperienceCard
                            key={project.id}
                            title={project.title} subTitle={"Project"} description={project.description} 
                            bgColor={"bg-[#f8f8f8]"} titleStyle={"font-bold text-sm sm:text-base"} subTitleStyle={"text-sm sm:text-base"} descriptionStyle={"text-sm sm:text-base"} padding={"py-2 sm:py-4 px-5 sm:px-8"} 
                            externalLink={true}
                          />
                        </Link>     
                      ))}
                    </div>
                  }
                </div>
              </div>
            }

            {/* Endorsement */}
            {endorsement &&
              <div className="flex flex-col gap-4">
                <EmploymentHr bgColor={"bg-[#FFB800]"} height={"h-1"} width={"w-[30%] sm:w-[18%]"}/>
                <div className="flex flex-col gap-4">
                  <h2 className="font-semibold text-xl sm:text-2xl">ENDORSEMENT</h2>
                  <EndorsementCard endorser={endorsement?.endorser_name} description={endorsement?.message} 
                    bgColor={"bg-[#f8f8f8]"} endoserStyle={"text-sm sm:text-base"} descriptionStyle={"py-2 sm:py-4 text-sm sm:text-base italic"} padding={"p-4"}
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
