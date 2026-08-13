"use client";
import React, { useState, useEffect, useRef } from "react";
import { ProfileAvatar } from "./ProfileAvatar";
import { CloseButton } from "./CloseButton";
import { MailIcon, CopyIcon, CheckIcon } from "./Icons";
import { cn } from "@/app/lib/utils";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  talent: {
    fullname: string;
    profile_image_url: string | null;
    program?: { name: string } | null;
    slug: string;
  };
  statusColor: string;
  statusColorHex: string;
}

export function ShareModal({ isOpen, onClose, talent, statusColor, statusColorHex }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/talent/${talent.slug}`
    : "";

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Handle click outside modal to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(`${talent.fullname} - Profile`);
    const body = encodeURIComponent(
      `Check out ${talent.fullname}'s professional profile on the Talent Gallery:\n\n${shareUrl}`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center animate-fade-in p-4"
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl max-w-sm w-full p-6 relative border border-slate-200 flex flex-col gap-4 animate-scale-up"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-black font-bold text-lg leading-none">Share Profile</h2>
          <CloseButton onClick={onClose} size="w-5 h-5" color="text-slate-400" hoverColor="hover:text-slate-600" />
        </div>

        {/* Talent Info card */}
        <div className="flex items-center gap-3 py-2 border-b border-slate-100">
          <ProfileAvatar
            imageUrl={talent.profile_image_url ?? undefined}
            name={talent.fullname}
            size="w-11 h-11"
            ringWidth=""
          />
          <div className="flex flex-col min-w-0">
            <h3 className="font-bold text-slate-800 text-sm leading-snug truncate">
              {talent.fullname}
            </h3>
            <p className="text-xs text-slate-500 font-medium truncate">
              {talent.program?.name || "Talent Candidate"}
            </p>
          </div>
        </div>

        {/* Share Link field */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            Share Link
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              suppressHydrationWarning
              onClick={(e) => (e.target as HTMLInputElement).select()}
              className="flex-1 border border-slate-200 rounded-lg h-10 px-3 text-xs text-slate-700 bg-slate-50 outline-none select-all"
            />
            <button
              onClick={handleCopy}
              className={cn(`h-10 px-4 rounded-lg flex items-center justify-center gap-1.5 font-bold text-xs text-white cursor-pointer transition-all duration-150 shrink-0 ${
                copied ? "bg-green-600" : statusColor
              }`)}
            >
              {copied ? (
                <>
                  <CheckIcon size="w-3 h-3 sm:w-4 sm:h-4"/>
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <CopyIcon />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Email share option */}
        <button
          onClick={handleEmailShare}
          className="h-10 rounded-lg flex items-center justify-center gap-2 font-bold text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"
        >
          <MailIcon />
          <span>Share via Email</span>
        </button>
      </div>
    </div>
  );
}
