// Single source of truth for the three services.
// Used by the header/mobile nav (via site.ts), the homepage "How it works"
// section, /services, and each service's own page.

export type Service = {
  slug: string;
  href: string;
  label: string;
  /** Short line for menus. */
  blurb: string;
  /** Homepage step title. */
  step: string;
  headline: string;
  intro: string;
  includes: string[];
  outcome: string;
};

export const services = [
  {
    slug: "local-visibility",
    href: "/local-visibility",
    label: "Local Visibility",
    blurb: "Get found on Google",
    step: "Get found",
    headline: "Show up when Austin searches for what you do.",
    intro:
      "Most homeowners pick from the first few names on Google. We make sure yours is one of them, in the neighborhoods you actually serve.",
    includes: [
      "Google Business Profile setup and cleanup",
      "Service-area pages for the parts of Austin you cover",
      "Review requests sent automatically after each job",
      "Consistent name, address, and phone across directories",
    ],
    outcome: "More of the right calls, from people ready to book.",
  },
  {
    slug: "websites",
    href: "/websites",
    label: "Websites",
    blurb: "Look credible, convert visitors",
    step: "Look credible",
    headline: "A website that earns the call.",
    intro:
      "Your site has a few seconds to prove you're legit. We build fast, clear sites that show your work, your reviews, and one obvious way to reach you.",
    includes: [
      "Mobile-first design built for one-thumb browsing",
      "Click-to-call and short quote forms on every page",
      "Project photos, reviews, and licensing up front",
      "Fast load times and basic SEO built in",
    ],
    outcome: "Visitors who land on your site turn into leads.",
  },
  {
    slug: "lead-streamlining",
    href: "/lead-streamlining",
    label: "Lead Streamlining",
    blurb: "Never miss a call",
    step: "Never miss a call",
    headline: "Every call, form, and text gets an answer.",
    intro:
      "You can't pick up from a crawlspace. We set up the system that catches what you miss and follows up before the customer calls someone else.",
    includes: [
      "Missed-call text-back within seconds",
      "After-hours capture and next-morning follow-up",
      "Every lead in one inbox, not five apps",
      "Simple reporting on where jobs come from",
    ],
    outcome: "Leads stop leaking out of the bottom of the funnel.",
  },
] as const satisfies readonly Service[];

export function getService(slug: (typeof services)[number]["slug"]): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
