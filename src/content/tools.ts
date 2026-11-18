// Free tools for trades owners. Shown on /tools; live tools get their own page.

export type Tool = {
  slug: string;
  title: string;
  blurb: string;
  /** e.g. "1 minute" */
  time: string;
  /** Not built yet: shown on /tools as "Coming soon", no link. */
  soon?: boolean;
};

export const tools: Tool[] = [
  {
    slug: "missed-call-calculator",
    title: "Missed-call cost calculator",
    blurb:
      "Enter your weekly calls and average job. See what voicemail costs you in a year.",
    time: "1 minute",
  },
  {
    slug: "google-profile-checklist",
    title: "Google profile checklist",
    blurb:
      "Tick off 12 things Google looks at. Get a score and the three fixes that matter most.",
    time: "2 minutes",
  },
  {
    slug: "review-request-text",
    title: "Review request text maker",
    blurb:
      "Pick your trade and tone. Get a short text to send happy customers, with your review link in it.",
    time: "1 minute",
    soon: true,
  },
  {
    slug: "busy-season-calendar",
    title: "Austin busy-season calendar",
    blurb:
      "When calls peak for each trade, month by month, so you can plan reviews and offers ahead of the rush.",
    time: "Reference",
    soon: true,
  },
];

export const toolHref = (slug: string) => `/tools/${slug}`;
