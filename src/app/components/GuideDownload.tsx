"use client";

// src/app/components/GuideDownload.tsx
import { useEffect, useState } from "react";

export default function GuideDownload() {
  const [t, setT] = useState<number>(0);
  useEffect(() => setT(Date.now()), []);

  return (
    <section aria-label="Relocation guide download" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            Free Relocation Checklist — Delray &amp; Boca
          </h2>
          <p className="mt-2 text-slate-600">
            Insurance, HOAs, flood zones, clubs, neighborhoods — a no-fluff 2-page guide.
          </p>

          <form action="/api/contact" method="POST" className="mt-6 grid gap-3 md:grid-cols-3" aria-describedby="gd-consent">
            <label className="sr-only" htmlFor="gd-email">Email</label>
            <input
              id="gd-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="Your email"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
            />

            {/* optional: a default message for the API email body */}
            <input type="hidden" name="message" value="Guide request" />

            {/* Spam controls */}
            <input type="hidden" name="_t" value={t} />
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <button
              type="submit"
              className="w-full rounded-md bg-slate-900 px-4 py-2 font-medium text-white hover:bg-black md:col-span-1 md:justify-self-start"
            >
              Email me the checklist
            </button>

            <p className="md:col-span-3 text-xs text-slate-500" id="gd-consent">
              By submitting, you agree to receive an email with the guide. You can opt out anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}