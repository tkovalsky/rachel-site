import Image from "next/image";
import Link from "next/link";

const pricing = [
  {
    title: "Weekly Home-Watch",
    price: "$109",
    period: "/visit",
    note: "One documented visit per week",
    bullets: [
      "Full interior & exterior check",
      "AC temp & humidity",
      "Leaks & breakers scan",
      "Mail & deliveries",
      "Photo-verified report",
    ],
    cta: "Request quote",
  },
  {
    title: "Monthly Home-Watch",
    price: "$149",
    period: "/month",
    note: "Two documented visits each monthl",
    bullets: [
      "Interior & exterior check",
      "AC temp & humidity",
      "Leaks & breakers scan",
      "Mail & deliveries",
      "Photo-verified report",
    ],
    highlight: true,
    cta: "Request quote",
  },
  {
    title: "One-Time Check / Pre-Arrival Reset",
    price: "$199",
    period: " flat",
    note: "Pre-arrival reset",
    bullets: [
      "Full walkthrough & photo report",
      "Fridge purge on request",
      "Deliveries check",
    ],
    cta: "Book inquiry",
  },
];

export default function Page() {
  return (
    <div className="space-y-20">
      {/* HERO */}
      <section className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Trusted Home-Watch for Snowbirds & Seasonal Owners
          </h1>
          <p className="mt-4 text-slate-400">
            Serving Palm Beach & Broward • Photo-verified visits • Licensed & insured • Compass-affiliated
          </p>
          <div className="mt-6 flex gap-3 flex-wrap">
            <a href="#contact" className="inline-flex items-center rounded-lg bg-white/90 text-slate-900 px-5 py-3 font-semibold">
              Get in touch
            </a>
            <a href="#services" className="inline-flex items-center rounded-lg border border-white/20 px-5 py-3 font-semibold">
              See services
            </a>
          </div>
        </div>

        <div className="relative aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-slate-800">
          <Image
            src="/hero-home-exterior.jpg"
            alt="South Florida home exterior"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="space-y-6">
        <h2 className="text-2xl font-bold">Services & Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Weekly Home-Watch",
              desc:
                "Interior & exterior walkthrough, AC & humidity check, leaks, doors/windows, mail, photo report.",
            },
            {
              title: "Monthly Home-Watch",
              desc:
                "Same checklist once per month with a documented photo report.",
            },
            {
              title: "One-Time Check / Pre-Arrival Reset",
              desc:
                "Walkthrough before arrival. Fridge purge, deliveries, basic restocking on request.",
            },
          ].map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg font-semibold text-white">{s.title}</h3>
              <p className="mt-2 text-slate-300">{s.desc}</p>
              <ul className="mt-4 text-slate-300 text-sm list-disc pl-5 space-y-1">
                <li>Doors & windows check</li>
                <li>AC temp & humidity</li>
                <li>Leaks & breakers scan</li>
                <li>Mail & deliveries</li>
                <li>Photo-verified report</li>
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* BANNER DETAIL */}
      <section className="space-y-4">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
          <Image
            src="/service-detail.jpg"
            alt="Living room interior detail"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" className="space-y-6">
        <h2 className="text-2xl font-bold">Coverage Areas</h2>
        <p className="text-slate-300 max-w-3xl">
          Delray Beach, Boca Raton, Boynton Beach, West Palm Beach • Deerfield Beach, Pompano Beach, Coconut Creek, Coral Springs and nearby communities.
        </p>
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
          <Image
            src="/coverage-map.jpg"
            alt="Coverage map — Palm Beach & Broward"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* TRUST */}
      <section id="trust" className="space-y-6">
        <h2 className="text-2xl font-bold">Why Atlantic Home Watch</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold">Compass-affiliated</h3>
            <p className="text-slate-300 mt-2">Professional standards, vetted local partners, concierge mindset.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold">Photo-verified visits</h3>
            <p className="text-slate-300 mt-2">Every visit documented—peace of mind when you’re away.</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="font-semibold">Licensed & insured</h3>
            <p className="text-slate-300 mt-2">Your property is treated like our own.</p>
          </div>
        </div>

        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
          <Image
            src="/trust-people.jpg"
            alt="Meeting with homeowner"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="space-y-6">
        <h2 className="text-2xl font-bold">Pricing</h2>
        <p className="text-slate-300 max-w-3xl">
          Straightforward plans with add-ons when you need them. Final pricing depends on property size and access.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((p) => (
            <div
              key={p.title}
              className={`rounded-2xl border p-6 flex flex-col ${
                p.highlight ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10"
              }`}
            >
              <h3 className="text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-1 text-3xl font-bold">
                {p.price}
                <span className="text-base font-normal text-slate-400">{p.period}</span>
              </p>
              <p className="text-slate-400 text-sm">{p.note}</p>
              <ul className="mt-4 text-slate-300 text-sm list-disc pl-5 space-y-1">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <a href="#contact" className="mt-5 inline-flex justify-center rounded-lg border border-white/20 px-4 py-2 font-semibold">
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h4 className="font-semibold">Add-ons</h4>
          <ul className="mt-2 text-slate-300 text-sm list-disc pl-5 grid md:grid-cols-2 gap-1">
            <li>Storm prep / post-storm check — <span className="font-medium">$99</span></li>
            <li>Vendor meet & let-in (≤60 min) — <span className="font-medium">$79</span></li>
            <li>Vehicle start/run — <span className="font-medium">$29</span></li>
            <li>Deep clean coordination — <span className="font-medium">$49</span></li>
          </ul>
          <p className="text-xs text-slate-500 mt-3">Final quotes confirmed by address, access, and HOA rules.</p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="space-y-6">
        <h2 className="text-2xl font-bold">Contact</h2>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-slate-300">Prefer a message? We’ll respond quickly.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="mailto:info@AtlanticHomeWatch.com" className="rounded-lg border border-white/20 px-4 py-2">Email</a>
            <a href="tel:+15615550123" className="rounded-lg border border-white/20 px-4 py-2">Call</a>
            <a href="https://wa.me/15615550123" target="_blank" className="rounded-lg border border-white/20 px-4 py-2">WhatsApp</a>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            By contacting us you agree to our basic Terms & Privacy.
          </p>
        </div>
      </section>
    </div>
  );
}