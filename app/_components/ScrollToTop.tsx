'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function ScrollToTop() {
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
    if (isPopState.current) {
      // Back/forward navigation — let the browser restore scroll position
      isPopState.current = false;
      return;
    }
    // Forward navigation via Link/router.push — force scroll to top
    window.scrollTo(0, 0);
  }, [pathname, searchParams]);

  return null;
}