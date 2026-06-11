// components/ui/TalentCard.tsx
import Link from 'next/link';

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

const getBorderAccent = (programName: string | undefined) => {
  switch (programName?.toLowerCase()) {
    case 'software development': return 'border-t-4 border-t-orange-500';
    case 'data science': return 'border-t-4 border-t-amber-500';
    case 'ux/ui design': return 'border-t-4 border-t-purple-500';
    default: return 'border-t-4 border-t-teal-400';
  }
};

const getStatusBadgeStyle = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case 'available for wpe': return 'bg-orange-500 text-white';
    case 'available for hire': return 'bg-amber-500 text-white';
    case 'in wpe': return 'bg-purple-500 text-white';
    case 'employed': return 'bg-teal-400 text-white';
    default: return 'bg-slate-500 text-white';
  }
};

export default function TalentCard({ talent }: TalentCardProps) {
  const topAccent = getBorderAccent(talent.program?.name);
  const displayStatus = talent.talent_status?.name;

  return (
    <div className={`bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between overflow-hidden p-6 relative ${topAccent}`}>
      
      {/* Top action utilities */}
      <div className="absolute top-4 right-4 flex items-center gap-3 text-slate-400">
        <button className="hover:text-slate-600 text-sm">✓</button>
        <button className="hover:text-slate-600 text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l4.632-2.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316l4.632-2.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684z" />
          </svg>
        </button>
      </div>

      <div>
        {/* User Block info */}
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={talent.profile_image_url || 'https://via.placeholder.com/150'} 
            alt={talent.fullname}
            className="w-14 h-14 rounded-full object-cover border bg-slate-50"
          />
          <div>
            <h3 className="font-bold text-slate-900 text-base leading-tight">{talent.fullname}</h3>
            <p className="text-sm text-slate-500 font-medium mt-0.5">{talent.program?.name || 'Talent Profile'}</p>
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

        {/* Capability Tag Matrix */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {talent.capabilities?.map((c) => (
            <span 
              key={c.capability.id} 
              className="text-xs bg-slate-50 border border-slate-100 text-slate-500 font-medium px-2.5 py-0.5 rounded-md"
            >
              {c.capability.name}
            </span>
          ))}
        </div>
      </div>

      {/* Link matching your teammate's dynamic directory structure */}
      <Link 
        href={`/talent/${talent.slug}`}
        className="w-full text-center border-t border-slate-100 pt-4 text-xs font-semibold text-slate-400 hover:text-blue-600 transition-colors"
      >
        Click to view full profile
      </Link>
    </div>
  );
}