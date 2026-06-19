import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export function getTalentStatusColor(statusName: string): string {
  const talent_status_colors = [
    { status: "available for wpe", color: "#FF7900" },
    { status: "available for hire", color: "#FFB800" },
    { status: "in wpe", color: "#C755FF" },
  ];

  return (
    talent_status_colors.find((s) => s.status === statusName.toLowerCase())?.color
    ?? "#9CA3AF" // fallback gray
  );
}