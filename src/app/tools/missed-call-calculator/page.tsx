import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { LeakCalculator } from "@/components/sections/leak-calculator";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Missed-Call Cost Calculator for Contractors",
  description:
    "How much do missed calls cost your home service business? Enter your weekly calls and average job value to see the yearly cost. Free, no signup.",
  path: "/tools/missed-call-calculator",
});

export default function MissedCallCalculatorPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Free tools", path: "/tools" },
          {
            name: "Missed-call cost calculator",
            path: "/tools/missed-call-calculator",
          },
        ])}
      />
      <PageHeader
        eyebrow="Free tools / Missed-call calculator"
        title="What are missed calls costing you?"
        lead="When a caller reaches voicemail, many hang up and call the next company on the list. Put in your numbers and see what that adds up to."
      />

      <section className="container-kd section-y grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-6">
          <LeakCalculator />
        </div>
        <div className="min-w-0 space-y-5 text-pretty lg:col-span-6">
          <p className="label-mono text-muted-foreground">How to use it</p>
          <p>
            Be honest and round down. A smaller number you believe is more
            useful than a big one you don&apos;t.
          </p>
          <p className="text-muted-foreground">
            Not sure how many calls you miss? Check your phone&apos;s recent
            calls for a normal week and count the ones you didn&apos;t pick up
            or call back the same day.
          </p>
          <p className="text-muted-foreground">
            Next, see how strong your Google profile is with the{" "}
            <Link
              href="/tools/google-profile-checklist"
              className="text-foreground underline underline-offset-4"
            >
              Google profile checklist
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand />
    </main>
  );
}
