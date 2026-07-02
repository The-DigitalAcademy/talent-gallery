    // components/ui/ShareButton.tsx
"use client";

import { trackProfileShared } from "@/app/lib/analytics";

interface ShareButtonProps {
  slug: string;
  name: string;
}

export function ShareButton({ slug, name }: ShareButtonProps) {
  const handleShare = () => {
    // 1. Copy the dynamic link to the user's clipboard
    navigator.clipboard.writeText(`${window.location.origin}/talent/${slug}`);
    
    // 2. Fire the GA4 custom event tracking
    trackProfileShared({
      method: "copy_link",
      talentSlug: slug,
      talentName: name
    });

    alert('Profile link copied to clipboard!');
  };

  return (
    <button 
      onClick={handleShare}
      className="hover:text-slate-600 transition-colors p-1"
      title="Share Profile"
    >
      {/* Clean, recognizable Curved Arrow Share Icon */}
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
      </svg>
    </button>
  );
}