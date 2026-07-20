import { cn } from "../../lib/utils";

interface EmploymentStatusProps {
  bgColor: string;
  height: string;
  width?: string;
}

export default function EmploymentHr({ bgColor, height, width = "w-full" }: EmploymentStatusProps) {
    return(
        <div className={cn("rounded-lg", bgColor, height, width)}/>
    )
}