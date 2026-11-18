"use server";

import { z } from "zod";
import { type ListingRequest, REQUESTS } from "@/lib/directory-requests";
import { deliverLead, TRADES } from "@/lib/leads";

const ROLES = ["Owner", "Manager", "Employee", "Other"] as const;

const schema = z.object({
  request: z.enum(REQUESTS, { error: "Pick what you need." }),
  business: z
    .string()
    .trim()
    .min(2, "Please enter the business name.")
    .max(120),
  trade: z.enum(TRADES, { error: "Pick the closest match." }),
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  role: z.enum(ROLES).optional().default("Owner"),
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
  website: z.string().trim().max(200).optional().default(""),
  cities: z.string().trim().max(300).optional().default(""),
  services: z.string().trim().max(500).optional().default(""),
  hours: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(2000).optional().default(""),
});

type Field = keyof z.infer<typeof schema>;

export type ListingRequestState = {
  status: "idle" | "error" | "sent";
  request?: ListingRequest;
  message?: string;
  fieldErrors?: Partial<Record<Field, string>>;
  values?: Record<string, string>;
};

const MIN_FILL_MS = 2500;

export async function submitListingRequest(
  _prev: ListingRequestState,
  formData: FormData,
): Promise<ListingRequestState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;

  // Same spam checks as the booking form; bots get a fake success.
  const startedAt = Number(raw.startedAt);
  if (
    raw.company_website ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_FILL_MS
  ) {
    return { status: "sent", request: "Add my business" };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ListingRequestState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as Field;
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "A couple of things need fixing.",
      fieldErrors,
      values: raw,
    };
  }

  const d = parsed.data;
  const details = [
    `DIRECTORY REQUEST: ${d.request}`,
    `Submitted by: ${d.name} (${d.role})`,
    d.website && `Website: ${d.website}`,
    d.cities && `Cities served: ${d.cities}`,
    d.services && `Services: ${d.services}`,
    d.hours && `Hours: ${d.hours}`,
    d.message && `Notes: ${d.message}`,
  ]
    .filter(Boolean)
    .join("\n");

  const ok = await deliverLead(
    {
      name: d.name,
      business: d.business,
      phone: d.phone,
      email: d.email,
      trade: d.trade,
      interest: "Not sure yet",
      message: details,
      estimate: "",
      smsConsent: false,
      source: `Directory: ${d.request}`,
    },
    { subject: `Directory: ${d.request}: ${d.business}` },
  );
  if (!ok) {
    return {
      status: "error",
      message:
        "Something went wrong on our end and your request didn't send. Please call us instead.",
      values: raw,
    };
  }
  return { status: "sent", request: d.request };
}
