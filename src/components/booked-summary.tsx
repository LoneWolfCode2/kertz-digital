"use client";

import { useEffect, useState } from "react";
import { timeLabel } from "@/components/scheduler";

/** On /thanks?booked=2026-11-19T10:30, shows the booked day and time. */
export function BookedSummary() {
  const [booked, setBooked] = useState<{ day: string; time: string } | null>(
    null,
  );

  useEffect(() => {
    const raw = new URLSearchParams(window.location.search).get("booked") ?? "";
    const m = raw.match(/^(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2})$/);
    if (!m) return;
    const day = new Intl.DateTimeFormat("en-US", {
      timeZone: "UTC",
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(new Date(`${m[1]}T12:00:00Z`));
    setBooked({ day, time: timeLabel(m[2]) });
  }, []);

  if (!booked) return null;
  return (
    <p className="mt-6 inline-block border border-foreground bg-card px-4 py-3 text-lg">
      You&apos;re booked: <span className="font-semibold">{booked.day}</span> at{" "}
      <span className="bg-caution px-1 font-mono text-caution-foreground">
        {booked.time}
      </span>{" "}
      Central Time.
    </p>
  );
}
