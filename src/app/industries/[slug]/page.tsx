import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqSection } from "@/components/sections/faq";
import { SpecCard } from "@/components/spec-card";
import { buttonVariants } from "@/components/ui/button";
import { getIndustry, industries } from "@/content/industries";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { absoluteUrl, pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** "HVAC" stays upper-case; "Pest control" becomes "pest control". */
const tradeNoun = (label: string) =>
  label === label.toUpperCase() ? label : label.toLowerCase();

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/industries/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/industries/${industry.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const path = `/industries/${industry.slug}`;
  const others = industries.filter((i) => i.slug !== industry.slug);

  return (
    <main>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Industries", path: "/industries" },
            { name: industry.label, path },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.label} websites and lead systems`,
            serviceType: "Marketing for home service businesses",
            audience: {
              "@type": "BusinessAudience",
              audienceType: industry.pros,
            },
            description: industry.intro,
            url: absoluteUrl(path),
            provider: { "@id": absoluteUrl("/#organization") },
            areaServed: site.serviceArea.map((name) => ({
              "@type": "City",
              name: `${name}, ${site.region}`,
            })),
          },
        ]}
      />
      <PageHeader
        eyebrow={`Industries / ${industry.label}`}
        title={industry.headline}
        lead={industry.intro}
      >
        <div className="flex flex-wrap gap-3">
          <Link href={site.cta.href} className={buttonVariants()}>
            {site.cta.label}
          </Link>
          <a
            href={site.phone.href}
            className={cn(buttonVariants({ variant: "outline" }), "font-mono")}
          >
            Call {site.phone.display}
          </a>
        </div>
      </PageHeader>

      {/* Where leads leak */}
      <section className="container-kd section-y">
        <p className="label-mono text-muted-foreground">
          Where {industry.pros} lose leads
        </p>
        <ul className="mt-8 grid border-t border-foreground md:grid-cols-3">
          {industry.leaks.map((l, i) => (
            <li
              key={l.title}
              className="border-b border-border py-8 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <p className="label-mono text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display text-lg mt-3">{l.title}</h2>
              <p className="text-sm text-muted-foreground mt-3 text-pretty">
                {l.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* What we build */}
      <section className="container-kd pb-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label-mono text-muted-foreground">What we set up</p>
          <h2 className="font-display text-xl mt-4 text-balance">
            A lead system for {industry.pros}, built around how your customers
            search and call.
          </h2>
          <p className="mt-6 text-sm text-muted-foreground">
            Searches we build your pages around:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {industry.searches.map((s) => (
              <li
                key={s}
                className="border border-border px-2.5 py-1 font-mono text-xs"
              >
                “{s}”
              </li>
            ))}
          </ul>
        </div>
        <SpecCard
          label={`${industry.label} system`}
          meta="Scope"
          className="lg:col-span-7"
        >
          <ul className="divide-y divide-border">
            {industry.build.map((item, i) => (
              <li key={item} className="flex gap-4 py-3 first:pt-0 last:pb-0">
                <span className="font-mono text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ul>
        </SpecCard>
      </section>

      {/* Internal links to the service pages */}
      <section className="container-kd pb-16">
        <p className="label-mono text-muted-foreground">The three parts</p>
        <ul className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
          {services.map((s) => (
            <li key={s.slug} className="bg-background">
              <Link href={s.href} className="block p-6 hover:bg-card">
                <span className="block font-semibold">{s.label} →</span>
                <span className="mt-1 block text-sm text-muted-foreground">
                  {s.blurb}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <FaqSection
        faqs={industry.faqs}
        title={`Questions from Austin ${industry.pros}`}
      />

      <section className="container-kd pb-16">
        <p className="label-mono text-muted-foreground">Other trades</p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {others.map((o) => (
            <li key={o.slug}>
              <Link
                href={`/industries/${o.slug}`}
                className="underline underline-offset-4 hover:decoration-2"
              >
                {o.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title={`Find out what missed calls are costing your ${tradeNoun(industry.label)} business.`}
      />
    </main>
  );
}
