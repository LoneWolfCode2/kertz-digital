// ─────────────────────────────────────────────────────────────────────────────
// BUSINESS FACTS: the one place to change details that appear site-wide.
// Name, domain, phone, service area, hours, and CTA all flow from here into
// the header, footer, page copy, SEO metadata, sitemap, and structured data.
//
// Other content files in this folder:
//   services.ts    the three services (nav, homepage, service pages)
//   industries.ts  trades we serve
//   plans.ts       pricing plans
//
// Placeholders are written as "[LIKE THIS]" so you can search for "[" to
// find every one. Values marked `placeholder: true` are kept out of
// structured data so Google never sees fake details.
// ─────────────────────────────────────────────────────────────────────────────

import { services } from "./services";

export const site = {
  name: "Kertz Digital",
  // The site's URL comes from the environment (src/lib/env.ts), not here,
  // so test deployments on *.vercel.app don't claim kertzdigital.com.
  location: "Austin, TX",
  city: "Austin",
  region: "TX",
  /** Cities listed in the footer and in LocalBusiness `areaServed`. */
  serviceArea: [
    "Austin",
    "Round Rock",
    "Cedar Park",
    "Pflugerville",
    "Georgetown",
    "Leander",
  ],
  /** Public Google Voice number. Email is never shown; forms send server-side. */
  phone: {
    display: "(512) 555-0142",
    href: "tel:+15125550142",
    e164: "+15125550142",
    placeholder: true, // [GOOGLE VOICE NUMBER NEEDED]
  },
  hours: {
    display: "Mon–Fri, 8am–6pm",
    placeholder: true, // [BUSINESS HOURS NEEDED]
  },
  tagline: "Websites and lead systems for Austin home service companies.",
  /** Default meta description for pages that don't set their own. */
  description:
    "Kertz Digital builds websites and lead systems for Austin home service companies, so every call, form, and after-hours inquiry becomes a booked job.",
  services: services.map(({ label, href, blurb }) => ({ label, href, blurb })),
  nav: [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Book a call", href: "/book" },
  /** Social / directory profiles for schema `sameAs`. Add as they go live. */
  profiles: [] as string[],
} as const;
