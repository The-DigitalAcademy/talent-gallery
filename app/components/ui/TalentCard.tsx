import { Talent } from '@/app/interface-types/talent';
import Link from 'next/link';
import { MapPinIcon, Maximize2Icon, PlusIcon } from 'lucide-react';
import { Avatar, Button } from '@base-ui/react';

interface TalentCardProps {
  talent: Talent
}

const getStatusColorClassName = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case 'available for wpe': return 'orange-500';
    case 'available for hire': return 'amber-400';
    case 'in wpe': return 'purple-500';
    case 'employed': return 'teal-400';
    default: return 'teal-400';
  }
};

export default function TalentCard({ talent }: TalentCardProps) {
  const displayStatus = talent.talent_status?.name;
  const colorClassName = getStatusColorClassName(displayStatus?.toLowerCase())

  return (
    <div
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
      className={`bg-white rounded-[3px] flex flex-col pt-10 justify-between overflow-hidden relative transition-all duration-200 hover:shadow-md hover:border-slate-200`}
    >
      {/* TOP UTILITIES */}
      <div className={`h-10 absolute w-full top-0 left-0`}>
        <div className={`h-1 bg-${colorClassName}`}></div>
        <div className='flex justify-between px-3 md:px-6  h-9'>
          <div className={`h-full text-white text-xs font-bold rounded-b bg-${colorClassName} flex justify-center items-center w-1/2`}>{displayStatus}</div>
          <Button className="bg-gray-100 h-10 w-8 flex rounded-b -m-1 items-end justify-center pb-2"><PlusIcon className='size-4' /></Button>
        </div>
      </div>

      {/* CLICKABLE CARD BODY */}
      <Link href={`/talent/${talent.slug}`} className="px-3 md:px-6 pb-3 md:pb-6 mt-6 block group select-none flex flex-col h-full">
        <div className='flex flex-col gap-5 flex-1 mb-6'>
          {/* User Block info */}
          <div className="flex items-center gap-4">
            <Avatar.Root className="inline-flex size-20 items-center justify-center overflow-hidden rounded-full bg-gray-100 align-middle text-base leading-none font-normal text-neutral-950 select-none">
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
              <h3 className="uppercase tracking-wide text-lg md:text-xl leading-tight group-hover:text-blue-600 transition-colors mb-1">
                <span className='font-bold'>{talent.fullname.split(" ")[0]}</span>
                <span> {talent.fullname.split(" ")[talent.fullname.split.length - 1][0]}.</span>
              </h3>
              <p className="text-base mb-0.5"> {talent.role?.name} </p>
              <div className="text-xs md:text-sm text-gray-400 flex items-center gap-1">
                <MapPinIcon className='opacity-70 size-4' />
                {talent.location?.city}, {talent.location?.country}
              </div>
            </div>
          </div>

          <div className="flex text-sm flex-wrap gap-1.5 max-h-[58px] overflow-hidden">
            {talent.capabilities?.map((capability, index) => {
              return (
                <span
                  key={capability.id}
                  className="bg-gray-100 py-0.5 px-1 inline-block whitespace-nowrap"
                >
                  {capability.name}
                </span>
              );
            })}
          </div>
          {/* Clamped Bio Paragraph */}
          <p className="text-sm text-slate-600 font-normal leading-relaxed line-clamp-4">
            {talent.bio}
          </p>
        </div>
        <Maximize2Icon className='text-gray-200 ml-auto' />
      </Link>
    </div>
  );
}