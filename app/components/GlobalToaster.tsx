'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Toaster } from 'sonner';
import { subscribe, getSnapshot } from '@/app/lib/toast/toastPortalTarget';

export function GlobalToaster() {
  const target = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const portalTarget = target && target.isConnected ? target : document.body;

  return createPortal(
    <Toaster position="bottom-right" richColors style={{ zIndex: 2147483647 }} />,
    portalTarget
  );
}