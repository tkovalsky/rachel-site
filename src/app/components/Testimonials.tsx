// src/app/components/Testimonials.tsx
"use client";
import { useMemo } from "react";

export type Review = {
  quote: string;
  author: string;
  role?: string;
};

// NEW: Define the type for the raw, un-normalized data 
// (which can use 'q'/'a' or 'quote'/'author' keys).
// The [key: string]: any is added to allow other keys if they exist in the raw data, 
// satisfying strict rules without breaking the component's expected shape.
export type RawReview = { q?: string; a?: string; quote?: string; author?: string; [key: string]: unknown; };


// simple deterministic hash
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return h;
}

export default function Testimonials({ items = [] as Review[] }) {
  const displayed = useMemo(() => {
    if (!items.length) return [];
    const copy = [...items].sort((a, b) => hash(a.quote) - hash(b.quote));
    return copy.slice(0, 2);
  }, [items]);

  return (
    <section id="testimonials" aria-label="Testimonials" className="border-t bg-white">
      <div className="section py-12">
        <h2 className="h2 text-center">What clients say</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {displayed.map((r) => (
            <blockquote key={r.quote} className="card p-6 text-ink">
              <p className="body-large leading-relaxed">"{r.quote}"</p>
              <footer className="mt-4 body-small text-ink-lighter">
                — {r.author}{r.role ? `, ${r.role}` : ""}
              </footer>
            </blockquote>
          ))}
          {displayed.length === 0 && <p className="body-small text-ink-lighter">Testimonials coming soon.</p>}
        </div>
      </div>
    </section>
  );
}