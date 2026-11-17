"use client";

import { useActionState, useEffect, useId, useState } from "react";
import { type LeadFormState, submitLead } from "@/app/book/actions";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

// Kept in sync with TRADES / INTERESTS in lib/leads.ts (server-only file).
const TRADES = [
  "HVAC",
  "Plumbing",
  "Electrical",
  "Roofing",
  "Landscaping",
  "Pest control",
  "Other",
];
const INTERESTS = [
  "Getting found on Google",
  "A new website",
  "Never missing a call",
  "Not sure yet",
];

const control =
  "w-full rounded-none border border-input bg-background px-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:ring-2 focus-visible:ring-ring/40 aria-invalid:border-destructive";

function Field({
  label,
  name,
  error,
  hint,
  optional,
  children,
}: {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: (props: {
    id: string;
    name: string;
    "aria-invalid"?: true;
    "aria-describedby"?: string;
  }) => React.ReactNode;
}) {
  const id = useId();
  const msgId = `${id}-msg`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {optional && (
          <span className="ml-2 font-normal text-muted-foreground">
            optional
          </span>
        )}
      </label>
      <div className="mt-1.5">
        {children({
          id,
          name,
          ...(error && { "aria-invalid": true }),
          ...((error || hint) && { "aria-describedby": msgId }),
        })}
      </div>
      {(error || hint) && (
        <p
          id={msgId}
          className={cn(
            "mt-1.5 text-sm",
            error ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}

const initial: LeadFormState = { status: "idle" };

export function BookingForm() {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [startedAt, setStartedAt] = useState("");
  const [estimate, setEstimate] = useState("");
  const [source, setSource] = useState("");
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};

  useEffect(() => {
    setStartedAt(String(Date.now()));
    const params = new URLSearchParams(window.location.search);
    setEstimate(params.get("estimate") ?? "");
    setSource(params.get("from") ?? document.referrer ?? "");
  }, []);

  useEffect(() => {
    if (state.status === "error") track("lead_form_error");
  }, [state]);

  return (
    <form
      action={action}
      onSubmit={() => track("lead_form_submit")}
      noValidate
      className="space-y-5"
    >
      {state.status === "error" && state.message && (
        <div
          role="alert"
          className="border border-destructive bg-destructive/5 p-4 text-sm"
        >
          {state.message}{" "}
          {!state.fieldErrors && (
            <a href={site.phone.href} className="font-mono underline">
              {site.phone.display}
            </a>
          )}
        </div>
      )}

      {estimate && (
        <p className="border border-dashed border-foreground/40 p-4 text-sm">
          Your calculator estimate:{" "}
          <span className="bg-caution px-1 font-mono text-caution-foreground">
            {estimate}
          </span>{" "}
          a year in missed calls. We&apos;ll bring it to the call.
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" error={e.name}>
          {(p) => (
            <input
              {...p}
              autoComplete="name"
              required
              defaultValue={v.name}
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
        <Field
          label="Phone"
          name="phone"
          error={e.phone}
          hint="We'll call or text, whichever you prefer."
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
        <Field label="Email" name="email" error={e.email} optional>
          {(p) => (
            <input
              {...p}
              type="email"
              autoComplete="email"
              defaultValue={v.email}
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
        <Field label="Most want help with" name="interest">
          {(p) => (
            <select
              {...p}
              defaultValue={v.interest ?? "Not sure yet"}
              className={cn(control, "h-11")}
            >
              {INTERESTS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          )}
        </Field>
      </div>

      <Field
        label="Anything we should know?"
        name="message"
        optional
        hint="Best times to reach you, what's not working, your current website."
      >
        {(p) => (
          <textarea
            {...p}
            rows={4}
            defaultValue={v.message}
            className={cn(control, "py-2.5")}
          />
        )}
      </Field>

      {/* Honeypot: hidden from people and screen readers; bots fill it in. */}
      <div
        aria-hidden
        className="absolute left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />
      <input type="hidden" name="estimate" value={estimate} />
      <input type="hidden" name="source" value={source} />

      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
      >
        {pending ? "Sending…" : "Request my call"}
      </button>
      <p className="text-sm text-muted-foreground">
        We reply within one business day. No spam, no sales sequence.
      </p>
    </form>
  );
}
