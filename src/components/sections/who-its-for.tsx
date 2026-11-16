import Link from "next/link";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { industries } from "@/content/industries";
import { site } from "@/content/site";

/** Homepage section 03: the trades we serve. */
export function WhoItsFor() {
  return (
    <section className="border-t border-border">
      <div className="container-kd section-y">
        <RevealGroup className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <RevealItem as="p" className="label-mono text-muted-foreground">
              03 / Who it's for
            </RevealItem>
            <RevealItem
              as="h2"
              className="font-display text-2xl mt-4 max-w-[20ch] text-balance"
            >
              Built for the trades that run on the phone.
            </RevealItem>
          </div>
          <RevealItem
            as="p"
            className="text-muted-foreground max-w-[45ch] text-pretty lg:col-span-5"
          >
            We only work with home service companies in and around{" "}
            {site.location.split(",")[0]}. Same playbook, tuned to how your
            customers actually call.
          </RevealItem>
        </RevealGroup>

        <RevealGroup
          className="mt-12 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3"
          interval={0.06}
        >
          {industries.map((industry, i) => (
            <RevealItem
              key={industry.label}
              className="border-r border-b border-border p-6"
            >
              <p className="label-mono text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="font-display text-lg mt-2">{industry.label}</p>
              <p className="text-sm text-muted-foreground mt-2 text-pretty">
                {industry.note}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-6 text-sm text-muted-foreground">
          Don't see your trade?{" "}
          <Link
            href="/industries"
            className="text-foreground underline underline-offset-4"
          >
            See everyone we work with
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
