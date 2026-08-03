import { cn } from "../../lib/utils";
import { ExternalIcon } from "./Icons";

interface ExperienceCardProps {
  title: string;
  subTitle: string;
  description: string;
  bgColor: string;
  titleStyle: string;
  subTitleStyle: string;
  descriptionStyle: string;
  padding: string;
  externalLink: boolean;
}

export default function ExperienceCard({ padding, title, subTitle, titleStyle, bgColor, subTitleStyle, description, descriptionStyle, externalLink = false}: ExperienceCardProps) {
    return(
        <div className={cn("flex flex-col rounded gap-2 w-full", padding, bgColor)}>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <h6 className={cn(titleStyle)}>{title}</h6>
                    <div className="h-[70%] w-[2.5px] bg-black"/>
                    <h6 className={cn(subTitleStyle)}>{subTitle}</h6>
                </div>

                {/* icon */}
                {externalLink &&
                    <ExternalIcon/>
                }
            </div>
            <div className={cn(descriptionStyle)}>{description}</div>
        </div>
    )
}