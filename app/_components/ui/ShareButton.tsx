// components/ui/ShareButton.tsx
'use client';

import { trackProfileShared } from '@/app/lib/analytics';

interface ShareButtonProps {
  slug: string;
  name: string;
  onOpenModal: () => void;
}

export function ShareButton({ slug, name, onOpenModal }: ShareButtonProps) {
  const handleShareClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const shareUrl = `${window.location.origin}/talent/${slug}`;
    const shareData = {
      title: `${name} - Profile`,
      url: shareUrl,
    };

    // Native mobile capability detector
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

    if (isMobile && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        
        // 📊 GA4 TRACKING 1: User completed a mobile system share
        trackProfileShared({
          method: 'native_share',
          talentSlug: slug,
          talentName: name
        });
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          console.error("Error sharing via native sheet:", err);
        }
      }
    } else {
      // 📊 GA4 TRACKING 2: Desktop fallback opened the overlay dialog modal
      trackProfileShared({
        method: 'modal_open',
        talentSlug: slug,
        talentName: name
      });
      
      onOpenModal();
    }
  };

  return (
    <button 
      onClick={handleShareClick}
      className="hover:text-slate-600 transition-colors p-1 text-slate-400"
      title="Share Profile"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
      </svg>
    </button>
  );
}