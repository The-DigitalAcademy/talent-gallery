import { cn } from "../../lib/utils";

interface TagProps {
  label: string;
  color?: string;
  bgColor?: string;
  textSize?: string;
  padding?: string;
  radius?: string;
}

export function Tag({
  label,
  color = "bg-[#01317F] text-white",
  bgColor,
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
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {label}
    </span>
  );
}