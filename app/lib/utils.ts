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

export function getYouTubeEmbedUrl(url: string): string {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
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

export const getStatusBadgeStyle = (status: string | undefined) => {
  switch (status?.toLowerCase()) {
    case 'available for wpe': return 'bg-orange-500 text-white';
    case 'available for hire': return 'bg-amber-400 text-white';
    case 'in wpe': return 'bg-purple-500 text-white';
    case 'employed': return 'bg-teal-400 text-white';
    default: return 'bg-slate-500 text-white';
  }
};