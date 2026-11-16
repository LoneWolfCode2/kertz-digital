"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { AnimatedNumber } from "@/components/motion/animated-number";
import {
  calcLeak,
  DEFAULT_INPUTS,
  type LeakInputs,
  usd,
} from "@/lib/calculator";
import { cn } from "@/lib/utils";
import { SpecCard } from "../spec-card";
import { buttonVariants } from "../ui/button";

type FieldProps = {
  label: string;
  value: number;
  onChange: (n: number) => void;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
};

function Field({
  label,
  value,
  onChange,
  min,
  max,
  step,
  prefix,
  suffix,
}: FieldProps) {
  const id = useId();
  // What the user is typing. Lets the box sit empty or mid-edit without
  // forcing the value to 0; null means "show the committed value".
  const [draft, setDraft] = useState<string | null>(null);
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const commit = () => {
    if (draft !== null) {
      const n = Number(draft);
      if (draft.trim() !== "" && Number.isFinite(n)) onChange(clamp(n));
      setDraft(null);
    }
  };
  const fill = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-sm font-semibold">
          {label}
        </label>
        <div className="flex items-baseline gap-1 font-mono text-base">
          {prefix && (
            <span aria-hidden className="text-muted-foreground">
              {prefix}
            </span>
          )}
          <input
            type="number"
            inputMode="numeric"
            aria-label={`${label}, exact value`}
            value={draft ?? value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => {
              const raw = e.target.value;
              setDraft(raw);
              const n = Number(raw);
              // Live-update results only while the typed value is in range.
              if (
                raw.trim() !== "" &&
                Number.isFinite(n) &&
                n >= min &&
                n <= max
              )
                onChange(n);
            }}
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commit();
              if (e.key === "Escape") setDraft(null);
            }}
            className="w-20 border-b border-input bg-transparent text-right outline-none [appearance:textfield] focus-visible:border-foreground [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          {suffix && (
            <span aria-hidden className="text-muted-foreground">
              {suffix}
            </span>
          )}
        </div>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range-kd"
        style={{ "--fill": `${fill}%` } as React.CSSProperties}
      />
    </div>
  );
}

function Row({
  op,
  label,
  value,
}: {
  op: string;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-1.5">
      <dt className="text-sm text-muted-foreground">
        <span className="inline-block w-5 font-mono">{op}</span>
        {label}
      </dt>
      <dd className="font-mono tabular-nums">{value}</dd>
    </div>
  );
}

export function LeakCalculator() {
  const [inputs, setInputs] = useState<LeakInputs>(DEFAULT_INPUTS);
  const set = (key: keyof LeakInputs) => (n: number) =>
    setInputs((prev) => ({ ...prev, [key]: n }));
  const r = calcLeak(inputs);
  return (
    <SpecCard label="Missed-lead calculator" meta="Fig. 01">
      <div className="space-y-2">
        <Field
          label="Calls per week"
          value={inputs.callsPerWeek}
          onChange={set("callsPerWeek")}
          min={5}
          max={200}
          step={5}
        />
        <Field
          label="Calls you miss"
          value={inputs.missedPct}
          onChange={set("missedPct")}
          min={0}
          max={60}
          step={1}
          suffix="%"
        />
        <Field
          label="Would have booked"
          value={inputs.bookRate}
          onChange={set("bookRate")}
          min={0}
          max={100}
          step={5}
          suffix="%"
        />
        <Field
          label="Average job"
          value={inputs.avgJob}
          onChange={set("avgJob")}
          min={100}
          max={10000}
          step={50}
          prefix="$"
        />
      </div>

      <dl className="mt-6 border-t border-dashed border-foreground/40 pt-4">
        <Row
          op=""
          label="Missed calls / week"
          value={r.missedPerWeek.toFixed(1)}
        />
        <Row op="×" label="Would have booked" value={`${inputs.bookRate}%`} />
        <Row
          op="="
          label="Lost jobs / week"
          value={r.lostJobsPerWeek.toFixed(1)}
        />
        <Row op="" label="Lost per month" value={usd.format(r.lostPerMonth)} />
      </dl>

      <div className="mt-4 border-t border-foreground pt-4">
        <p className="label-mono text-muted-foreground">
          Estimated lost revenue / year
        </p>
        <output className="mt-2 block font-mono text-2xl tabular-nums">
          <AnimatedNumber
            value={r.lostPerYear}
            format={(n) => usd.format(n)}
            className="bg-caution px-1.5 text-caution-foreground"
          />
        </output>
      </div>

      <Link href="/book" className={cn(buttonVariants(), "mt-6 w-full")}>
        Get these calls back
      </Link>
      <p className="mt-3 text-sm text-muted-foreground text-pretty">
        Estimate based on the numbers you enter. Not a guarantee.
      </p>
    </SpecCard>
  );
}
