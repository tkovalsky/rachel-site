export default function ContactForm() {
  return (
    <section id="contact" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Let’s talk about your move</h2>
        <p className="mt-2 text-slate-700">No pressure. Share your timing and must-haves.</p>

        {/* Quick today: Formspree. Later: /api/contact + Turnstile + Resend */}
        <form action="https://formspree.io/f/YOUR_ID" method="POST" className="mt-6 grid md:grid-cols-2 gap-4">
          <input required name="name" placeholder="Name" className="rounded-lg border border-slate-300 p-3" />
          <input required type="email" name="email" placeholder="Email" className="rounded-lg border border-slate-300 p-3" />
          <input name="phone" placeholder="Phone" className="rounded-lg border border-slate-300 p-3" />
          <input name="neighborhoods" placeholder="Neighborhoods of interest" className="rounded-lg border border-slate-300 p-3" />
          <textarea name="notes" placeholder="Timing, budget, must-haves…" className="md:col-span-2 rounded-lg border border-slate-300 p-3 h-28" />
          
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-1/2 md:w-1/3 rounded-lg bg-slate-900 px-6 py-3 text-white font-medium hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Send
            </button>
          </div>
          
        </form>

        <p className="mt-4 text-xs text-slate-500">
          By submitting, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
        </p>
      </div>
    </section>
  );
}