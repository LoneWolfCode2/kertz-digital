import { JsonLd } from "@/components/json-ld";
import type { Faq } from "@/content/industries";
import { faqSchema } from "@/lib/schema";

type FaqSectionProps = {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
};

/**
 * FAQ list using native <details>, so answers are in the HTML for search
 * engines and work without JavaScript. Emits FAQPage structured data too,
 * which AI answer engines and Bing read even where Google no longer shows
 * FAQ rich results.
 */
export function FaqSection({
  faqs,
  title = "Questions we hear a lot",
  eyebrow = "FAQ",
}: FaqSectionProps) {
  return (
    <section className="container-kd section-y grid gap-10 lg:grid-cols-12">
      <JsonLd data={faqSchema(faqs)} />
      <div className="lg:col-span-4">
        <p className="label-mono text-muted-foreground">{eyebrow}</p>
        <h2 className="font-display text-xl mt-4 text-balance">{title}</h2>
      </div>
      <ul className="border-t border-foreground lg:col-span-8">
        {faqs.map((f) => (
          <li key={f.question} className="border-b border-border">
            <details className="group py-5">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-semibold [&::-webkit-details-marker]:hidden">
                <span className="text-pretty">{f.question}</span>
                <span
                  aria-hidden
                  className="font-mono text-muted-foreground transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-[65ch] text-muted-foreground text-pretty">
                {f.answer}
              </p>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
