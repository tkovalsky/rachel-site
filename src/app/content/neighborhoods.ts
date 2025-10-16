// src/app/content/neighborhoods.ts

export type Neighborhood = {
  slug: string;
  title: string;
  blurb: string;
  imageSrc: string;  // path under /public
  href?: string;     // optional custom link override
};

// Keep image paths tidy (assuming files live in /public/neighborhoods)
const IMG = (file: string) => `/neighborhoods/${file}`;

// Base entries (no JSX here!)
const BASE: Omit<Neighborhood, "href">[] = [
  {
    slug: "delray-beach",
    title: "Delray Beach",
    blurb: "Walkable Atlantic Ave, beaches, lively dining.",
    imageSrc: IMG("delray-beach-east-delray.jpg"),
  },
  {
    slug: "boca-raton",
    title: "Boca Raton",
    blurb: "Schools, clubs, gated communities, coastal living.",
    // If your real filename is different (e.g., .webp only), update below:
    imageSrc: IMG("boca-raton-mizner.jpg.webp"),
  },
  {
    slug: "boynton-beach",
    title: "Boynton Beach",
    blurb: "Great value, newer builds, easy access.",
    imageSrc: IMG("boynton-beach-inet.jpg"),
  },
];

// Final export — auto-add href to point at /areas/[slug]
export const NEIGHBORHOODS: Neighborhood[] = BASE.map((n) => ({
  ...n,
  href: `/areas/${n.slug}`,
}));