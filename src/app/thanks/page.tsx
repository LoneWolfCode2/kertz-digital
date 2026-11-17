import Link from "next/link";
import { BookedSummary } from "@/components/booked-summary";
import { LeadCreated } from "@/components/lead-created";
import { PageHeader } from "@/components/page-header";
import { buttonVariants } from "@/components/ui/button";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Thanks, we got it",
  description:
    "Your call request is in. We'll be in touch within one business day.",
  path: "/thanks",
  noindex: true,
});

export default function ThanksPage() {
  return (
    <main>
      {/* Conversion event: this page is only reached after a lead is sent. */}
      <LeadCreated />
      <PageHeader
        eyebrow="Request received"
        title="You're all set."
        lead="Booked a time? Your confirmation email is on its way, with a link to reschedule. Asked us to call? We'll reach out within one business day, usually sooner."
      >
        <BookedSummary />
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.phone.href}
            className={cn(buttonVariants({ variant: "outline" }), "font-mono")}
          >
            Call {site.phone.display}
          </a>
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Back to home
          </Link>
        </div>
      </PageHeader>

      <section className="container-kd section-y">
        <p className="label-mono text-muted-foreground">
          While you wait, see how it works
        </p>
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
    </main>
  );
}
