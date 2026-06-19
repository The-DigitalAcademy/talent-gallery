import Image from "next/image";
import { cn } from "../../lib/utils";

interface ProfileAvatarProps {
  imageUrl?: string;
  fallback?: string;
  name?: string;
  size?: string;
  radius?: string;
  borderColor?: string;
  borderWidth?: string;
  statusColor?: string;
}

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");
}

export function ProfileAvatar({
  imageUrl,
  fallback,
  name,
  size = "w-14 h-14",
  radius = "rounded-full",
  borderColor = "border-blue-800",
  borderWidth = "border-2",
  statusColor
}: ProfileAvatarProps) {
  const initials = fallback ?? getInitials(name);

  return (
    <div className={cn("relative inline-flex shrink-0", size)}>
      <div
        className={cn(
          "w-full h-full overflow-hidden bg-gray-100",
          radius,
          borderWidth,
          borderColor
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={name ?? "Avatar"}
            fill
            className="object-cover"
            sizes="112px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-800 font-semibold select-none text-base">
            {initials}
          </div>
        )}
      </div>

      {statusColor && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-white w-3 h-3",
            statusColor
          )}
        />
      )}
    </div>
  );
}