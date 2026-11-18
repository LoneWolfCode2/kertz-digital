"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@/components/ui/button";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

type Item = { id: string; label: string; why: string };

/** In priority order: the first unchecked items become "fix these first". */
const groups: { name: string; items: Item[] }[] = [
  {
    name: "The basics",
    items: [
      {
        id: "category",
        label: "Main category is your main trade",
        why: "The biggest single factor in which searches you show up for.",
      },
      {
        id: "name",
        label: "Business name matches your trucks and invoices",
        why: "Google trusts businesses whose name is the same everywhere.",
      },
      {
        id: "phone",
        label: "Phone number matches your website",
        why: "Mismatched numbers confuse Google and customers.",
      },
      {
        id: "areas",
        label: "Service areas list the cities you actually serve",
        why: "Keeps you in the map results where your customers are.",
      },
      {
        id: "hours",
        label: "Hours are filled in, including holidays",
        why: "A profile without hours can look closed.",
      },
    ],
  },
  {
    name: "Trust",
    items: [
      {
        id: "reviews",
        label: "25 or more Google reviews",
        why: "Customers compare review counts before they call.",
      },
      {
        id: "replies",
        label: "You reply to every review, good and bad",
        why: "Replies show you're active and that you care.",
      },
      {
        id: "photos",
        label: "10 or more real photos: crew, trucks, finished jobs",
        why: "Real photos make your profile look like a real, busy business.",
      },
    ],
  },
  {
    name: "Activity",
    items: [
      {
        id: "site",
        label: "Website link goes to your own site",
        why: "Sends ready-to-call visitors somewhere you control.",
      },
      {
        id: "services",
        label: "Each service listed with a short description",
        why: "Helps you show up for specific jobs, not just your trade.",
      },
      {
        id: "recent",
        label: "Got a new review in the last 30 days",
        why: "Recent reviews tell customers you're still doing great work.",
      },
      {
        id: "posts",
        label: "Posted an update in the last 30 days",
        why: "Recent posts signal an active business.",
      },
    ],
  },
];

const all = groups.flatMap((g) => g.items);

function verdict(score: number) {
  if (score >= 10) return "Strong. Keep the reviews and posts coming.";
  if (score >= 7) return "Solid start. A few fixes will help you show up more.";
  return "Room to grow. The fixes below are the fastest wins.";
}

export function ProfileChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const tracked = useRef(false);
  const score = all.filter((i) => checked[i.id]).length;
  const fixes = all.filter((i) => !checked[i.id]).slice(0, 3);
  const pct = Math.round((score / all.length) * 100);

  useEffect(() => {
    if (score > 0 && !tracked.current) {
      tracked.current = true;
      track("checklist_used");
    }
  }, [score]);

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
      <div className="flex min-w-0 flex-col gap-10 lg:col-span-7">
        {groups.map((g) => (
          <fieldset key={g.name} className="min-w-0">
            <legend className="label-mono text-muted-foreground">
              {g.name}
            </legend>
            <div className="mt-3 border-t border-foreground">
              {g.items.map((it) => (
                <label
                  key={it.id}
                  className="flex min-h-11 cursor-pointer items-start gap-4 border-b border-border px-1 py-4"
                >
                  <input
                    type="checkbox"
                    checked={!!checked[it.id]}
                    onChange={(e) =>
                      setChecked((c) => ({ ...c, [it.id]: e.target.checked }))
                    }
                    className="mt-0.5 size-5 shrink-0 accent-foreground"
                  />
                  <span className="flex flex-col gap-1">
                    <span className="font-semibold">{it.label}</span>
                    <span className="text-sm text-muted-foreground text-pretty">
                      {it.why}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <aside
        aria-label="Your score"
        className="flex min-w-0 flex-col gap-5 border border-foreground bg-card p-7 lg:sticky lg:top-24 lg:col-span-5"
      >
        <p className="label-mono text-muted-foreground">Your score</p>
        <p aria-live="polite" className="font-display text-5xl leading-none">
          {score}
          <span className="text-2xl text-muted-foreground">
            {" "}
            / {all.length}
          </span>
        </p>
        <div aria-hidden className="h-3 border border-border bg-secondary">
          <div
            className="h-full bg-foreground transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>
        <p className="font-semibold">{verdict(score)}</p>
        {fixes.length > 0 && (
          <div>
            <p className="label-mono text-muted-foreground">Fix these first</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
              {fixes.map((f) => (
                <li key={f.id}>{f.label}</li>
              ))}
            </ol>
          </div>
        )}
        <div className="flex flex-col gap-3 border-t border-border pt-5">
          <p className="text-sm text-muted-foreground text-pretty">
            Want it done for you? In a free 20-minute audit I&apos;ll go through
            your profile with you and tell you what I&apos;d fix first.
          </p>
          <Link
            href="/book?from=profile-checklist"
            className={cn(buttonVariants(), "self-start")}
          >
            Book a free audit
          </Link>
        </div>
      </aside>
    </div>
  );
}
