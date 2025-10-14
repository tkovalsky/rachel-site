import Link from "next/link";
import { TESTIMONIALS } from "../content/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Testimonials</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {TESTIMONIALS.map((t, i) => (
            <blockquote key={i} className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-slate-800">“{t.q}”</p>
              <footer className="mt-3 text-sm text-slate-500">— {t.a}</footer>
            </blockquote>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-600">
          See more reviews on{" "}
          <Link href="https://www.zillow.com/profile/" className="underline underline-offset-4">Zillow</Link>.
        </p>
      </div>
    </section>
  );
}