"use client";

import Link from "next/link";
import { useActionState, useEffect, useState } from "react";
import {
  type ListingRequestState,
  submitListingRequest,
} from "@/app/directory/list-your-business/actions";
import { control, Field, TRADES } from "@/components/booking-form";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { REQUESTS } from "@/lib/directory-requests";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

const ROLES = ["Owner", "Manager", "Employee", "Other"];
const initial: ListingRequestState = { status: "idle" };

export function ListingRequestForm() {
  const [state, action, pending] = useActionState(
    submitListingRequest,
    initial,
  );
  const [startedAt, setStartedAt] = useState("");
  const [request, setRequest] = useState<string>(REQUESTS[0]);
  const e = state.fieldErrors ?? {};
  const v = state.values ?? {};
  const removing = request === "Remove my listing";

  useEffect(() => setStartedAt(String(Date.now())), []);
  useEffect(() => {
    if (state.status === "sent") track("directory_request_sent");
  }, [state.status]);

  if (state.status === "sent") {
    return (
      <output className="block border border-foreground bg-card p-8">
        <p className="label-mono text-muted-foreground">Request received</p>
        <h2 className="font-display text-xl mt-3">
          Thanks, we&apos;ve got it.
        </h2>
        <p className="mt-3 text-muted-foreground text-pretty">
          {state.request === "Remove my listing"
            ? "We'll remove the listing within one business day and confirm by phone or email."
            : "We review every request by hand to make sure the business is real and local. Expect to hear from us within a few days."}
        </p>
        <Link
          href="/directory"
          className={buttonVariants({ variant: "outline", className: "mt-6" })}
        >
          Back to the directory
        </Link>
      </output>
    );
  }

  return (
    <form action={action} noValidate className="space-y-5">
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

      <fieldset className="min-w-0">
        <legend className="text-sm font-semibold">What do you need?</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {REQUESTS.map((r) => (
            <label
              key={r}
              className={cn(
                "flex min-h-11 cursor-pointer items-center gap-2 border px-4 text-sm",
                request === r
                  ? "border-foreground bg-card font-semibold"
                  : "border-border",
              )}
            >
              <input
                type="radio"
                name="request"
                value={r}
                checked={request === r}
                onChange={() => setRequest(r)}
                className="accent-foreground"
              />
              {r}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Business name" name="business" error={e.business}>
          {(p) => (
            <input
              {...p}
              autoComplete="organization"
              required
              defaultValue={v.business}
              className={cn(control, "h-11")}
            />
          )}
        </Field>
        <Field label="Trade" name="trade" error={e.trade}>
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
        <Field label="Your role" name="role">
          {(p) => (
            <select
              {...p}
              defaultValue={v.role ?? "Owner"}
              className={cn(control, "h-11")}
            >
              {ROLES.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          )}
        </Field>
        <Field
          label="Phone"
          name="phone"
          error={e.phone}
          hint="So we can confirm the request is really from the business."
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
      </div>

      {!removing && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Website" name="website" optional>
            {(p) => (
              <input
                {...p}
                type="url"
                inputMode="url"
                placeholder="https://"
                defaultValue={v.website}
                className={cn(control, "h-11")}
              />
            )}
          </Field>
          <Field
            label="Cities you serve"
            name="cities"
            optional
            hint="e.g. Austin, Round Rock, Pflugerville"
          >
            {(p) => (
              <input
                {...p}
                defaultValue={v.cities}
                className={cn(control, "h-11")}
              />
            )}
          </Field>
          <Field
            label="Main services"
            name="services"
            optional
            hint="Up to 6, e.g. water heaters, drain cleaning"
          >
            {(p) => (
              <input
                {...p}
                defaultValue={v.services}
                className={cn(control, "h-11")}
              />
            )}
          </Field>
          <Field label="Hours" name="hours" optional>
            {(p) => (
              <input
                {...p}
                placeholder="e.g. Mon–Fri 7am–5pm"
                defaultValue={v.hours}
                className={cn(control, "h-11")}
              />
            )}
          </Field>
        </div>
      )}

      <Field
        label={removing ? "Anything we should know?" : "Anything else?"}
        name="message"
        optional
        hint={
          removing
            ? undefined
            : "What you're known for, how long you've served Austin, or what to change."
        }
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
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      >
        <label>
          Company website
          <input name="company_website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt} />

      <button
        type="submit"
        disabled={pending}
        className={cn(buttonVariants({ size: "lg" }), "w-full sm:w-auto")}
      >
        {pending ? "Sending…" : "Send request"}
      </button>
      <p className="text-sm text-muted-foreground">
        Listing is free. We review every request by hand.
      </p>
    </form>
  );
}
