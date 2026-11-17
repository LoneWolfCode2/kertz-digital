"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  bookSlot,
  loadOpenDays,
  type ScheduleFormState,
} from "@/app/book/schedule-actions";
import { control, Field, TRADES } from "@/components/booking-form";
import { SmsConsent } from "@/components/sms-consent";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import type { OpenDay } from "@/lib/scheduler";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

/** "2026-11-19" → { dow: "Thu", short: "Nov 19", long: "Thursday, Nov 19" } (no TZ drift) */
function dayLabel(ymd: string) {
  const d = new Date(`${ymd}T12:00:00Z`);
  const f = (o: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...o }).format(d);
  return {
    dow: f({ weekday: "short" }),
    short: f({ month: "short", day: "numeric" }),
    long: f({ weekday: "long", month: "short", day: "numeric" }),
  };
}

/** "13:30" → "1:30 pm" */
export function timeLabel(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "am" : "pm"}`;
}

const SKELETON_DAYS = ["d1", "d2", "d3", "d4", "d5"];
const SKELETON_SLOTS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"];

const initial: ScheduleFormState = { status: "idle" };

export function Scheduler({ tzLabel }: { tzLabel: string }) {
  const [days, setDays] = useState<OpenDay[] | null>(null);
  const [duration, setDuration] = useState(20);
  const [failed, setFailed] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [startedAt, setStartedAt] = useState("");
  const [loading, startLoading] = useTransition();
  const [state, action, pending] = useActionState(bookSlot, initial);
  const timesRef = useRef<HTMLFieldSetElement>(null);
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};

  const refresh = (keepDate?: string) =>
    startLoading(async () => {
      const res = await loadOpenDays();
      if (!res.ok) {
        setFailed(true);
        return;
      }
      setDays(res.days);
      setDuration(res.duration);
      const pick = res.days.find((d) => d.date === keepDate) ?? res.days[0];
      setDate(pick?.date ?? "");
    });

  // biome-ignore lint/correctness/useExhaustiveDependencies: load once on mount
  useEffect(() => {
    setStartedAt(String(Date.now()));
    refresh();
  }, []);

  // Slot taken by someone else: reload and keep the visitor on the same day.
  // biome-ignore lint/correctness/useExhaustiveDependencies: react to new results only
  useEffect(() => {
    if (state.status === "taken") {
      setTime("");
      refresh(date);
      timesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (state.status !== "idle")
      track("schedule_error", { kind: state.status });
  }, [state]);

  if (failed || (days && days.length === 0)) {
    return (
      <p className="text-pretty text-muted-foreground">
        {failed
          ? "Online booking is taking a break."
          : "No open times in the next two weeks."}{" "}
        Use the form below and we&apos;ll find a time, or call{" "}
        <a
          href={site.phone.href}
          className="font-mono text-foreground underline"
        >
          {site.phone.display}
        </a>
        .
      </p>
    );
  }

  if (!days) {
    return (
      <output aria-busy className="block space-y-4">
        <span className="sr-only">Loading open times…</span>
        <div className="flex gap-2 overflow-hidden">
          {SKELETON_DAYS.map((k) => (
            <div
              key={k}
              className="h-16 w-20 shrink-0 animate-pulse border border-border bg-muted"
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {SKELETON_SLOTS.map((k) => (
            <div
              key={k}
              className="h-11 animate-pulse border border-border bg-muted"
            />
          ))}
        </div>
      </output>
    );
  }

  const day = days.find((d) => d.date === date);

  return (
    <form
      action={action}
      onSubmit={() => track("schedule_submit")}
      noValidate
      className="space-y-8"
    >
      {/* 01 Day */}
      <fieldset className="min-w-0">
        <legend className="label-mono text-muted-foreground">
          01 / Pick a day
        </legend>
        <div className="-mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-2">
          {days.map((d) => {
            const l = dayLabel(d.date);
            const selected = d.date === date;
            return (
              <button
                key={d.date}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setDate(d.date);
                  setTime("");
                }}
                className={cn(
                  "flex w-20 shrink-0 flex-col items-center border px-2 py-2.5 transition-colors",
                  selected
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground",
                )}
              >
                <span className="label-mono">{l.dow}</span>
                <span className="mt-0.5 font-semibold">{l.short}</span>
                <span
                  className={cn(
                    "mt-0.5 font-mono text-[11px]",
                    selected ? "text-background/70" : "text-muted-foreground",
                  )}
                >
                  {d.slots.length} open
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* 02 Time */}
      <fieldset
        ref={timesRef}
        aria-busy={loading}
        className="min-w-0 scroll-mt-24"
      >
        <legend className="label-mono text-muted-foreground">
          02 / Pick a time <span className="normal-case">({tzLabel})</span>
        </legend>
        {state.status === "taken" && (
          <p
            role="alert"
            className="mt-3 border border-destructive bg-destructive/5 p-3 text-sm"
          >
            {state.message}
          </p>
        )}
        <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {day?.slots.map((t) => (
            <button
              key={t}
              type="button"
              aria-pressed={t === time}
              onClick={() => setTime(t)}
              className={cn(
                "h-11 border font-mono text-sm transition-colors",
                t === time
                  ? "border-foreground bg-caution text-caution-foreground"
                  : "border-border hover:border-foreground",
              )}
            >
              {timeLabel(t)}
            </button>
          ))}
        </div>
        {e.time && !time && (
          <p className="mt-2 text-sm text-destructive">{e.time}</p>
        )}
      </fieldset>

      {/* 03 Details: shown once a time is picked */}
      {time && (
        <fieldset className="min-w-0 space-y-5">
          <legend className="label-mono text-muted-foreground">
            03 / Your details
          </legend>
          <p className="border border-dashed border-foreground/40 p-3 text-sm">
            <span className="font-semibold">{dayLabel(date).long}</span> at{" "}
            <span className="bg-caution px-1 font-mono text-caution-foreground">
              {timeLabel(time)}
            </span>{" "}
            {tzLabel} · {duration} min phone call
          </p>

          {state.status === "error" && state.message && (
            <div
              role="alert"
              className="border border-destructive bg-destructive/5 p-4 text-sm"
            >
              {state.message}
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="First name" name="firstName" error={e.firstName}>
              {(p) => (
                <input
                  {...p}
                  autoComplete="given-name"
                  required
                  defaultValue={v.firstName}
                  className={cn(control, "h-11")}
                />
              )}
            </Field>
            <Field label="Last name" name="lastName" error={e.lastName}>
              {(p) => (
                <input
                  {...p}
                  autoComplete="family-name"
                  required
                  defaultValue={v.lastName}
                  className={cn(control, "h-11")}
                />
              )}
            </Field>
            <Field
              label="Phone"
              name="phone"
              error={e.phone}
              hint="We'll call you on this number."
            >
              {(p) => (
                <input
                  {...p}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  defaultValue={v.phone}
                  className={cn(control, "h-11 font-mono")}
                />
              )}
            </Field>
            <Field
              label="Email"
              name="email"
              error={e.email}
              hint="Your confirmation goes here."
            >
              {(p) => (
                <input
                  {...p}
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={v.email}
                  className={cn(control, "h-11")}
                />
              )}
            </Field>
            <Field label="Business name" name="business" optional>
              {(p) => (
                <input
                  {...p}
                  autoComplete="organization"
                  defaultValue={v.business}
                  className={cn(control, "h-11")}
                />
              )}
            </Field>
            <Field label="Your trade" name="trade" error={e.trade}>
              {(p) => (
                <select
                  {...p}
                  required
                  defaultValue={v.trade ?? ""}
                  className={cn(control, "h-11")}
                >
                  <option value="" disabled>
                    Choose one
                  </option>
                  {TRADES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          <Field label="Anything we should know?" name="notes" optional>
            {(p) => (
              <textarea
                {...p}
                rows={3}
                defaultValue={v.notes}
                className={cn(control, "py-2.5")}
              />
            )}
          </Field>

          <SmsConsent defaultChecked={v.smsConsent === "yes"} />

          {/* Honeypot + timing, same as the request form */}
          <div
            aria-hidden
            className="absolute -left-[9999px] h-px w-px overflow-hidden"
          >
            <label>
              Company website
              <input name="company_website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <input type="hidden" name="startedAt" value={startedAt} />
          <input type="hidden" name="date" value={date} />
          <input type="hidden" name="time" value={time} />

          <button
            type="submit"
            disabled={pending}
            className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
          >
            {pending ? "Booking…" : "Book my call"}
          </button>
          <p className="text-sm text-muted-foreground">
            You&apos;ll get a confirmation email with a link to reschedule or
            cancel.
          </p>
        </fieldset>
      )}
    </form>
  );
}
