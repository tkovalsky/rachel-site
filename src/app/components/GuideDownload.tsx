// Newsletter signup (posts to /api/contact; hidden type=newsletter)
export default function GuideDownload() {
  return (
    <section aria-label="Newsletter signup" className="section-alt">
      <div className="section py-16">
        <div className="card p-8 md:p-10">
          <h2 className="h2 text-deep">
            Weekly South Florida Market Notes
          </h2>
          <p className="mt-4 body-large text-ink-soft">
            Short, useful updates on Delray, Boca & Boynton — new listings, price trends, and
            neighborhood spotlights. No spam.
          </p>

          <form action="/api/contact" method="POST" className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
            <input type="hidden" name="type" value="newsletter" />
            <label htmlFor="nl-email" className="sr-only">Email</label>
            <input
              id="gd-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="youre@thebest.com"
              className="w-full rounded-lg border border-divider bg-surface px-4 py-3 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors"
            />
            {/* Honeypot */}
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <button
              type="submit"
              className="btn-primary md:col-span-1 md:justify-self-start"
              aria-label="Subscribe to weekly market notes"
            >
              Subscribe
            </button>
            <p className="md:col-span-2 body-small text-ink-lighter">
              By subscribing you agree to our <a href="/privacy" className="text-champagne hover:underline">Privacy Policy</a>. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}