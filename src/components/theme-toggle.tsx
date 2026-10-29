"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-pressed={isDark}
      className="label-mono inline-flex h-11 items-center gap-2 border border-border px-3 transition-colors hover:border-foreground whitespace-nowrap"
    >
      <span
        aria-hidden
        className={`size-2.5 border border-foreground ${isDark ? "bg-caution" : ""}`}
      />
      Blueprint {isDark ? "on" : "off"}
    </button>
  );
}
