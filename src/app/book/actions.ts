"use server";

import { redirect } from "next/navigation";
import { deliverLead, type LeadField, leadSchema } from "@/lib/leads";

export type LeadFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Partial<Record<LeadField, string>>;
  /** Echo values back so a failed submit doesn't wipe the form. */
  values?: Record<string, string>;
};

/** Humans take longer than this to fill in the form; most bots don't. */
const MIN_FILL_MS = 2500;

export async function submitLead(
  _prev: LeadFormState,
  formData: FormData,
): Promise<LeadFormState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;

  // Spam checks: a hidden honeypot field, and a minimum fill time. Either
  // trips silently to the thank-you page so bots learn nothing.
  const startedAt = Number(raw.startedAt);
  if (
    raw.company_website ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_FILL_MS
  ) {
    redirect("/thanks");
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: LeadFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as LeadField;
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "A couple of things need fixing.",
      fieldErrors,
      values: raw,
    };
  }

  const ok = await deliverLead(parsed.data);
  if (!ok) {
    return {
      status: "error",
      message:
        "Something went wrong on our end and your request didn't send. Please call us instead.",
      values: raw,
    };
  }

  redirect("/thanks");
}
