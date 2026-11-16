import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "Kertz Digital is an Austin studio building websites and lead systems for home service companies.",
  path: "/about",
});

// TODO: replace with the real story, photo, and credentials.
const principles = [
  {
    title: "Booked jobs, not vanity metrics",
    body: "Traffic and rankings only matter if the phone rings and the job gets on the calendar. That is what we measure.",
  },
  {
    title: "Local on purpose",
    body: "We work with Austin-area trades so we know the market, the neighborhoods, and the competition.",
  },
  {
    title: "Plain English",
    body: "You will always know what we are doing, why, and what it costs. No jargon, no surprise invoices.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      <PageHeader
        eyebrow="About"
        title="A small Austin studio for the trades."
        lead="Kertz Digital exists because good contractors lose work every week to missed calls and dated websites. We build the systems that fix that."
      />

      <section className="container-kd section-y">
        <p className="label-mono text-muted-foreground">How we work</p>
        <ul className="mt-8 grid border-t border-foreground md:grid-cols-3">
          {principles.map((p, i) => (
            <li
              key={p.title}
              className="border-b border-border py-8 md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0"
            >
              <p className="label-mono text-muted-foreground">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display text-lg mt-3">{p.title}</h2>
              <p className="text-sm text-muted-foreground mt-3 text-pretty">
                {p.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </main>
  );
}
