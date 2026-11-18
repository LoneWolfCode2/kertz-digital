"use client";

import { ListIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

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
          {site.nav.map((item) =>
            item.children ? (
              <div key={item.label} className="mb-8">
                <p className="label-mono text-muted-foreground">{item.label}</p>
                <ul className="mt-3 divide-y divide-border border-y border-border">
                  {item.children.map((c) => (
                    <li key={`${c.href}-${c.label}`}>
                      <Link
                        href={c.href}
                        onClick={close}
                        className="block py-3"
                      >
                        <span className="block font-semibold">{c.label}</span>
                        {c.blurb && (
                          <span className="block text-sm text-muted-foreground">
                            {c.blurb}
                          </span>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="block py-3 text-lg font-medium"
              >
                {item.label}
              </Link>
            ),
          )}
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
