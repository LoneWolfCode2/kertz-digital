"use client";

import { CaretDownIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import type { NavItem } from "@/content/site";
import { cn } from "@/lib/utils";

const linkClass =
  "whitespace-nowrap text-sm font-medium underline-offset-8 decoration-2 hover:underline";

/** Main menu for large screens. Items with children open as dropdowns. */
export function DesktopNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // Close on navigation, Escape, and clicks outside the menu.
  // biome-ignore lint/correctness/useExhaustiveDependencies: close when the route changes
  useEffect(() => setOpen(null), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return (
    <nav ref={navRef} aria-label="Main" className="hidden lg:block">
      <ul className="flex items-center gap-7">
        {items.map((item) =>
          item.children ? (
            <Dropdown
              key={item.label}
              item={item}
              open={open === item.label}
              onOpenChange={(o) => setOpen(o ? item.label : null)}
            />
          ) : (
            <li key={item.href}>
              <Link href={item.href} className={linkClass}>
                {item.label}
              </Link>
            </li>
          ),
        )}
      </ul>
    </nav>
  );
}

function Dropdown({
  item,
  open,
  onOpenChange,
}: {
  item: NavItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const panelId = useId();
  const children = item.children ?? [];
  const wide = children.some((c) => c.blurb);

  return (
    <li
      className="relative"
      onMouseEnter={() => onOpenChange(true)}
      onMouseLeave={() => onOpenChange(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        // Mouse clicks keep it open (hover already opened it); keyboard toggles.
        onClick={(e) => onOpenChange(e.detail === 0 ? !open : true)}
        className={cn(linkClass, "inline-flex items-center gap-1")}
      >
        {item.label}
        <CaretDownIcon
          aria-hidden
          className={cn(
            "size-3.5 transition-transform motion-reduce:transition-none",
            open && "rotate-180",
          )}
        />
      </button>
      {/* pt-3 bridges the gap so the panel doesn't close on the way down */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3"
      >
        <ul
          className={cn(
            "border border-foreground bg-background p-2 shadow-[4px_4px_0_var(--foreground)]",
            wide ? "w-80" : "w-56",
          )}
        >
          {children.map((c) => (
            <li key={`${c.href}-${c.label}`}>
              <Link
                href={c.href}
                onClick={() => onOpenChange(false)}
                className="block px-3 py-2.5 transition-colors hover:bg-secondary focus-visible:bg-secondary"
              >
                <span className="block text-sm font-semibold">{c.label}</span>
                {c.blurb && (
                  <span className="mt-0.5 block text-sm text-muted-foreground text-pretty">
                    {c.blurb}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}
