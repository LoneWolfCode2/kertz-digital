/** Shared by the listing request form (client) and its server action. */
export const REQUESTS = [
  "Add my business",
  "Update my listing",
  "Remove my listing",
] as const;

export type ListingRequest = (typeof REQUESTS)[number];
