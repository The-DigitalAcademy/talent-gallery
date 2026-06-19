import { cn } from "../../lib/utils";

interface ActionButtonProps {
  label: string;
  href: string;
  color?: string;
  icon?: React.ReactNode;
}

export function ActionButton({
  label,
  href,
  color = "bg-[#01317F] text-white hover:bg-[#01317F]",
  icon,
}: ActionButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-4 hover:py-2 rounded-lg",
        "font-semibold text-base hover:text-lg transition-colors w-full",
        color
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </a>
  );
}