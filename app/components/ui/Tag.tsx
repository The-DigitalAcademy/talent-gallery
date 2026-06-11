import { cn } from "../../lib/utils";

interface TagProps {
  label: string;
  color?: string;
  textSize?: string;
  padding?: string;
  radius?: string;
}

export function Tag({
  label,
  color = "bg-blue-900 text-white",
  textSize = "text-sm",
  padding = "px-4 py-2",
  radius = "rounded-sm"
}: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium",
        color,
        textSize,
        padding,
        radius
      )}
    >
      {label}
    </span>
  );
}