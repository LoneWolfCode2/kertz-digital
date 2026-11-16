import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { industries } from "@/content/industries";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "Kertz Digital works with Austin HVAC, plumbing, electrical, roofing, landscaping, and pest control companies.",
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
            <li
              key={industry.label}
              className="border-r border-b border-border p-6"
            >
              <p className="label-mono text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display text-lg mt-2">{industry.label}</h2>
              <p className="text-sm text-muted-foreground mt-2 text-pretty">
                {industry.note}
              </p>
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
