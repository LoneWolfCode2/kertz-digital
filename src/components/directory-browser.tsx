"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { control } from "@/components/booking-form";
import type { Listing } from "@/lib/directory";
import { cn } from "@/lib/utils";

const ALL = "";

export function DirectoryBrowser({
  listings,
  trades,
}: {
  listings: Listing[];
  trades: string[];
}) {
  const [query, setQuery] = useState("");
  const [trade, setTrade] = useState(ALL);
  const [city, setCity] = useState(ALL);
  const ids = { q: useId(), city: useId() };

  const cities = useMemo(
    () => [...new Set(listings.flatMap((l) => l.cities))].sort(),
    [listings],
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return listings.filter(
      (l) =>
        (!trade || l.trades.includes(trade)) &&
        (!city || l.cities.includes(city)) &&
        (!q ||
          [l.name, ...l.trades, l.description ?? "", ...l.services]
            .join(" ")
            .toLowerCase()
            .includes(q)),
    );
  }, [listings, query, trade, city]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-[2fr_1fr]">
        <div>
          <label htmlFor={ids.q} className="text-sm font-semibold">
            What do you need?
          </label>
          <input
            id={ids.q}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. water heater, roof leak, panel upgrade"
            className={cn(control, "mt-1.5 h-12")}
          />
        </div>
        <div>
          <label htmlFor={ids.city} className="text-sm font-semibold">
            City
          </label>
          <select
            id={ids.city}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={cn(control, "mt-1.5 h-12")}
          >
            <option value={ALL}>All Austin area</option>
            {cities.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="mt-6 min-w-0">
        <legend className="sr-only">Filter by trade</legend>
        <div className="flex flex-wrap gap-2">
          {[ALL, ...trades].map((t) => (
            <button
              key={t || "all"}
              type="button"
              aria-pressed={trade === t}
              onClick={() => setTrade(t)}
              className={cn(
                "min-h-11 border px-4 text-sm transition-colors",
                trade === t
                  ? "border-foreground bg-foreground font-semibold text-background"
                  : "border-border bg-card hover:border-foreground",
              )}
            >
              {t || "All trades"}
            </button>
          ))}
        </div>
      </fieldset>

      <p aria-live="polite" className="label-mono mt-8 text-muted-foreground">
        {shown.length} {shown.length === 1 ? "business" : "businesses"}
      </p>

      {shown.length > 0 ? (
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {shown.map((l) => (
            <li
              key={l.slug}
              className="flex min-w-0 flex-col gap-3 border border-border bg-card p-6"
            >
              <p className="label-mono text-muted-foreground">
                {l.trades.join(" · ")}
              </p>
              <h2 className="font-display text-lg">{l.name}</h2>
              {l.description && (
                <p className="text-sm text-muted-foreground text-pretty">
                  {l.description}
                </p>
              )}
              {l.services.length > 0 && (
                <p className="text-sm">{l.services.join(" · ")}</p>
              )}
              <p className="text-sm text-muted-foreground">
                {l.cities.join(" · ")}
                {l.hours && <span className="block">{l.hours}</span>}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-sm">
                <a
                  href={l.phoneHref}
                  className="font-mono font-semibold underline-offset-4 hover:underline"
                >
                  {l.phone}
                </a>
                {l.website && (
                  <a
                    href={l.website}
                    target="_blank"
                    rel="noopener nofollow"
                    className="underline-offset-4 hover:underline"
                  >
                    Website
                  </a>
                )}
                {l.googleUrl && (
                  <a
                    href={l.googleUrl}
                    target="_blank"
                    rel="noopener nofollow"
                    className="underline-offset-4 hover:underline"
                  >
                    Google reviews
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 border border-dashed border-foreground/40 p-6 text-sm">
          No matches yet. Try another trade or city, or{" "}
          <Link
            href="/directory/list-your-business"
            className="underline underline-offset-4"
          >
            suggest a business
          </Link>
          .
        </p>
      )}
    </div>
  );
}
