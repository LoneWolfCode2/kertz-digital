// Conversion events, sent to Vercel Web Analytics and, if configured, GA4.
// Vercel custom events need a Pro plan; on Hobby the call is a harmless
// no-op. GA4 is free: set NEXT_PUBLIC_GA_ID to turn it on.

import { track as vercelTrack } from "@vercel/analytics";

export type ConversionEvent =
  | "call_click"
  | "book_click"
  | "lead_form_submit"
  | "lead_form_error"
  | "lead_created"
  | "calculator_used";

type Props = Record<string, string | number | boolean | null>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: ConversionEvent, props?: Props) {
  try {
    vercelTrack(event, props);
    window.gtag?.("event", event, props);
  } catch {
    // Analytics must never break the page.
  }
}
