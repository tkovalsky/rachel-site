"use client";
import { useState } from "react";
import Link from "next/link";

type Review = { q: string; a: string };
export default function Testimonials({ items }: { items: Review[] }) {
  return (
    <section id="testimonials" className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-2xl font-semibold text-slate-900">Testimonials</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6" role="list">
          {items.map((t, i) => <Card key={i} q={t.q} a={t.a} />)}
        </div>
        <p className="mt-6 text-sm text-slate-700">
          Read all reviews on{" "}
          <Link href="https://www.zillow.com/profile/rachel-kovalsky4#reviews" className="underline underline-offset-4">
            Zillow
          </Link>.
        </p>
      </div>
    </section>
  );
}

function Card({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <figure className="rounded-xl border border-slate-200 bg-white p-6" role="listitem">
      <div aria-hidden="true" className="mb-3 flex gap-1 text-yellow-500">
        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
      </div>
      <blockquote className={`text-slate-800 ${open ? "" : "line-clamp-5"}`}>
        <p>“{q}”</p>
      </blockquote>
      <figcaption className="mt-3 text-sm text-slate-600">— {a}</figcaption>
      {q.length > 260 && (
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="mt-3 text-sm font-medium text-slate-800 underline underline-offset-4"
          aria-expanded={open}
        >
          {open ? "Show less" : "Read more"}
        </button>
      )}
    </figure>
  );
}