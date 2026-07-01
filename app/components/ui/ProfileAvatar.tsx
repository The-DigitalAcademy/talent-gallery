"use client";
import React, { useState } from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";

interface ProfileAvatarProps {
  imageUrl?: string;
  fallback?: string;
  name?: string;
  size?: string;
  radius?: string;
  ringColor?: string;
  ringWidth?: string;
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
  ringColor = "ring-blue-800",
  ringWidth = "ring-2",
  statusColor
}: ProfileAvatarProps) {
  const [hasError, setHasError] = useState(false);
  const initials = fallback ?? getInitials(name);

  return (
    <div className={cn("relative inline-flex shrink-0", size)}>
      <div
        className={cn(
          "w-full h-full overflow-hidden bg-gray-100",
          radius,
          ringWidth,
          ringColor
        )}
      >
        {imageUrl && !hasError ? (
          <Image
            src={imageUrl}
            alt={name ?? "Avatar"}
            fill
            className={cn("object-cover", radius)}
            sizes="112px"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-[#01317F] font-semibold select-none text-lg">
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