'use client';
import { Talent } from '@/app/interface-types/talent';
import { useState } from 'react';
import Link from 'next/link';
import { ShareModal } from './ShareModal';
import { ShareButton } from './ShareButton';
import { ProfileAvatar } from './ProfileAvatar';

interface TalentCardProps {
  talent: Talent
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
  const [isShareOpen, setIsShareOpen] = useState(false);
  const topAccent = getBorderAccent(talent.talent_status?.name);
  const displayStatus = talent.talent_status?.name;

  return (
    <div 
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 400px' }}
      className={`bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden relative transition-all duration-200 hover:shadow-md hover:border-slate-200 ${topAccent}`}
    >
      
      {/* TOP UTILITIES: e.stopPropagation() inside ShareButton preserves separate action clicking */}
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

        {/* 💡 MODULAR MERGE: Unified ShareButton component handles GA4 and native/modal routing */}
        <ShareButton 
          slug={talent.slug} 
          name={talent.fullname} 
          onOpenModal={() => setIsShareOpen(true)} 
        />
      </div>

      {/* CLICKABLE CARD BODY */}
      <Link href={`/talent/${talent.slug}`} className="p-6 block flex-1 group select-none">
        <div>
          {/* User Block info */}
          <div className="flex items-center gap-4 mb-4">
            <ProfileAvatar
              imageUrl={talent.profile_image_url ?? undefined}
              name={talent.fullname}
              ringColor="ring-gray-200"
              ringWidth="ring-2"
              textSize='text-base'
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
            {talent.capabilities?.map((capability, index) => {
              if (!capability.name) return null;
              return (
                <span 
                  key={capability.id || index} 
                  className="text-xs bg-slate-50 border border-slate-100 text-slate-500 font-medium px-2.5 py-0.5 rounded-md inline-block whitespace-nowrap"
                >
                  {capability.name}
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

      {/* Desktop / Fallback Overlay Dialog Box */}
      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        talent={talent} 
      />
    </div>
  );
}