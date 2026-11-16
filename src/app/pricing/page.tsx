import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { buttonVariants } from "@/components/ui/button";
import { plans } from "@/content/plans";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Pricing",
  description: "Simple monthly plans for Austin home service companies.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([{ name: "Pricing", path: "/pricing" }])}
      />
      <PageHeader
        eyebrow="Pricing"
        title="Straightforward plans. No long contracts."
        lead="Pick the piece you need now. Most clients start with Booked, because it closes every gap at once."
      />

      <section className="container-kd section-y">
        <ul className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <li
              key={plan.name}
              className={cn(
                "flex flex-col bg-card p-6 sm:p-8",
                plan.featured
                  ? "border-2 border-foreground"
                  : "border border-border",
              )}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="font-display text-xl">{plan.name}</h2>
                {plan.featured && (
                  <span className="label-mono bg-caution px-2 py-0.5 text-caution-foreground">
                    Most popular
                  </span>
                )}
              </div>
              <p className="mt-4 font-mono">
                <span className="text-2xl">{plan.price}</span>{" "}
                <span className="text-sm text-muted-foreground">
                  {plan.cadence}
                </span>
              </p>
              <p className="mt-4 text-sm text-muted-foreground text-pretty">
                {plan.summary}
              </p>
              <ul className="mt-6 mb-8 space-y-2 border-t border-border pt-6 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span
                      aria-hidden
                      className="mt-2 size-1.5 shrink-0 bg-foreground"
                    />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={site.cta.href}
                className={cn(
                  buttonVariants({
                    variant: plan.featured ? "default" : "outline",
                  }),
                  "mt-auto w-full",
                )}
              >
                {site.cta.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </main>
  );
}
