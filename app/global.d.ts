// global.d.ts
export {};

declare global {
  interface Window {
    gtag?: (
      command: "config" | "event" | "set" | "js" | "consent",
      targetOrEventName: string | Date,
      additionalParams?: Record<string, unknown>
    ) => void;
  }
}