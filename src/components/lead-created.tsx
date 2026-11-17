"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Fires the conversion once when the thank-you page loads: a booked
 * appointment (?booked=YYYY-MM-DDTHH:MM) or a call-me-back request.
 */
export function LeadCreated() {
  useEffect(() => {
    const booked = new URLSearchParams(window.location.search).get("booked");
    track(booked ? "appointment_booked" : "lead_created");
  }, []);
  return null;
}
