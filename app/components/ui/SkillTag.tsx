import { cn } from "../../lib/utils";

interface SkillTagProps {
  label: string;
  bgColor?: string;
}

export function SkillTag({ label, bgColor = "bg-white" }: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm sm:text-base",
        "rounded-sm text-gray-700", 
        bgColor
      )}
    >
      {label}
    </span>
  );
}