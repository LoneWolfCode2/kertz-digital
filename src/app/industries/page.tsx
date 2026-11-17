import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { industries } from "@/content/industries";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Marketing for Austin Home Service Trades",
  description:
    "Websites and lead systems for Austin HVAC, plumbing, electrical, roofing, landscaping, and pest control companies. See how we help your trade.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([{ name: "Industries", path: "/industries" }])}
      />
      <PageHeader
        eyebrow="Industries"
        title="Home service trades, and nothing else."
        lead="Focusing on one kind of business means we already know how your customers search, what makes them trust you, and when they call."
      />

      <section className="container-kd section-y">
        <ul className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <li key={industry.slug} className="border-r border-b border-border">
              <Link
                href={`/industries/${industry.slug}`}
                className="group block h-full p-6 transition-colors hover:bg-card"
              >
                <p className="label-mono text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-lg mt-2 group-hover:underline underline-offset-4">
                  {industry.label} →
                </h2>
                <p className="text-sm text-muted-foreground mt-2 text-pretty">
                  {industry.note}
                </p>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          Run a different kind of home service business? The playbook still
          applies. Book a call and we&apos;ll tell you honestly if it&apos;s a
          fit.
        </p>
      </section>

      <CtaBand />
    </main>
  );
}
