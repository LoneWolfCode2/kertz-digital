import { JsonLd } from "@/components/json-ld";
import { ListingRequestForm } from "@/components/listing-request-form";
import { PageHeader } from "@/components/page-header";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "List Your Business in the Austin Trades Directory",
  description:
    "Add your Austin home service business to the free Kertz Digital trades directory, or update or remove an existing listing.",
  path: "/directory/list-your-business",
});

const steps = [
  {
    title: "Send the form",
    body: "Tell us about your business. It takes about two minutes.",
  },
  {
    title: "We check it by hand",
    body: "We confirm the business is real, local, and that you can speak for it.",
  },
  {
    title: "Your listing goes live",
    body: "We'll let you know when it's up, usually within a few days.",
  },
];

export default function ListYourBusinessPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Directory", path: "/directory" },
          { name: "List your business", path: "/directory/list-your-business" },
        ])}
      />
      <PageHeader
        eyebrow="Austin trades directory"
        title="List your business, free."
        lead="For home service businesses in the Austin area. Already listed? Use the same form to update or remove your listing."
      />

      <section className="container-kd section-y grid gap-12 lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-7">
          <ListingRequestForm />
        </div>
        <aside className="min-w-0 lg:col-span-5">
          <p className="label-mono text-muted-foreground">How it works</p>
          <ol className="mt-6 border-t border-foreground">
            {steps.map((s, i) => (
              <li key={s.title} className="border-b border-border py-5">
                <p className="label-mono text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="font-display text-lg mt-2">{s.title}</h2>
                <p className="text-sm text-muted-foreground mt-2 text-pretty">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </aside>
      </section>
    </main>
  );
}
