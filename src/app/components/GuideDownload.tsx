// Newsletter signup (posts to /api/contact; hidden type=newsletter)
export default function GuideDownload() {
  return (
    <section aria-label="Newsletter signup" className="py-20 bg-surface-subtle">
      <div className="section">
        <div className="max-w-4xl mx-auto">
          <div className="card p-8 md:p-10">
            <div className="text-center mb-8">
              <h2 className="h2 text-deep mb-4">
                Weekly South Florida Market Notes
              </h2>
              <p className="body-large text-ink-soft max-w-2xl mx-auto">
                Short, useful updates on Delray, Boca & Boynton — new listings, price trends, and
                neighborhood spotlights. No spam.
              </p>
            </div>

            <form action="/api/contact" method="POST" className="max-w-2xl mx-auto">
              <input type="hidden" name="type" value="newsletter" />
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <label htmlFor="nl-email" className="sr-only">Email</label>
                <input
                  id="gd-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="youre@thebest.com"
                  className="flex-1 rounded-lg border border-divider bg-surface px-4 py-3 text-lg text-ink placeholder:text-ink-lighter focus:border-champagne focus:outline-none transition-colors"
                />
                {/* Honeypot */}
                <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                <button
                  type="submit"
                  className="btn-primary sm:w-auto"
                  aria-label="Subscribe to weekly market notes"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-center body-small text-ink-lighter">
                By subscribing you agree to our <a href="/privacy" className="text-champagne hover:underline">Privacy Policy</a>. Unsubscribe anytime.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}