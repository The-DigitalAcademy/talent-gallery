"use client"

import { Talent } from '@/app/interface-types/talent';
import Link from 'next/link';
import { MapPinIcon, Maximize2Icon, PlusIcon } from 'lucide-react';
import { Avatar, Button } from '@base-ui/react';
import { Lexend } from 'next/font/google';
import clsx from 'clsx';
import { useShortlistStore } from '@/app/store/useShortlistStore';
import { useShortlistHydrated } from '@/app/store/useHasHydrated';
import { toast } from 'sonner';
import ShortlistTag from './ShortlistTag';


const lexend = Lexend({ subsets: ["latin"] })

interface TalentCardProps {
  talent: Talent
}

const getStatusColorClassName = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case 'available for wpe': return 'bg-orange-500';
    case 'available for hire': return 'bg-amber-400';
    case 'in wpe': return 'bg-purple-500';
    case 'employed': return 'bg-teal-400';
    default: return 'bg-teal-400';
  }
};

export default function TalentCard({ talent }: TalentCardProps) {
  const talentStatus = talent.talent_status?.name;
  const bgColorClass = getStatusColorClassName(talentStatus?.toLowerCase())

  const isShortlisted = useShortlistStore((s) => s.isShortlisted(talent.id));
  const toggleShortlist = useShortlistStore((s) => s.toggle);
  const hasHydrated = useShortlistHydrated();

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
    <article
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
      className={`bg-white rounded-[3px] flex flex-col pt-10 justify-between relative transition-all duration-200 hover:border-slate-200`}
    >
      {/* TOP UTILITIES */}
      <div className={`h-10 absolute w-full top-0 left-0`}>
        <div className={clsx("h-1 rounded-full", bgColorClass)}></div>
        <div className='flex justify-between px-3 md:px-8  h-9'>
          <div className={clsx("h-full text-white text-xs font-bold rounded-b-[3px] flex justify-center items-end pb-2 w-4/9", bgColorClass)}>{talentStatus}</div>
          <div onClick={handleShortlistToggle}>
            <ShortlistTag 
              padding={"pt-3 sm:pb-0 sm:pt-2.5 px-2 -m-1"}
              checkIconSize={"w-4 h-4 sm:w-5 sm:h-5"}
              plusIconSize={"w-4 h-4 sm:w-5 sm:h-5"}
              isShortlisted={hasHydrated && isShortlisted}
            />
          </div>
        </div>
      </div>

      {/* CLICKABLE CARD BODY */}
      <Link href={`/talent/${talent.slug}`} className="px-3 md:px-9 pb-3 md:pb-7 mt-10 block group select-none flex flex-col h-full">
        <div className='flex flex-col gap-6 flex-1 mb-6'>
          {/* User Block info */}
          <header className="flex items-center gap-3">
            <Avatar.Root className="inline-flex size-17 md:size-21 items-center justify-center overflow-hidden rounded-full bg-gray-100 align-middle text-base leading-none font-normal select-none">
              <Avatar.Image
                src={talent.profile_image_url || undefined}
                className="size-full object-cover" />
              <Avatar.Fallback>
                {talent.fullname
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0]?.toUpperCase() ?? "")
                  .join("")}
              </Avatar.Fallback>
            </Avatar.Root>
            <div>
              <h3 className={`${lexend.className} uppercase tracking-wide md:text-lg md:text-lg leading-tight group-hover:text-blue-600 transition-colors mb-1`}>
                <span className='font-bold'>{talent.fullname.split(" ")[0]}</span>
                <span className='font-light'> {talent.fullname.split(" ")[talent.fullname.split.length - 1][0]}.</span>
              </h3>
              <p className="text-sm mb-0.5"> {talent.role?.name} </p>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                {talent.location && <MapPinIcon className='opacity-70 size-3' />}
                {talent.location?.city}, {talent.location?.country}
              </div>
            </div>
          </header >

          <ul className="flex justify-start items-start text-sm flex-wrap gap-1.5 md:min-h-[50px] max-h-[50px] overflow-hidden">
            {talent.capabilities?.map((capability, index) => {
              return (
                <li
                  key={`${index}-${capability.id}`}
                  className="bg-neutral-200/50 px-1 inline-block whitespace-nowrap"
                >
                  {capability.name}
                </li>
              );
            })}
          </ul>
          {/* Clamped Bio Paragraph */}
          <p className="text-sm font-normal leading-relaxed line-clamp-4">
            {talent.bio}
          </p>
        </div >
        <Maximize2Icon className='text-gray-200 ml-auto' />
      </Link >
    </article >
  );
}