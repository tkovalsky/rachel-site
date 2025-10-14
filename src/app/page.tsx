// src/app/page.tsx
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* HERO */}
      <section className="bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
              Delray &amp; Boca Real Estate — <span className="font-light">Consultative, No-Pressure.</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Helping professionals and retirees relocate or find their next home in Delray Beach, Boca Raton,
              and nearby coastal towns.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#contact" className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-black">
                Start your home search
              </a>
              <Link
                href="https://www.compass.com/agents/rachel-kovalsky/"
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-50"
              >
                View Compass profile
              </Link>
            </div>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>• Specializing in Delray Beach, Boca Raton, Boynton Beach, Deerfield Beach, West Palm Beach</li>
              <li>• Relocation &amp; second-home expertise • Coastal &amp; walkable neighborhoods</li>
              <li>• Personalized guidance from search to close</li>
            </ul>
          </div>

          <div className="md:justify-self-center">
            {/* Placeholder until you pick the final headshot */}
            <Image
              src="/rachel.jpeg"
              alt="Rachel Kovalsky"
              width={480}
              height={600}
              className="rounded-xl border border-slate-200 object-cover shadow-sm"
              unoptimized
            />
          </div>
        </div>
      </section>

      {/* AREAS OF FOCUS */}
      <section id="areas" className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Areas of Focus</h2>
          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Delray Beach",
              "Downtown, Lake Ida, Tropic Isle, Seagate",
              "Boca Raton",
              "Boca Square, East Boca, Addison Reserve",
              "Boynton, Deerfield, Highland Beach, Gulf Stream",
              "West Palm & nearby coastal towns",
            ].map((a) => (
              <div key={a} className="rounded-lg border border-slate-200 bg-white p-4 text-slate-700">
                {a}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">About Rachel</h2>
          <p className="mt-4 text-slate-700 leading-relaxed">
            Full-time South Florida Realtor® with a consultative approach — understands your needs, timing, and lifestyle
            before recommending neighborhoods and homes. Specializes in helping relocating buyers navigate coastal
            communities, HOA considerations, insurance realities, and true walkability.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              "Relocation & second-home guidance",
              "Neighborhood expertise in Delray & Boca",
              "Trusted vendor network (inspectors, lenders, insurance)",
            ].map((h) => (
              <div key={h} className="rounded-lg border border-slate-200 bg-white p-4 text-slate-700">
                {h}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Testimonials</h2>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            {[
              {
                q: "Rachel made our move to Delray so smooth. She listened, advised, and kept us on track.",
                a: "J. & A., New York → Delray",
              },
              {
                q: "We felt informed at every step. Great neighborhood knowledge and lender introductions.",
                a: "S. Patel, Boca Raton",
              },
            ].map((t, i) => (
              <blockquote key={i} className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-slate-800">“{t.q}”</p>
                <footer className="mt-3 text-sm text-slate-500">— {t.a}</footer>
              </blockquote>
            ))}
          </div>

          <p className="mt-4 text-sm text-slate-600">
            See more reviews on{" "}
            <Link href="https://www.zillow.com/profile/" className="underline underline-offset-4">
              Zillow
            </Link>
            .
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12">
          <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Let’s talk about your move</h2>
          <p className="mt-2 text-slate-700">No pressure. Tell me what you’re solving for and your timeline.</p>

          {/* Quick now: Formspree. Swap to /api/contact later. */}
          <form action="https://formspree.io/f/YOUR_ID" method="POST" className="mt-6 grid md:grid-cols-2 gap-4">
            <input required name="name" placeholder="Name" className="rounded-lg border border-slate-300 p-3" />
            <input required type="email" name="email" placeholder="Email" className="rounded-lg border border-slate-300 p-3" />
            <input name="phone" placeholder="Phone" className="rounded-lg border border-slate-300 p-3" />
            <input name="neighborhoods" placeholder="Neighborhoods of interest" className="rounded-lg border border-slate-300 p-3" />
            <textarea
              name="notes"
              placeholder="Timing, budget, must-haves…"
              className="md:col-span-2 rounded-lg border border-slate-300 p-3 h-28"
            />
            <button className="md:col-span-2 inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-3 text-white hover:bg-black">
              Send
            </button>
          </form>

          <p className="mt-4 text-xs text-slate-500">
            By submitting, you agree to our <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}