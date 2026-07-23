'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import { setToastPortalTarget } from '@/app/lib/toast/toastPortalTarget';

export function Modal({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Opens the dialog once on mount — unaffected by Strict Mode remounts
    // since showModal() is idempotent-guarded and never explicitly closed here
    useEffect(() => {
        const dialog = dialogRef.current;
        
        if (!dialog?.open) {
            dialog?.showModal();
            requestAnimationFrame(() => {
                if (dialog) {
                    dialog.scrollTop = 0;
                }
            });
        }

        return () => {
            dialog?.close();
        };
    }, []);

    // Registers/clears the toast portal target — symmetric mount/cleanup,
    // independent of dialog.open state so Strict Mode double-invocation
    // can't leave this stuck at null
    useEffect(() => {
        setToastPortalTarget(dialogRef.current);
        return () => setToastPortalTarget(null);
    }, []);

    // Handles external isOpen changes (e.g. route-driven close)
    useEffect(() => {
        if (!isOpen) {
            onDismiss();
        }
    }, [isOpen]);

    function onDismiss() {
        router.back();
    }

    function onDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
        if (e.target === dialogRef.current) {
            onDismiss();
        }
    }

    return createPortal(
        <dialog
            ref={dialogRef}
            className="modal"
            onClick={onDialogClick}
            onClose={onDismiss}
        >
            {children}
        </dialog>,
        document.body
    );
}