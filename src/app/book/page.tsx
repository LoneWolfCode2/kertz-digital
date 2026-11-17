import { BookingForm } from "@/components/booking-form";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { Scheduler } from "@/components/scheduler";
import { SpecCard } from "@/components/spec-card";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { SCHEDULER_TZ_LABEL, schedulerEnabled } from "@/lib/scheduler";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Book a Free Lead Audit Call",
  description:
    "Book a free 20-minute call with Kertz Digital. We'll show your Austin home service business where calls and leads are slipping, and what to fix first.",
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
        lead={
          schedulerEnabled
            ? "Pick a time that works and you'll get a confirmation right away. Prefer to talk now? Just call."
            : "Tell us a bit about your business and we will find a time that works. Prefer to talk now? Just call."
        }
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

        <div className="min-w-0 space-y-10 lg:col-span-7">
          {schedulerEnabled && (
            <SpecCard label="Book your call" meta="Instant confirmation">
              <Scheduler tzLabel={SCHEDULER_TZ_LABEL} />
            </SpecCard>
          )}
          <SpecCard
            label={schedulerEnabled ? "Or have us call you" : "Booking request"}
            meta="Takes 1 minute"
          >
            {schedulerEnabled && (
              <p className="mb-6 text-sm text-muted-foreground text-pretty">
                None of those times work? Leave your details and we&apos;ll find
                one.
              </p>
            )}
            <BookingForm />
          </SpecCard>
        </div>
      </section>
    </main>
  );
}
