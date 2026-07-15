'use client';

import { type ElementRef, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<'dialog'>>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
        dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    function onDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
        console.log("target", e.target)
        console.log("current target", e.currentTarget)
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
            <button onClick={onDismiss} className="close-button" />
        </dialog>,
        document.body
    );
}
