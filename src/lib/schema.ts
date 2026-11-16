// JSON-LD builders (schema.org). Rendered with <JsonLd> from
// components/json-ld.tsx. Validate at https://search.google.com/test/rich-results

import type { Service } from "@/content/services";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/env";
import { absoluteUrl } from "@/lib/seo";

const ORG_ID = `${siteUrl}/#organization`;

/** The business itself. Rendered once, in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    // Service-area business: no public street address, so we list areaServed.
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: site.name,
    url: siteUrl,
    description: site.description,
    image: absoluteUrl("/opengraph-image"),
    ...(site.phone.placeholder ? {} : { telephone: site.phone.e164 }),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: "US",
    },
    areaServed: site.serviceArea.map((name) => ({
      "@type": "City",
      name: `${name}, ${site.region}`,
    })),
    knowsAbout: [
      "Local SEO",
      "Google Business Profile management",
      "Website design",
      "Lead management",
    ],
    ...(site.profiles.length > 0 && { sameAs: site.profiles }),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: site.name,
    url: siteUrl,
    publisher: { "@id": ORG_ID },
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.label,
    serviceType: service.label,
    description: service.intro,
    url: absoluteUrl(service.href),
    provider: { "@id": ORG_ID },
    areaServed: site.serviceArea.map((name) => ({
      "@type": "City",
      name: `${name}, ${site.region}`,
    })),
  };
}

export type Crumb = { name: string; path: string };

/** Home is added automatically as the first crumb. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
