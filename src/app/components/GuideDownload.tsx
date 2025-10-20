// Newsletter signup (posts to /api/contact; hidden type=newsletter)
export default function GuideDownload() {
  return (
    <section aria-label="Newsletter signup" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">
            Weekly South Florida Market Notes
          </h2>
          <p className="mt-2 text-slate-600">
            Short, useful updates on Delray, Boca & Boynton — new listings, price trends, and
            neighborhood spotlights. No spam.
          </p>

          <form action="/api/contact" method="POST" className="mt-6 grid gap-3 md:grid-cols-[1fr_auto]">
            <input type="hidden" name="type" value="newsletter" />
            <label htmlFor="nl-email" className="sr-only">Email</label>
            <input
              id="gd-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="youre@thebest.com"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-ink placeholder-slate-400 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
            />
            {/* Honeypot */}
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button
              type="submit"
              className="w-full rounded-md bg-brand-600 px-4 py-2 font-medium text-white transition hover:bg-brand-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 md:col-span-1 md:justify-self-start"
              aria-label="Subscribe to weekly market notes"
            >
              Subscribe
            </button>
            <p className="md:col-span-2 text-xs text-slate-500">
              By subscribing you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}