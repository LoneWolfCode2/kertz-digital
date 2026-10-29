"use client";

import Link from "next/link";
import { useState } from "react";
import { ListIcon } from "@phosphor-icons/react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        aria-label="Open menu"
        className="inline-flex size-11 items-center justify-center border border-border transition-colors hover:border-foreground lg:hidden"
      >
        <ListIcon className="size-5" />
      </SheetTrigger>

      <SheetContent side="right" className="text-base data-[side=right]:w-full">
        <SheetHeader className="border-b border-border p-6">
          <SheetTitle className="font-display text-lg">{site.name}</SheetTitle>
          <SheetDescription className="label-mono">
            {site.location}
          </SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile" className="flex-1 overflow-y-auto p-6">
          <p className="label-mono text-muted-foreground">Services</p>
          <ul className="mt-3 divide-y divide-border border-y border-border">
            {site.services.map((s) => (
              <li key={s.href}>
                <Link href={s.href} onClick={close} className="block py-4">
                  <span className="block font-semibold">{s.label}</span>
                  <span className="block text-sm text-muted-foreground">
                    {s.blurb}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-8">
            {site.nav
              .filter((item) => item.href !== "/services")
              .map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-3 text-lg font-medium"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <div className="space-y-3 border-t border-border p-6">
          <Link
            href={site.cta.href}
            onClick={close}
            className={cn(buttonVariants(), "w-full")}
          >
            {site.cta.label}
          </Link>
          <a
            href={site.phone.href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "w-full font-mono",
            )}
          >
            Call {site.phone.display}
          </a>
          <ThemeToggle />
        </div>
      </SheetContent>
    </Sheet>
  );
}
