# Kertz Digital

Marketing site for Kertz Digital: websites and lead systems for Austin home
service companies.

Next.js 16 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · Motion ·
Biome.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint     # Biome lint + format check
npm run build    # production build
```

## Where things live

| What | Where |
| --- | --- |
| Business details (name, phone, service area, hours, CTA) | `src/content/site.ts` |
| Services, industries, pricing plans | `src/content/*.ts` |
| Pages | `src/app/**/page.tsx` |
| SEO helpers (metadata, structured data) | `src/lib/seo.ts`, `src/lib/schema.ts` |
| Site URL + indexing switch | `src/lib/env.ts` |

Placeholders are written as `[LIKE THIS]`; search for `[` to find them.

## Deploying to Vercel

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo. Framework is detected
   as Next.js; keep the default build settings.
3. Deploy. The site goes live at `https://<project>.vercel.app`. Every push to
   `main` redeploys production; other branches get preview URLs.

No environment variables are needed for a first deploy.

### Search indexing is off by default

Test deployments send `noindex` and a blocking `robots.txt`, so placeholder
content never reaches Google. When the real domain and details are live, set
these on the **Production** environment and redeploy:

| Variable | Value |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://kertzdigital.com` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | `true` |

Preview deployments are never indexed. See `.env.example`.

### Attaching the real domain

Vercel → Project → **Settings → Domains** → add `kertzdigital.com` and
`www.kertzdigital.com`, then follow the DNS instructions shown. Pick one as
primary and let Vercel redirect the other.
