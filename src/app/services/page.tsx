import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { services } from "@/content/services";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Local SEO, Websites & Lead Systems",
  description:
    "Three services for Austin home service companies: get found on Google, convert visitors with a fast website, and never miss a call. Use one or all three.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([{ name: "Services", path: "/services" }])}
      />
      <PageHeader
        eyebrow="Services"
        title="One system, three parts."
        lead="Use one piece or all three. Each is built to hand the customer off cleanly to the next, so nobody falls through the cracks."
      />

      <section className="container-kd section-y">
        <ul className="border-t border-foreground">
          {services.map((s, i) => (
            <li key={s.slug} className="border-b border-border">
              <Link
                href={s.href}
                className="group grid gap-4 py-8 md:grid-cols-12 md:items-baseline"
              >
                <span className="label-mono text-muted-foreground md:col-span-2">
                  {String(i + 1).padStart(2, "0")} / {s.step}
                </span>
                <span className="font-display text-xl md:col-span-4 group-hover:underline underline-offset-8 decoration-2">
                  {s.label}
                </span>
                <span className="text-muted-foreground text-pretty md:col-span-5">
                  {s.intro}
                </span>
                <span
                  aria-hidden
                  className="hidden font-mono md:col-span-1 md:block md:text-right"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </main>
  );
}
