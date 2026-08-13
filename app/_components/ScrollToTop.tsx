'use client';

import { Suspense, useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

function ScrollToTopInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isPopState = useRef(false);

  useEffect(() => {
    const handlePopState = () => {
      isPopState.current = true;
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    // If there's a hash, let the browser/anchor scroll handle it —
    // don't force scroll to top, whether this is initial load or a route change
    if (window.location.hash) {
      const id = window.location.hash.slice(1);
      // give layout a moment to settle (images, fonts, async content)
      requestAnimationFrame(() => {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      });
      return;
    }

    if (isPopState.current) {
      isPopState.current = false;
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return null;
}

export default function ScrollToTop() {
  return (
    <Suspense fallback={null}>
      <ScrollToTopInner />
    </Suspense>
  );
}