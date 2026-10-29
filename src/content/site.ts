export const site = {
  name: "Kertz Digital",
  location: "Austin, TX",
  phone: { display: "(512) 555-0142", href: "tel:+15125550142" },
  services: [
    {
      label: "Local Visibility",
      href: "/local-visibility",
      blurb: "Get found on Google",
    },
    {
      label: "Websites",
      href: "/websites",
      blurb: "Look credible, convert visitors",
    },
    {
      label: "Lead Streamlining",
      href: "/lead-streamlining",
      blurb: "Never miss a call",
    },
  ],
  nav: [
    { label: "Services", href: "/services" },
    { label: "Industries", href: "/industries" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ],
  cta: { label: "Book a call", href: "/book" },
} as const;
