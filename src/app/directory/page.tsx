import Link from "next/link";
import { DirectoryBrowser } from "@/components/directory-browser";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { buttonVariants } from "@/components/ui/button";
import { industries } from "@/content/industries";
import { getListings } from "@/lib/directory";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Austin Trades Directory: Local Home Service Businesses",
  description:
    "Find local Austin-area HVAC, plumbing, electrical, roofing, landscaping, and pest control businesses. Free to use, free to be listed.",
  path: "/directory",
});

export default async function DirectoryPage() {
  const listings = await getListings();
  const trades = industries
    .map((i) => i.label)
    .filter((t) => listings.some((l) => l.trades.includes(t)));

  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([{ name: "Directory", path: "/directory" }])}
      />
      <PageHeader
        eyebrow="Austin trades directory"
        title="Local trades you can call today."
        lead="Austin-area home service businesses in one place. Free to search, free to be listed."
      />

      <section className="container-kd section-y grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          {listings.length > 0 ? (
            <DirectoryBrowser listings={listings} trades={trades} />
          ) : (
            <div className="border border-dashed border-foreground/40 p-8">
              <p className="label-mono text-muted-foreground">Coming soon</p>
              <h2 className="font-display text-xl mt-3">
                The first listings are going up now.
              </h2>
              <p className="mt-3 text-muted-foreground text-pretty">
                Own an Austin home service business? Be one of the first listed.
                It&apos;s free.
              </p>
            </div>
          )}
          <p className="mt-10 text-sm text-muted-foreground text-pretty">
            Listings show public business information. Kertz Digital
            doesn&apos;t endorse or guarantee any business listed here. Own one
            of these businesses?{" "}
            <Link
              href="/directory/list-your-business"
              className="underline underline-offset-4"
            >
              Update or remove your listing
            </Link>
            .
          </p>
        </div>

        <aside className="flex min-w-0 flex-col gap-6 lg:col-span-4">
          <div className="border border-foreground bg-secondary p-6">
            <p className="label-mono text-muted-foreground">
              For business owners
            </p>
            <h2 className="font-display text-lg mt-3">
              Own an Austin trades business? Get listed free.
            </h2>
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
              <li>Your services, service area, and hours</li>
              <li>Links to your website and Google reviews</li>
              <li>We review every request by hand</li>
            </ul>
            <Link
              href="/directory/list-your-business"
              className={buttonVariants({ className: "mt-6" })}
            >
              List my business
            </Link>
          </div>
        </aside>
      </section>

      <CtaBand />
    </main>
  );
}
