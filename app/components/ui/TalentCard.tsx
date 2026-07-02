'use client';
import { trackProfileShared } from '@/app/lib/analytics';
import Link from 'next/link';
import { ShareButton } from './ShareButton';

interface TalentCardProps {
  talent: {
    id: string;
    fullname: string;
    bio: string | null;
    slug: string;
    profile_image_url: string | null;
    location: { city: string; country: string } | null;
    program: { name: string } | null;
    talent_status: { name: string } | null;
    capabilities: Array<{
      capability: {
        id: string;
        name: string;
      };
    }>;
  };
}

const getBorderAccent = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case 'available for wpe': return 'border-t-4 border-t-orange-500';
    case 'available for hire': return 'border-t-4 border-t-amber-400';
    case 'in wpe': return 'border-t-4 border-t-purple-500';
    case 'employed': return 'border-t-4 border-t-teal-400';
    default: return 'border-t-4 border-t-teal-400';
  }
};



const getStatusBadgeStyle = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case 'available for wpe': return 'bg-orange-500 text-white';
    case 'available for hire': return 'bg-amber-400 text-white';
    case 'in wpe': return 'bg-purple-500 text-white';
    case 'employed': return 'bg-teal-400 text-white';
    default: return 'bg-slate-500 text-white';
  }
};

export default function TalentCard({ talent }: TalentCardProps) {
  const topAccent = getBorderAccent(talent.talent_status?.name);
  const displayStatus = talent.talent_status?.name;

  return (
    <div 
    style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
    className={`bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden relative transition-all duration-200 hover:shadow-md hover:border-slate-200 ${topAccent}`}>
      
      {/* TOP UTILITIES: e.stopPropagation() prevents the card link from firing */}
      <div 
        className="absolute top-4 right-4 flex items-center gap-3 text-slate-400 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={() => alert('Marked/Verified')} 
          className="hover:text-slate-600 text-sm font-medium transition-colors p-1"
        >
          ✓
        </button>
       <ShareButton slug={talent.slug} name={talent.fullname} />
      </div>

      {/* CLICKABLE CARD BODY */}
      <Link href={`/talent/${talent.slug}`} className="p-6 block flex-1 group select-none">
        <div>
          {/* User Block info */}
          <div className="flex items-center gap-4 mb-4">
            <img 
              src={talent.profile_image_url || 'https://via.placeholder.com/150'} 
              alt={talent.fullname}
              className="w-14 h-14 rounded-full object-cover border bg-slate-50"
            />
            <div>
              <h3 className="font-bold text-slate-900 text-base leading-tight group-hover:text-blue-600 transition-colors">
                {talent.fullname}
              </h3>
              <p className="text-sm text-slate-500 font-medium mt-0.5">
                {talent.program?.name || 'Talent Profile'}
              </p>
            </div>
          </div>

          {/* Location Element */}
          <div className="text-xs text-slate-400 font-medium flex items-center gap-1 mb-4">
            <span className="text-sm opacity-70">📍</span> 
            {talent.location ? `${talent.location.city}, ${talent.location.country}` : 'Remote'}
          </div>

          {/* Program and Status Pill Row */}
          <div className="flex flex-wrap gap-2 text-[11px] font-bold tracking-wide mb-4">
            {talent.program && (
              <span className="bg-blue-900 text-white px-2.5 py-1 rounded">
                {talent.program.name}
              </span>
            )}
            {displayStatus && (
              <span className={`px-2.5 py-1 rounded ${getStatusBadgeStyle(displayStatus)}`}>
                {displayStatus}
              </span>
            )}
          </div>

          {/* Clamped Bio Paragraph */}
          <p className="text-sm text-slate-600 font-normal leading-relaxed line-clamp-4 mb-5">
            {talent.bio}
          </p>

<div className="flex flex-wrap gap-1.5 max-h-[58px] overflow-hidden">
  {talent.capabilities?.map((c, index) => {
    if (!c.capability?.name) return null;
    return (
      <span 
        key={c.capability.id || index} 
        className="text-xs bg-slate-50 border border-slate-100 text-slate-500 font-medium px-2.5 py-0.5 rounded-md inline-block whitespace-nowrap"
      >
        {c.capability.name}
      </span>
    );
  })}
</div>
        </div>
      </Link>

      {/* Subtle Visual Anchor Bottom Bar */}
      <div className="border-t border-slate-50 bg-slate-50/30 py-3 text-center text-xs font-semibold text-slate-400 group-hover:text-blue-600 transition-colors rounded-b-2xl">
       <Link href={`/talent/${talent.slug}`} className="text-slate-500 hover:text-blue-800">
         View Full Profile →
       </Link>
      </div>
    </div>
  );
}