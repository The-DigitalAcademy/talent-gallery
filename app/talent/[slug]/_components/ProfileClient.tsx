"use client"

import { TalentProfileInterface } from "@/app/interface-types/talent";
import { TalentProfile } from "./TalentProfile";
import { Back } from "@/app/_components/ui/Icons";

interface ProfileClientProps {
  talent: TalentProfileInterface;
}

export default function ProfileClient({talent} : ProfileClientProps) {
    const close = () => window.location.href = "/talent";

    return (
        <div className="w-screen md:w-3xl lg:w-240 xl:w-293">
            <div 
                onClick={close}
                className="py-4 flex gap-2 items-center active:scale-95 transition left-0  md:left-56 cursor-pointer"
            >
                <Back/>
                <p className="text-sm md:text-base">Browse Talent</p>
            </div>
            <TalentProfile talent={talent} onClose={close} isModal={false}/>
        </div>
    )
}