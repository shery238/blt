# Business Technique Limited website

Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Run locally
```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Before launch (required)
1. **Brand colours**: replace the RGB tokens at the top of `app/globals.css` with colours from businesstechltd.co.uk.
2. **Logo**: add the real SVG to `public/brand/` and update `components/Logo.tsx` and `lib/site.ts`.
3. **Contact details**: fill in email, phone, address, company number and socials in `lib/site.ts` (unset values stay hidden).
4. **Use cases** (`content/use-cases.ts`): match each draft to a Cloud Design Lab page, record `sourceRef`, rewrite and set `status: "approved"`.
5. **Solutions / insights**: approve in `content/solutions.ts` and `content/insights.ts` (insights need `author` and `publishedAt`).
6. **Compliance** (`content/ecosystem.ts`): set real status (certified / registered / aligned / working-towards) with evidence.
7. **Partnerships**: only set `partnership` on a technology when officially verified.
8. **Privacy notice**: review `app/privacy/page.tsx` with your data protection lead.
9. Set `NEXT_PUBLIC_SHOW_DRAFTS=false` to hide everything unapproved.

## Contact form
Uses Resend. Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Optional Cloudflare Turnstile via
`NEXT_PUBLIC_TURNSTILE_SITE_KEY` + `TURNSTILE_SECRET_KEY`. Without email config, production returns a clear error.
The in-memory rate limit is per instance; use Upstash Redis or similar for multi-instance hosting.

## Getting found on Google
1. Deploy (Vercel recommended) on https://businesstechltd.co.uk and set `NEXT_PUBLIC_SITE_URL`.
2. Verify the domain in Google Search Console (`NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, or DNS).
3. Submit `https://businesstechltd.co.uk/sitemap.xml`.
4. Redirect old URLs from the current site to their new equivalents (add `redirects()` in `next.config.mjs`) to keep existing rankings.
5. Publish approved use cases and insights regularly; drafts are `noindex` and excluded from the sitemap.

Built in: per-page titles, descriptions and canonicals, Open Graph/Twitter cards, generated OG image,
Organization / WebSite / Service / BreadcrumbList / Article JSON-LD, sitemap, robots, manifest,
static pre-rendering, self-hosted fonts, security headers and CSP.

## Content structure
All editable content is typed in `content/`, with a `status` field (draft / in-review / approved),
ready to move into a headless CMS (Sanity, Contentful, Payload) by replacing these imports with fetches.

## Analytics
Plausible loads only after consent when `NEXT_PUBLIC_ANALYTICS_DOMAIN` is set.
