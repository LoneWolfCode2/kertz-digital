"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/** Fires the lead conversion once when the thank-you page loads. */
export function LeadCreated() {
  useEffect(() => {
    track("lead_created");
  }, []);
  return null;
}
