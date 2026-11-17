import { PageHeader } from "@/components/page-header";

export type LegalSection = { heading: string; body: React.ReactNode };

/** Shared layout for /privacy and /sms-terms: plain, readable, printable. */
export function LegalPage({
  eyebrow,
  title,
  lead,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main>
      <PageHeader eyebrow={eyebrow} title={title} lead={lead} />
      <section className="container-kd section-y">
        <p className="label-mono text-muted-foreground">
          Last updated {updated}
        </p>
        <div className="mt-8 max-w-[70ch] space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-lg">{s.heading}</h2>
              <div className="mt-3 space-y-3 text-pretty text-muted-foreground [&_a]:text-foreground [&_a]:underline [&_li]:ml-5 [&_li]:list-disc [&_strong]:text-foreground">
                {s.body}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
