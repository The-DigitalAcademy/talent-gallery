"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem("shaper_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 600);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("shaper_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("shaper_cookie_consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:right-auto md:left-6 md:max-w-[340px] z-50 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
    >
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 shadow-lg rounded-xl p-3.5 sm:p-4 text-gray-900">
        <div className="flex items-start justify-between gap-2.5 mb-2">
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-red-600 shrink-0">
              <Cookie className="size-4" />
            </div>
            <h3 className="font-semibold text-xs sm:text-sm text-gray-900 leading-tight">
              Cookie Preferences
            </h3>
          </div>

          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded-md hover:bg-gray-100 cursor-pointer"
            aria-label="Close cookie banner"
          >
            <X className="size-3.5" />
          </button>
        </div>

        <p className="text-[11px] sm:text-xs text-gray-600 leading-snug mb-3">
          We use cookies to improve your browsing experience and analyze site traffic.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAccept}
            className="flex-1 bg-gray-900 hover:bg-black text-white font-medium text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-center"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-xs py-1.5 px-3 rounded-lg transition-colors cursor-pointer text-center"
          >
            Decline
          </button>
        </div>
      </div>
    </aside>
  );
}
