import { cn } from "../../lib/utils";
import { QoutesIcon } from "./Icons";

interface EndorsementCardProps {
  endorser: string;
  description: string;
  bgColor: string;
  endoserStyle: string;
  descriptionStyle: string;
  padding: string;
}

export default function EndorsementCard({ padding, bgColor, description, descriptionStyle, endorser, endoserStyle}: EndorsementCardProps) {
    return(
        <div className={cn("rounded gap-4 w-full", padding, bgColor)}>
            <div className="flex gap-2">
                <div className="flex h-full items-start">
                    <QoutesIcon/>
                </div>
                <div className="h-full w-full">
                    <div className={cn(descriptionStyle)}>{description}</div>
                    <div className={cn(endoserStyle)}>- {endorser}</div>
                </div>
            </div>
        </div>
    )
}