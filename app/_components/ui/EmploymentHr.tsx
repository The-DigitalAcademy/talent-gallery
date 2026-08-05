import { cn } from "../../lib/utils";

interface EmploymentStatusProps {
  bgColor: string;
  height: string;
  width?: string;
  position?: string;
}

export default function EmploymentHr({ bgColor, height, width = "w-full", position }: EmploymentStatusProps) {
    return(
        <div className={cn("rounded-[3px]", bgColor, height, width, position)}/>
    )
}