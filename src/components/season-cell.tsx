import type { Level } from "@/lib/busy-season";
import { cn } from "@/lib/utils";

export const levelClass: Record<Level, string> = {
  Peak: "bg-primary text-primary-foreground font-semibold",
  Busy: "bg-primary/40 text-foreground",
  Steady: "bg-secondary text-muted-foreground",
  Slow: "bg-background text-muted-foreground",
};

/** One month: shaded by level, with the level written out (not color alone). */
export function SeasonCell({
  level,
  month,
  className,
}: {
  level: Level;
  month?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "flex flex-col items-center justify-center border border-border px-1 py-2 text-center text-xs leading-tight",
        levelClass[level],
        className,
      )}
    >
      {month && <span className="font-mono text-[11px]">{month}</span>}
      <span>{level}</span>
    </span>
  );
}
