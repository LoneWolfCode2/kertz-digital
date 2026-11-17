import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq";
import { SpecCard } from "@/components/spec-card";
import { buttonVariants } from "@/components/ui/button";
import { type Service, services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbSchema, serviceSchema } from "@/lib/schema";

/** Shared layout for /local-visibility, /websites and /lead-streamlining. */
export function ServiceDetail({ service }: { service: Service }) {
  const index = services.findIndex((s) => s.slug === service.slug);
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <main>
      <JsonLd
        data={[
          serviceSchema(service),
          breadcrumbSchema([
            { name: "Services", path: "/services" },
            { name: service.label, path: service.href },
          ]),
        ]}
      />
      <PageHeader
        eyebrow={`Service ${String(index + 1).padStart(2, "0")} / ${service.label}`}
        title={service.headline}
        lead={service.intro}
      >
        <Link href={site.cta.href} className={buttonVariants()}>
          {site.cta.label}
        </Link>
      </PageHeader>

      <section className="container-kd section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label-mono text-muted-foreground">What's included</p>
          <h2 className="font-display text-xl mt-4 text-balance">
            {service.outcome}
          </h2>
        </div>
        <SpecCard label={service.label} meta="Scope" className="lg:col-span-7">
          <ul className="divide-y divide-border">
            {service.includes.map((item, i) => (
              <li key={item} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                <span className="font-mono text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </SpecCard>
      </section>

      <section className="container-kd pb-16">
        <p className="label-mono text-muted-foreground">Works with</p>
        <ul className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-2">
          {others.map((s) => (
            <li key={s.slug} className="bg-background">
              <Link
                href={s.href}
                className="block p-6 transition-colors hover:bg-card"
              >
                <span className="block font-semibold">{s.label} →</span>
                <span className="block text-sm text-muted-foreground mt-1">
                  {s.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqSection
        faqs={service.faqs}
        title={`${service.label}: common questions`}
      />

      <CtaBand />
    </main>
  );
}
