export default function ContactForm() {
  return (
    <section id="contact" className="border-t border-brand-100 bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-ink">
          Let’s talk about your move
        </h2>
        <p className="mt-2 text-ink-soft">
          No pressure. Share your timing and must-haves.
        </p>

        <form
          action="https://formspree.io/f/YOUR_ID"
          method="POST"
          className="mt-6 grid md:grid-cols-2 gap-4"
        >
          <input
            required
            name="name"
            placeholder="Name"
            className="rounded-lg border border-brand-200 bg-white p-3 text-ink placeholder-ink-lighter focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          />
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            className="rounded-lg border border-brand-200 bg-white p-3 text-ink placeholder-ink-lighter focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          />
          <input
            name="phone"
            placeholder="Phone"
            className="rounded-lg border border-brand-200 bg-white p-3 text-ink placeholder-ink-lighter focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          />
          <input
            name="neighborhoods"
            placeholder="Neighborhoods of interest"
            className="rounded-lg border border-brand-200 bg-white p-3 text-ink placeholder-ink-lighter focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          />
          <textarea
            name="notes"
            placeholder="Timing, budget, must-haves…"
            className="md:col-span-2 rounded-lg border border-brand-200 bg-white p-3 h-28 text-ink placeholder-ink-lighter focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400"
          />

          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/2 md:w-1/3 rounded-lg bg-brand-600 px-6 py-3 font-medium text-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
            >
              Send
            </button>
          </div>
        </form>

        <p className="mt-4 text-xs text-ink-lighter">
          By submitting, you agree to our{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>.
        </p>
      </div>
    </section>
  );
}