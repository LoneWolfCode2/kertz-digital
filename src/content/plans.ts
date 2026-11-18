export type PlanName = "Found" | "Booked" | "Website only";

export type Plan = {
  name: PlanName;
  price: string;
  cadence: string;
  /** Extra line under the price, e.g. a one-time setup fee. */
  priceNote?: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Found",
    price: "$397",
    cadence: "/ month",
    summary: "For shops that already have a site but aren't showing up.",
    features: [
      "Google Business Profile management",
      "Automated review requests",
      "Directory listing cleanup",
      "Monthly visibility report",
    ],
  },
  {
    name: "Booked",
    price: "$797",
    cadence: "/ month",
    priceNote: "+ $750 one-time setup",
    summary: "The full system: get found, look credible, catch every lead.",
    features: [
      "Everything in Found",
      "Custom website, hosting, and updates",
      "Missed-call text-back",
      "Unified lead inbox",
    ],
    featured: true,
  },
  {
    name: "Website only",
    price: "$3,500",
    cadence: "one-time",
    summary: "A fast, credible site you own outright.",
    features: [
      "Mobile-first design and build",
      "Click-to-call and quote forms",
      "Basic on-page SEO",
      "30 days of post-launch fixes",
    ],
  },
];

/**
 * Founding client offer. To end it, set `enabled: false` (or delete this
 * block and its import in /pricing). That removes the banner and every
 * founding rate on the cards in one change.
 */
export const foundingOffer = {
  enabled: true,
  headline: "Founding client pricing: 5 spots",
  body: "I'm taking on my first five Austin-area clients at a reduced rate, locked in for 12 months. In return, I ask for a short case study and permission to feature your project.",
  rates: {
    Found: "Founding rate: $297/mo",
    Booked: "Founding rate: $597/mo, setup fee waived",
    "Website only": "Founding rate: $2,500",
  } satisfies Record<PlanName, string>,
};

export const pricingSmallPrint =
  "Monthly plans are month-to-month with no long-term contract. Prices exclude ad spend. Founding rates convert to standard pricing after 12 months.";
