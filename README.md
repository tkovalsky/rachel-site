# Rachel Real Estate — Next.js (App Router + Tailwind)

Opinionated, fast, and simple. No IDX. We link to Compass for search.

## Tech
- Next.js 15 (App Router), TypeScript
- Tailwind CSS
- Vercel deploys on `main`

---

## Run locally
```bash
npm i
npm run dev


##Build
npm run build && npm start

##Content structure
src/app/content/
  areas.ts                 # Areas of focus (for home page grid)
  testimonials.ts          # Manual testimonials (copy/paste from Zillow)
  cities/
    delray-beach.ts
    boca-raton.ts
    boynton-beach.ts
  developments/            # Optional: individual neighborhoods/clubs
    addison-reserve.ts

    Example: src/app/content/testimonials.ts
    export const TESTIMONIALS = [
  {
    q: "We feel incredibly lucky to have worked with Rachel ... We’re forever grateful.",
    a: "Bought in Woodfield (Boca Raton), 2025",
  },
  {
    q: "We recently sold our home in Delray and bought in Boynton ... We are very thankful ...",
    a: "Sold & Bought • Delray → Boynton, 2025",
  },
  {
    q: "Rachel exceeded all expectations ... excellent communication ...",
    a: "Bought in Boca Raton, 2025",
  },
  {
    q: "First long-distance purchase. Rachel understood the market and our likes ...",
    a: "Bought in Boynton Beach, 2024",
  },
];


TO Update testimonials
	1.	Edit src/app/content/testimonials.ts with new reviews.
	2.	Keep 3–8 items. Long quotes are fine (UI clamps).
	3.	Save → push → Vercel redeploys.



External links (a11y)

All external links must use:
<a href="https://..." target="_blank" rel="noopener noreferrer">...</a>