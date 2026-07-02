// app/lib/analytics.ts

type ShareNetwork = "copy_link" | "linkedin" | "twitter" | "whatsapp";

interface ShareEventProps {
  method: ShareNetwork;
  talentSlug: string;
  talentName: string;
}
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
/**
 * Dispatches a standard conversion/engagement event to GA4 when a user shares a talent profile.
 * Ensures data stripping to strictly comply with zero-PII requirements.
 */
export const trackProfileShared = ({ method, talentSlug, talentName }: ShareEventProps) => {
  if (typeof window !== "undefined" && window.gtag && process.env.NODE_ENV === "production") {
    window.gtag("event", "share", {
      method: method, // e.g., 'linkedin'
      content_type: "talent_profile",
      item_id: talentSlug, // Uses technical alphanumeric identifier instead of user accounts
      content_name: talentName,
    });
  } else {
    // Helpful log for debugging your events locally without polluting live GA dashboards
    console.log(`[Analytics Debug] Profile shared event logged:`, { method, talentSlug, talentName });
  }
};