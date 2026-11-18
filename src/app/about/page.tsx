import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { CtaBand } from "@/components/sections/cta-band";
import { site } from "@/content/site";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Kertz Digital, an Austin Web Studio",
  description:
    "Kertz Digital is run by Joseph Kertz, an Austin native and engineer, building websites and lead systems for ambitious home service owners.",
  path: "/about",
});

const facts = [
  { label: "Founder", value: "Joseph Kertz" },
  { label: "Based in", value: "Austin, born and raised" },
  { label: "Background", value: "Engineering degree, 5+ years in tech" },
  { label: "Works with", value: "Home service and trades businesses" },
];

const principles = [
  {
    title: "Bots up front, me for clients",
    body: "You might talk to a bot or two on the way in. Once you're a client, you get me, by name and by phone.",
  },
  {
    title: "Built for owners who want to grow",
    body: "The trades keep this city running. I work best with owners who want more jobs, more crews, and a business that runs without them answering every call.",
  },
  {
    title: "No promises I can't keep",
    body: "Nobody can honestly guarantee you the #1 spot on Google. I'll tell you what I'm doing, why, and what it costs, and show you the results every month.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={breadcrumbSchema([{ name: "About", path: "/about" }])} />
      <PageHeader
        eyebrow="About"
        title="A personal web studio for Austin's trades."
        lead="Kertz Digital gives local service businesses the same modern tools the big companies use, from someone who picks up the phone."
      />

      <section className="container-kd section-y grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 min-w-0">
          <p className="label-mono text-muted-foreground">The story</p>
          <div className="mt-6 space-y-5 text-lg text-pretty max-w-[60ch]">
            <p>
              I'm Joseph Kertz. I was born and raised in Austin, and I've spent
              more than five years in tech after earning a degree in
              engineering.
            </p>
            <p>
              I started Kertz Digital because building a website shouldn't mean
              getting passed around an agency. Local businesses deserve a more
              personal experience, and the same cutting-edge tools the big
              players use: a fast site, a strong Google presence, and a system
              that catches every lead.
            </p>
            <p>
              The trades are the backbone of this country. My job is to give the
              owners who want to grow the best possible shot at doing it.
            </p>
          </div>
        </div>

        {/* TODO: add Joseph's photo here once it's chosen. */}
        <dl className="lg:col-span-5 min-w-0 border-t border-foreground">
          {facts.map((f) => (
            <div
              key={f.label}
              className="grid grid-cols-[12ch_1fr] gap-4 border-b border-border py-4 text-sm"
            >
              <dt className="label-mono text-muted-foreground">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
          <div className="grid grid-cols-[12ch_1fr] gap-4 border-b border-border py-4 text-sm">
            <dt className="label-mono text-muted-foreground">Reach me</dt>
            <dd>
              <a href={site.phone.href} className="font-mono hover:underline">
                {site.phone.display}
              </a>
              <span className="block text-muted-foreground">
                {site.hours.display}
              </span>
            </dd>
          </div>
        </dl>
      </section>

      <section className="container-kd section-y pt-0">
        <p className="label-mono text-muted-foreground">How I work</p>
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
