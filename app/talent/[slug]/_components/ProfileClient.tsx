"use client"

import { TalentProfileInterface } from "@/app/interface-types/talent";
import { TalentProfile } from "./TalentProfile";

interface ProfileClientProps {
  talent: TalentProfileInterface;
}

export default function ProfileClient({talent} : ProfileClientProps) {
    const close = () => window.location.href = "/talent";

    return (
        <div className="w-screen sm:w-293">
            <TalentProfile talent={talent} onClose={close}/>
        </div>
    )
}