export type Industry = {
  label: string;
  /** Why missed calls hurt this trade in particular. */
  note: string;
};

export const industries: Industry[] = [
  { label: "HVAC", note: "Emergency calls go to whoever answers first." },
  { label: "Plumbing", note: "A burst pipe won't wait for a callback." },
  { label: "Electrical", note: "High-ticket jobs, short decision windows." },
  { label: "Roofing", note: "Storm season means a flood of leads at once." },
  { label: "Landscaping", note: "Seasonal demand, lots of quote requests." },
  { label: "Pest control", note: "Recurring plans start with one call." },
];
