"use client";

import { useState } from "react";
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
  textSize?: string;
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
  statusColor,
  textSize = "text-lg"
}: ProfileAvatarProps) {
  const initials = fallback ?? getInitials(name);

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showImage = imageUrl && !error;

  return (
    <div className={cn("relative inline-flex shrink-0", size)}>
      <div
        className={cn(
          "relative w-full h-full overflow-hidden bg-gray-100",
          radius,
          ringWidth,
          ringColor
        )}
      >
        {/* Skeleton */}
        {showImage && !loaded && (
          <div
            className={cn(
              "absolute inset-0 animate-pulse bg-slate-200",
              radius
            )}
          />
        )}

        {/* Image */}
        {showImage ? (
          <Image
            src={imageUrl}
            alt={name ?? "Avatar"}
            fill
            sizes="56px"
            placeholder="empty"
            className={cn(
              "object-cover transition-opacity duration-300",
              radius,
              loaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        ) : (
          <div 
            className={
              cn(
                "w-full h-full flex items-center justify-center bg-gray-100 text-[#01317F] font-semibold select-none",
                textSize
              )
            }
          >
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