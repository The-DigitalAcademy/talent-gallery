import { cn } from "../../lib/utils";

interface EmploymentStatusProps {
  label: string;
  bgColor: string;
  textSize: String;
  textColor: String;
  padding: string;
  margin?: String;
}

export default function EmploymentTag({ padding, label, textSize, textColor, bgColor, margin}: EmploymentStatusProps) {
    return(
        <div className={cn("rounded-b-[3px] font-bold", textSize, textColor, bgColor, padding, margin)}>
            {label}
        </div>
    )
}