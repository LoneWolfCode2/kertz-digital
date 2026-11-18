// Lead intake: validation + delivery for the booking form.
//
// Every lead goes to up to two places, both configured with env vars
// (see .env.example):
//   1. Email via Resend (RESEND_API_KEY, LEAD_EMAIL_TO, LEAD_EMAIL_FROM)
//   2. A webhook for the communications bot (COMMS_WEBHOOK_URL), signed with
//      HMAC-SHA256 so the bot can verify the request came from this site
//      (COMMS_WEBHOOK_SECRET).
// A lead counts as delivered if at least one channel accepts it. If none is
// configured or all fail, the visitor is told to call instead, so a lead is
// never silently lost.

import "server-only";
import { createHmac } from "node:crypto";
import { z } from "zod";
import { site } from "@/content/site";

export const TRADES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest control",
  "Other",
] as const;

export const INTERESTS = [
  "Getting found on Google",
  "A new website",
  "Never missing a call",
  "Not sure yet",
] as const;

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  business: z.string().trim().max(120).optional().default(""),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v.replace(/\D/g, "").length >= 10,
      "Please enter a 10-digit phone number.",
    ),
  email: z
    .string()
    .trim()
    .max(200)
    .refine(
      (v) => v === "" || z.email().safeParse(v).success,
      "That email doesn't look right.",
    )
    .optional()
    .default(""),
  trade: z.enum(TRADES, { error: "Pick the closest match." }),
  interest: z.enum(INTERESTS).optional().default("Not sure yet"),
  message: z.string().trim().max(2000).optional().default(""),
  /** Annual estimate carried over from the missed-lead calculator. */
  estimate: z.string().trim().max(40).optional().default(""),
  /** Optional SMS opt-in checkbox ("yes" when checked). */
  smsConsent: z
    .enum(["yes"])
    .optional()
    .transform((v) => v === "yes"),
  /** Page the visitor came from, for attribution. */
  source: z.string().trim().max(200).optional().default(""),
});

export type Lead = z.infer<typeof leadSchema>;
export type LeadField = keyof Lead;

export type LeadEnvelope = {
  type: "lead.created";
  id: string;
  receivedAt: string;
  site: string;
  lead: Lead;
};

export function envelope(lead: Lead): LeadEnvelope {
  return {
    type: "lead.created",
    id: crypto.randomUUID(),
    receivedAt: new Date().toISOString(),
    site: site.name,
    lead,
  };
}

const esc = (s: string) =>
  s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ] as string,
  );

function emailBody(e: LeadEnvelope) {
  const l = e.lead;
  const rows: [string, string][] = [
    ["Name", l.name],
    ["Business", l.business],
    ["Phone", l.phone],
    ["Email", l.email],
    ["Trade", l.trade],
    ["Wants help with", l.interest],
    ["Calculator estimate", l.estimate],
    ["Came from", l.source],
    ["Message", l.message],
    ["OK to text", l.smsConsent ? "Yes" : "No"],
  ].filter(([, v]) => v) as [string, string][];
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#666;vertical-align:top">${esc(k)}</td><td>${esc(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table><p style="color:#999;font-size:12px">Lead ${e.id}</p>`;
  return { text, html };
}

async function sendEmail(e: LeadEnvelope, subject?: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL_TO;
  if (!key || !to) return false;
  const from =
    process.env.LEAD_EMAIL_FROM || `${site.name} <onboarding@resend.dev>`;
  const { text, html } = emailBody(e);
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      "Idempotency-Key": e.id,
    },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      ...(e.lead.email && { reply_to: e.lead.email }),
      subject: subject ?? `New lead: ${e.lead.name} (${e.lead.trade})`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok)
    console.error("[leads] Resend failed", res.status, await res.text());
  return res.ok;
}

async function sendWebhook(e: LeadEnvelope): Promise<boolean> {
  const url = process.env.COMMS_WEBHOOK_URL;
  if (!url) return false;
  const body = JSON.stringify(e);
  const secret = process.env.COMMS_WEBHOOK_SECRET;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "X-Kertz-Timestamp": timestamp,
  };
  if (secret) {
    // Bot verifies: HMAC_SHA256(secret, `${timestamp}.${rawBody}`)
    headers["X-Kertz-Signature"] = `sha256=${createHmac("sha256", secret)
      .update(`${timestamp}.${body}`)
      .digest("hex")}`;
  }
  const res = await fetch(url, {
    method: "POST",
    headers,
    body,
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) console.error("[leads] Webhook failed", res.status);
  return res.ok;
}

/**
 * Returns true if at least one channel accepted the lead.
 * `subject` overrides the email subject (e.g. for directory requests).
 */
export async function deliverLead(
  lead: Lead,
  opts: { subject?: string } = {},
): Promise<boolean> {
  const e = envelope(lead);
  const results = await Promise.allSettled([
    sendEmail(e, opts.subject),
    sendWebhook(e),
  ]);
  for (const r of results) {
    if (r.status === "rejected") console.error("[leads]", r.reason);
  }
  const delivered = results.some((r) => r.status === "fulfilled" && r.value);
  if (!delivered && process.env.NODE_ENV !== "production") {
    // Local dev with nothing configured: log it so the form can be tested.
    console.info("[leads] (dev, no channel configured)", e);
    return true;
  }
  return delivered;
}
