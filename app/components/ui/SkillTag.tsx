import { cn } from "../../lib/utils";

interface SkillTagProps {
  label: string;
  className?: string;
}

export function SkillTag({ label }: SkillTagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm font-medium",
        "border border-gray-300 rounded-sm text-gray-700 bg-white"
      )}
    >
      {label}
    </span>
  );
}