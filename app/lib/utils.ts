import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function slugify(text: string) {
    return text
        .toString()                     // Cast to string if necessary
        .normalize('NFD')               // Split accented characters into base letters and diacritics
        .replace(/[\u0300-\u036f]/g, '') // Remove diacritics / accents
        .toLowerCase()                  // Convert to lowercase
        .trim()                         // Trim leading and trailing whitespace
        .replace(/\s+/g, '-')           // Replace spaces with hyphens
        .replace(/[^\w\-]+/g, '')       // Remove all non-word characters except hyphens
        .replace(/\-\-+/g, '-');        // Replace multiple consecutive hyphens with a single one
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getYouTubeEmbedUrl(url: string): string | null {
  if (!url) return null;

  // Try to match the video ID from standard YouTube formats
  // 1. Watch URL format: v=VIDEO_ID
  let match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  let videoId = match ? match[1] : null;

  // 2. Path-based formats (shorts, embed, v, vi, youtu.be)
  if (!videoId) {
    match = url.match(/(?:embed|shorts|v|vi|youtu\.be)\/([a-zA-Z0-9_-]{11})/);
    if (match) {
      videoId = match[1];
    }
  }

  if (!videoId) {
    return null;
  }

  // Optional: Extract start time if present
  let startTime: string | null = null;
  const timeMatch = url.match(/[?&]t=(\d+h)?(\d+m)?(\d+s|\d+)?/);
  if (timeMatch) {
    const rawTime = timeMatch[0].split('=')[1];
    if (/^\d+$/.test(rawTime)) {
      startTime = rawTime;
    } else {
      let totalSeconds = 0;
      const hours = url.match(/(\d+)h/);
      const minutes = url.match(/(\d+)m/);
      const seconds = url.match(/(\d+)s/);
      if (hours) totalSeconds += parseInt(hours[1], 10) * 3600;
      if (minutes) totalSeconds += parseInt(minutes[1], 10) * 60;
      if (seconds) totalSeconds += parseInt(seconds[1], 10);
      if (totalSeconds > 0) {
        startTime = totalSeconds.toString();
      }
    }
  }

  return `https://www.youtube.com/embed/${videoId}${startTime ? `?start=${startTime}` : ""}`;
}

export function getTalentStatusColor(statusName: string): string {
  const talent_status_colors = [
    { status: "available for wpe", color: "#FF7900" },
    { status: "available for hire", color: "#FFB800" },
    { status: "in wpe", color: "#C755FF" },
    { status: "employed", color: "#2DD4BF" },
  ];

  return (
    talent_status_colors.find((s) => s.status === statusName.toLowerCase())?.color
    ?? "#9CA3AF" // fallback gray
  );
}