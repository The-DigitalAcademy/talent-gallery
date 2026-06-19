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
  color = "bg-blue-900 text-white hover:bg-blue-800",
  icon,
}: ActionButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-center justify-center gap-2 px-6 py-4 rounded-lg",
        "font-semibold text-base transition-colors w-full",
        color
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {label}
    </a>
  );
}