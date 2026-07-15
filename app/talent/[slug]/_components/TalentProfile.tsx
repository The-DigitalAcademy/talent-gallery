"use client"

import EmploymentHr from "@/app/components/ui/EmploymentHr";
import EmploymentTag from "@/app/components/ui/EmploymentTag";
import { GitHubIcon, Location, ShareIcon } from "@/app/components/ui/Icons";
import ShortlistTag from "@/app/components/ui/ShortlistTag";
import { SkillTag } from "@/app/components/ui/SkillTag";
import { TalentProfileInterface } from "@/app/interface-types/talent";
import { getTalentStatusColor, getYouTubeEmbedUrl } from "@/app/lib/utils";
import { useState } from "react";

interface TalentProfileProps {
  talent: TalentProfileInterface;
}

export function TalentProfile({ talent }: TalentProfileProps) {
  const displayStatus = talent.talent_status?.name;
  const bgColorEmployement = getTalentStatusColor(displayStatus!);

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
    <div className="bg-[#ffffff] border-x-2 border-white w-full">
      <EmploymentHr bgColor={`bg-[${bgColorEmployement}]`} height={"h-2"}/>

      <div className="px-32 w-full">
        <div className="flex justify-between w-full">
          <EmploymentTag margin={"-mt-[8px]"} textColor={"text-white"} label={displayStatus!} textSize={"text-xl"} padding={"p-4"} bgColor={`bg-[${bgColorEmployement}]`} />
          <ShortlistTag padding={"pb-0 pt-6 px-3.5"} margin={"-mt-[8px]"} isShortlisted={true}/>
        </div>
        
        <div className="flex flex-col py-14 gap-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <h1>{talent?.fullname}</h1>
              <div className="flex gap-2">
                <GitHubIcon/>
                <ShareIcon/>
              </div>
            </div>
            <div className="flex justify-between">
              <h3>Full-Stack Developer</h3> 
              <div className="flex gap-1">
                <Location/>
                <p>{`${talent?.location?.city}, ${talent?.location?.country}`}</p>
              </div>
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
                <p className="text-gray-700 leading-relaxed">{talent.bio}</p>
              )}
            </div>

            {/* Core Skills */}
            <div className="">
              <EmploymentHr bgColor={"bg-amber-400"} height={"h-1"} width={"w-[25%]"}/>
              <h2>CORE SKILLS</h2>

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

              {/* Description */}
              <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>
            </div>

            {/* Experience highlights */}
            <div className="">
              <EmploymentHr bgColor={"bg-amber-400"} height={"h-1"} width={"w-[25%]"}/>

            </div>

            {/* Endorsement */}
            <div className="">
              <EmploymentHr bgColor={"bg-amber-400"} height={"h-1"} width={"w-[25%]"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}