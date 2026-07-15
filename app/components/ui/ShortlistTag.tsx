import { cn } from "../../lib/utils";
import { CheckIcon, Plus } from "./Icons";

interface ShortlistTagProps {
  padding: string;
  margin: String;
  isShortlisted: Boolean;
}

export default function ShortlistTag({ padding, margin, isShortlisted = false}: ShortlistTagProps) {
    return(
        <div className={cn("w-fit rounded-b font-bold", padding, margin, isShortlisted ? "bg-[#ff1600]" : "bg-[#f1f1f1]")}>
            {isShortlisted ? <CheckIcon/> : <Plus/>}
        </div>
    )
}