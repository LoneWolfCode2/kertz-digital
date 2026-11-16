import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { SpecCard } from "@/components/spec-card";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Book a call",
  description:
    "Book a free 20-minute call to find out where your business is losing leads.",
  path: "/book",
});

const agenda = [
  "How leads reach you today: calls, forms, texts, referrals",
  "Where they are slipping, using your own numbers",
  "What we would fix first, and roughly what it costs",
];

export default function BookPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([{ name: "Book a call", path: "/book" }])}
      />
      <PageHeader
        eyebrow="Book a call"
        title="20 minutes. No pitch deck."
        lead="Tell us a bit about your business and we will find a time that works. Prefer to talk now? Just call."
      />

      <section className="container-kd section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="label-mono text-muted-foreground">On the call</p>
          <ol className="mt-6 space-y-4">
            {agenda.map((item, i) => (
              <li key={item} className="flex gap-4">
                <span className="font-mono text-sm text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-pretty">{item}</span>
              </li>
            ))}
          </ol>
          <a
            href={site.phone.href}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-8 font-mono",
            )}
          >
            Call {site.phone.display}
          </a>
        </div>

        {/* TODO: booking form (react-hook-form + zod) or scheduler embed */}
        <SpecCard
          label="Booking request"
          meta="Coming soon"
          className="lg:col-span-7"
        >
          <p className="text-muted-foreground text-pretty">
            Online booking is on its way. In the meantime, call{" "}
            <a
              href={site.phone.href}
              className="font-mono text-foreground underline underline-offset-4"
            >
              {site.phone.display}
            </a>{" "}
            and we will set up a time.
          </p>
        </SpecCard>
      </section>
    </main>
  );
}
