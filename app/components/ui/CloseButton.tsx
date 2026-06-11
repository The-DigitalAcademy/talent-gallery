import { cn } from "../../lib/utils";


interface CloseButtonProps {
  onClick: () => void;
  color?: string;
  hoverColor?: string;
  size?: string;
  className?: string;
  ariaLabel?: string;
}

export function CloseButton({
  onClick,
  color = "text-gray-400",
  hoverColor = "hover:text-gray-600",
  size = "w-6 h-6",
  ariaLabel = "Close"
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        "flex items-center justify-center rounded-full transition-colors cursor-pointer",
        color,
        hoverColor,
        size
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-full h-full"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}