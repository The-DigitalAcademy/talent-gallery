'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
            // Reset scroll position after autofocus has done its thing
            requestAnimationFrame(() => {
                if (dialogRef.current) {
                    dialogRef.current.scrollTop = 0;
                }
            });
        }

        if(!isOpen) {
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