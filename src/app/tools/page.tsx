import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { buttonVariants } from "@/components/ui/button";
import { toolHref, tools } from "@/content/tools";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Free Tools for Austin Trades Owners",
  description:
    "Free, no-signup tools for home service businesses: a missed-call cost calculator and a Google Business Profile checklist. Try one in two minutes.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([{ name: "Free tools", path: "/tools" }])}
      />
      <PageHeader
        eyebrow="Free tools"
        title="Free tools for Austin trades owners."
        lead="Quick checks that show where jobs slip away. No signup, no sales call, about two minutes each."
      />

      <section className="container-kd section-y">
        <ul className="grid border-t border-l border-border md:grid-cols-2">
          {tools.map((t, i) => (
            <li
              key={t.slug}
              className="flex flex-col gap-3 border-r border-b border-border bg-card p-8"
            >
              <p className="label-mono flex flex-wrap items-center gap-3 text-muted-foreground">
                <span>
                  {String(i + 1).padStart(2, "0")} · {t.time}
                </span>
                {t.soon && (
                  <span className="border border-border px-2 py-0.5">
                    Coming soon
                  </span>
                )}
              </p>
              <h2 className="font-display text-xl">{t.title}</h2>
              <p className="text-muted-foreground text-pretty">{t.blurb}</p>
              {!t.soon && (
                <Link
                  href={toolHref(t.slug)}
                  className="mt-auto pt-2 font-semibold underline-offset-4 hover:underline"
                >
                  Open the tool →
                </Link>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border border-foreground bg-secondary p-8">
          <div className="max-w-[52ch]">
            <p className="label-mono text-muted-foreground">Also free</p>
            <h2 className="font-display text-xl mt-3">
              Get your business in the Austin trades directory.
            </h2>
            <p className="mt-2 text-muted-foreground text-pretty">
              A free listing with your services, service area, and hours.
            </p>
          </div>
          <Link
            href="/directory/list-your-business"
            className={buttonVariants({ size: "lg" })}
          >
            List my business free
          </Link>
        </div>
      </section>

      <CtaBand
        title="Rather have someone fix it for you?"
        lead="Free 20-minute lead audit. I'll show you where calls slip and what I'd fix first."
      />
    </main>
  );
}
