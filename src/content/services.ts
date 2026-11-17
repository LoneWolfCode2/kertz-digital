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
  /** <title> without the brand suffix. Aim for ≤ 50 characters. */
  seoTitle: string;
  /** Meta description, ≤ 155 characters. */
  seoDescription: string;
  faqs: { question: string; answer: string }[];
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
    seoTitle: "Local SEO for Austin Home Service Companies",
    seoDescription:
      "Local SEO for Austin contractors: Google Business Profile setup, service-area pages, and automated reviews so homeowners find you first. Book a free call.",
    faqs: [
      {
        question: "How long does local SEO take to work?",
        answer:
          "Fixes to your Google Business Profile and listings can show up within weeks. Rankings for competitive searches build over months as reviews and pages add up. We report on calls and leads, not just positions.",
      },
      {
        question: "Do I need a storefront to show up on Google Maps?",
        answer:
          "No. Most home service companies are set up as service-area businesses, which hide the street address and list the areas you cover instead.",
      },
      {
        question: "Why are reviews such a big deal?",
        answer:
          "Review count, rating, and how recent they are all affect where you show up and whether a homeowner calls. Asking after every job is the most reliable way to keep them coming.",
      },
    ],
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
    seoTitle: "Websites for Austin Contractors & Home Services",
    seoDescription:
      "Fast, mobile-first websites for Austin home service companies, with click-to-call, quote forms, reviews, and SEO built in. Turn visitors into booked jobs.",
    faqs: [
      {
        question: "Do I own the website?",
        answer:
          "With the one-time website option, yes, outright. On a monthly plan, hosting and updates are included; we'll walk through ownership terms on the call so there are no surprises.",
      },
      {
        question: "Can you redesign my current site instead of starting over?",
        answer:
          "Sometimes. If it's fast and easy to edit, we can add what's missing. If it's slow or built on something hard to change, rebuilding usually costs less in the long run.",
      },
      {
        question: "Will the site work well on phones?",
        answer:
          "It's designed for phones first, because that's how most homeowners find a contractor. Click-to-call and a short quote form are always one tap away.",
      },
    ],
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
    seoTitle: "Missed-Call Text-Back & Lead Follow-Up in Austin",
    seoDescription:
      "Missed-call text-back, after-hours capture, and one inbox for every lead. Austin home service companies stop losing jobs to voicemail. Book a free call.",
    faqs: [
      {
        question: "What is missed-call text-back?",
        answer:
          "When you can't pick up, the caller gets a text from your business number within seconds, so they know you saw the call and don't move on to the next company.",
      },
      {
        question: "Do I have to change my phone number?",
        answer:
          "Usually not. We'll look at how your number is set up today and recommend the least disruptive way to add text-back and call tracking.",
      },
      {
        question: "Where do leads end up?",
        answer:
          "In one inbox, whether they came from a call, a text, your website, or Google. You can also get them by email or text, whatever you'll actually check.",
      },
    ],
  },
] as const satisfies readonly Service[];

export function getService(slug: (typeof services)[number]["slug"]): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unknown service: ${slug}`);
  return service;
}
