// app/lib/analytics.ts

type ShareNetwork = "copy_link" | "linkedin" | "twitter" | "whatsapp" | "native_share" | "modal_open";

interface ShareEventProps {
  method: ShareNetwork;
  talentSlug: string;
  talentName: string;
}

export const trackProfileShared = ({ method, talentSlug, talentName }: ShareEventProps) => {
  if (typeof window !== "undefined" && window.gtag && process.env.NODE_ENV === "production") {
    window.gtag("event", "share", {
      method: method,
      content_type: "talent_profile",
      item_id: talentSlug,
      content_name: talentName,
    });
  } else {
    console.log(`[Analytics Debug] Event fired (${method}):`, { talentSlug, talentName });
  }
};