import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/page-header";
import { ProfileChecklist } from "@/components/profile-checklist";
import { CtaBand } from "@/components/sections/cta-band";
import { breadcrumbSchema } from "@/lib/schema";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Google Business Profile Checklist for Contractors",
  description:
    "Check your Google Business Profile in two minutes: 12 things that help home service businesses show up and get calls. Free score and top fixes.",
  path: "/tools/google-profile-checklist",
});

export default function GoogleProfileChecklistPage() {
  return (
    <main>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Free tools", path: "/tools" },
          {
            name: "Google profile checklist",
            path: "/tools/google-profile-checklist",
          },
        ])}
      />
      <PageHeader
        eyebrow="Free tools / Google profile checklist"
        title="How strong is your Google profile?"
        lead="Open your Business Profile in another tab and tick what's true today. Your score and top fixes update as you go."
      />

      <section className="container-kd section-y">
        <ProfileChecklist />
        <p className="mt-12 text-sm text-muted-foreground">
          Kertz Digital is not affiliated with Google. This checklist is general
          guidance, not a guarantee of rankings.
        </p>
      </section>

      <CtaBand />
    </main>
  );
}
