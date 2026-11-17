// Server-side client for the self-hosted booking server (Easy!Appointments,
// see the kertz-booking repo). The API token never reaches the browser.
//
//   BOOKING_API_URL    https://book.kertzdigital.com (or the sslip.io address)
//   BOOKING_API_TOKEN  Booking admin → Settings → API → API token
//
// Rate limits: the booking server allows ~100 requests per 2 minutes per IP,
// and every visitor reaches it from Vercel's IPs. Availability is therefore
// cached for a minute, and only the booking step makes live calls.

import "server-only";
import { cacheLife, cacheTag } from "next/cache";

const API_URL = process.env.BOOKING_API_URL?.replace(/\/$/, "");
const API_TOKEN = process.env.BOOKING_API_TOKEN;

/** Show the on-site scheduler only when the booking server is configured. */
export const schedulerEnabled = Boolean(API_URL && API_TOKEN);

/** All times are in the provider's time zone (set in booking.json). */
export const SCHEDULER_TZ_LABEL = "Central Time";

/**
 * Calendar days ahead to offer. Each day is one cached API call per minute at
 * most, so 14 days stays far below the server's rate limit.
 */
const DAYS_AHEAD = 14;

class SchedulerError extends Error {}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  if (!API_URL || !API_TOKEN)
    throw new SchedulerError("Scheduler not configured");
  const res = await fetch(`${API_URL}/index.php/api/v1${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...init?.headers,
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new SchedulerError(
      `${init?.method ?? "GET"} ${path} → ${res.status} ${body.slice(0, 300)}`,
    );
  }
  return (await res.json()) as T;
}

type Service = {
  id: number;
  name: string;
  duration: number;
  location?: string;
  isPrivate?: boolean;
};
type Provider = { id: number; services: number[]; isPrivate?: boolean };

export type SchedulerConfig = {
  serviceId: number;
  providerId: number;
  serviceName: string;
  duration: number;
  location: string;
};

/** The bookable service + provider. Discovered once an hour. */
export async function getSchedulerConfig(): Promise<SchedulerConfig> {
  "use cache";
  cacheLife("hours");
  const services = await api<Service[]>("/services?length=50");
  const service =
    services.find((s) => String(s.id) === process.env.BOOKING_SERVICE_ID) ??
    services.find((s) => !s.isPrivate);
  if (!service)
    throw new SchedulerError("No public service on the booking server");
  const providers = await api<Provider[]>("/providers?length=50");
  const provider = providers.find(
    (p) => !p.isPrivate && p.services.map(Number).includes(Number(service.id)),
  );
  if (!provider)
    throw new SchedulerError(`No provider offers service #${service.id}`);
  return {
    serviceId: Number(service.id),
    providerId: Number(provider.id),
    serviceName: service.name,
    duration: Number(service.duration),
    location: service.location ?? "",
  };
}

/** Open start times ("HH:MM") for one day. Uncached: used to re-check before booking. */
async function fetchDay(date: string): Promise<string[]> {
  const c = await getSchedulerConfig();
  const q = new URLSearchParams({
    providerId: String(c.providerId),
    serviceId: String(c.serviceId),
    date,
  });
  return api<string[]>(`/availabilities?${q}`);
}

/** Cache tag for one day's availability, so a booking can refresh it. */
export const dayTag = (date: string) => `scheduler-day-${date}`;

async function cachedDay(date: string): Promise<string[]> {
  "use cache";
  cacheLife({ stale: 30, revalidate: 60, expire: 300 });
  cacheTag(dayTag(date));
  return fetchDay(date);
}

/** Today's date in the provider's time zone, as YYYY-MM-DD. */
function todayInTz() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
  }).format(new Date());
}

function addDays(ymd: string, n: number) {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

export type OpenDay = { date: string; slots: string[] };

/** Days in the next two weeks that have at least one open time. */
export async function getOpenDays(): Promise<OpenDay[]> {
  const start = todayInTz();
  const dates = Array.from({ length: DAYS_AHEAD }, (_, i) => addDays(start, i));
  const results = await Promise.all(
    dates.map(async (date) => ({ date, slots: await cachedDay(date) })),
  );
  return results.filter((d) => d.slots.length > 0);
}

type Customer = { id: number; email: string };

export type BookingInput = {
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  business: string;
  trade: string;
  notes: string;
  smsConsent: boolean;
};

export type BookingResult =
  | { ok: true; start: string }
  | { ok: false; reason: "taken" | "error" };

export async function bookAppointment(
  input: BookingInput,
): Promise<BookingResult> {
  try {
    const c = await getSchedulerConfig();

    // Live re-check: the cached list can be up to a minute old.
    const open = await fetchDay(input.date);
    if (!open.includes(input.time)) return { ok: false, reason: "taken" };

    // Reuse the customer record if this email has booked before.
    const email = input.email.toLowerCase();
    const matches = await api<Customer[]>(
      `/customers?q=${encodeURIComponent(email)}&length=10`,
    );
    const customerBody = {
      firstName: input.firstName,
      lastName: input.lastName,
      email,
      phone: input.phone,
      timezone: "America/Chicago",
      language: "english",
      customField1: input.business,
      customField2: input.trade,
      // Read by the comms bot. Only "yes" is ever written, with the date, as
      // a record of consent; a later booking without the box never erases it.
      ...(input.smsConsent && {
        customField3: `SMS consent: yes (kertzdigital.com booking form, ${new Date().toISOString().slice(0, 10)})`,
      }),
    };
    const existing = matches.find((m) => m.email?.toLowerCase() === email);
    const customer = existing
      ? await api<Customer>(`/customers/${existing.id}`, {
          method: "PUT",
          body: JSON.stringify(customerBody),
        })
      : await api<Customer>("/customers", {
          method: "POST",
          body: JSON.stringify(customerBody),
        });

    const start = `${input.date} ${input.time}:00`;
    const endDate = new Date(`${input.date}T${input.time}:00Z`);
    endDate.setUTCMinutes(endDate.getUTCMinutes() + c.duration);
    const end = endDate.toISOString().replace("T", " ").slice(0, 19);

    await api("/appointments", {
      method: "POST",
      body: JSON.stringify({
        start,
        end,
        status: "Booked",
        location: c.location,
        notes: [input.notes, "Booked on kertzdigital.com"]
          .filter(Boolean)
          .join("\n\n"),
        customerId: Number(customer.id),
        providerId: c.providerId,
        serviceId: c.serviceId,
      }),
    });
    return { ok: true, start: `${input.date}T${input.time}` };
  } catch (err) {
    console.error("[scheduler]", err);
    return { ok: false, reason: "error" };
  }
}
