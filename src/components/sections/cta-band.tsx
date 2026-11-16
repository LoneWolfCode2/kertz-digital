import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type CtaBandProps = {
  title?: string;
  lead?: string;
};

/** Closing call to action, reused at the bottom of most pages. */
export function CtaBand({
  title = "Find out what missed calls are costing you.",
  lead = "A 20-minute call. We'll look at how leads reach you today and show you where they're slipping. No pitch deck.",
}: CtaBandProps) {
  return (
    <section className="border-t border-foreground bg-card">
      <RevealGroup className="container-kd section-y grid gap-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <RevealItem as="p" className="label-mono text-muted-foreground">
            Next step
          </RevealItem>
          <RevealItem
            as="h2"
            className="font-display text-2xl mt-4 max-w-[22ch] text-balance"
          >
            {title}
          </RevealItem>
          <RevealItem
            as="p"
            className="text-muted-foreground mt-6 max-w-[55ch] text-pretty"
          >
            {lead}
          </RevealItem>
        </div>
        <RevealItem className="flex flex-col gap-3 lg:col-span-4">
          <Link href={site.cta.href} className={cn(buttonVariants(), "w-full")}>
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
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
