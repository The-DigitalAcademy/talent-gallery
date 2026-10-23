import { cn } from "../../lib/utils";

export function SkillTag({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 text-sm sm:text-base",
        "rounded-[3px] text-gray-700",
        "bg-gray-100"
      )}
    >
      {label}
    </span>
  );
}