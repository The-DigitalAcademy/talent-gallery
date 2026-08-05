"use client"

import { TalentProfile } from "@/app/talent/[slug]/_components/TalentProfile";
import { Modal } from "./Modal";
import { TalentProfileInterface } from "@/app/interface-types/talent";
import { useState } from "react";

interface ModalClientProps {
  talent: TalentProfileInterface;
}

export default function ModalClient({ talent }: ModalClientProps) {
    const [isOpen, setIsOpen] = useState(true);
    const close = () => setIsOpen(false);

    return (
        <Modal isOpen={isOpen}>
            <div className="w-full h-full overflow-auto overflow-x-hidden">
                <TalentProfile talent={talent} onClose={close} isModal={true}/>
            </div>
        </Modal>
    )
}