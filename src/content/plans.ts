// TODO: placeholder pricing. Replace with real numbers before launch.

export type Plan = {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Found",
    price: "$000",
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
    price: "$000",
    cadence: "/ month",
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
    price: "$0,000",
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
