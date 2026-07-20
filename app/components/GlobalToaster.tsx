'use client';

import { useSyncExternalStore } from 'react';
import { createPortal } from 'react-dom';
import { Toaster } from 'sonner';
import { getSnapshot, subscribe } from '../lib/toast/toastPortalTarget';

export function GlobalToaster() {
  const target = useSyncExternalStore(subscribe, getSnapshot, () => null);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <Toaster position="bottom-right" richColors style={{ zIndex: 2147483647 }} />,
    target ?? document.body
  );
}