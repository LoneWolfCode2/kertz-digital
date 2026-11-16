// Deployment settings, read from environment variables.
// See .env.example for what each one does.

/**
 * Public origin of the site, used for canonical URLs, the sitemap, share
 * images, and structured data. Resolved in this order:
 *   1. NEXT_PUBLIC_SITE_URL (set this once the real domain is live)
 *   2. Vercel's production URL (e.g. https://kertz-digital.vercel.app)
 *   3. Local dev
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");

/**
 * Search indexing is OFF unless explicitly enabled, so test deployments
 * (placeholder phone, placeholder copy, temporary domain) never end up in
 * Google. Set NEXT_PUBLIC_ALLOW_INDEXING=true on the production environment
 * only, once the real domain and real details are in place.
 * Preview deployments are never indexed.
 */
export const allowIndexing =
  process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true" &&
  process.env.VERCEL_ENV !== "preview";
