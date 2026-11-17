"use server";

import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import {
  bookAppointment,
  dayTag,
  getOpenDays,
  getSchedulerConfig,
  type OpenDay,
} from "@/lib/scheduler";

/** Open days and times for the picker (cached server-side for a minute). */
export async function loadOpenDays(): Promise<
  { ok: true; days: OpenDay[]; duration: number } | { ok: false }
> {
  try {
    const [days, config] = await Promise.all([
      getOpenDays(),
      getSchedulerConfig(),
    ]);
    return { ok: true, days, duration: config.duration };
  } catch (err) {
    console.error("[scheduler] loadOpenDays", err);
    return { ok: false };
  }
}

const bookingSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Pick a day."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Pick a time."),
  firstName: z.string().trim().min(1, "Please enter your first name.").max(60),
  lastName: z.string().trim().min(1, "Please enter your last name.").max(60),
  email: z.email("Please enter a valid email for your confirmation.").max(200),
  phone: z
    .string()
    .trim()
    .refine(
      (v) => v.replace(/\D/g, "").length >= 10,
      "Please enter a 10-digit phone number.",
    ),
  business: z.string().trim().max(120).optional().default(""),
  trade: z.string().trim().min(1, "Pick the closest match.").max(60),
  notes: z.string().trim().max(1000).optional().default(""),
});

export type ScheduleFormState = {
  status: "idle" | "error" | "taken";
  message?: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof bookingSchema>, string>>;
  values?: Record<string, string>;
};

const MIN_FILL_MS = 2500;

export async function bookSlot(
  _prev: ScheduleFormState,
  formData: FormData,
): Promise<ScheduleFormState> {
  const raw = Object.fromEntries(
    [...formData.entries()].filter(([, v]) => typeof v === "string"),
  ) as Record<string, string>;

  // Same bot traps as the request form: honeypot + minimum fill time.
  const startedAt = Number(raw.startedAt);
  if (
    raw.company_website ||
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_FILL_MS
  ) {
    redirect("/thanks");
  }

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: ScheduleFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof typeof fieldErrors;
      fieldErrors[key] ??= issue.message;
    }
    return {
      status: "error",
      message: "A couple of things need fixing.",
      fieldErrors,
      values: raw,
    };
  }

  const result = await bookAppointment(parsed.data);
  // Booked or just taken: either way this day's cached times are now stale.
  if (result.ok || result.reason === "taken")
    updateTag(dayTag(parsed.data.date));
  if (!result.ok) {
    return result.reason === "taken"
      ? {
          status: "taken",
          message: "Someone just grabbed that time. Please pick another one.",
          values: { ...raw, time: "" },
        }
      : {
          status: "error",
          message:
            "We couldn't book that just now. Please try again, or call us.",
          values: raw,
        };
  }

  redirect(`/thanks?booked=${encodeURIComponent(result.start)}`);
}
