import { cn } from "../../lib/utils";
import { CheckIcon, Plus } from "./Icons";

interface ShortlistTagProps {
    padding: string;
    margin?: String;
    isShortlisted: boolean;
    checkIconSize?: string;
    plusIconSize?: string;
}

export default function ShortlistTag({ padding, margin, isShortlisted = false, checkIconSize, plusIconSize}: ShortlistTagProps) {
    return(
        <div className={cn("w-fit rounded-b-[3px] font-bold h-full", padding, margin, isShortlisted ? "bg-[#ff1600]" : "bg-[#f1f1f1]")}>
            {isShortlisted ? <CheckIcon size={checkIconSize}/> : <Plus size={plusIconSize}/>}
        </div>
    )
}