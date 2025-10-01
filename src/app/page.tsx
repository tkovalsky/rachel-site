import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Weekly Home-Watch",
    desc: "Interior & exterior walkthrough, AC & humidity check, leaks, doors/windows, mail, photo report.",
  },
  {
    title: "Monthly Home-Watch",
    desc: "Same checklist every month with documented photo report.",
  },
  {
    title: "One-Time Check / Pre-Arrival Reset",
    desc: "Full walkthrough before arrival. Fridge purge, deliveries, basic stocking on request.",
  },
];

export default function Page() {
  return (
    <div className="space-y-20">
      {/* HERO */}
      <section className="py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Trusted Home-Watch for Snowbirds & Seasonal Owners
            </h1>
            <p className="mt-4 text-slate-400">
              Palm Beach & Broward • Photo-verified visits • Licensed & insured • Compass-affiliated
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

          {/* IMPORTANT: parent must be relative when using fill */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow bg-slate-800">
            <Image
              src="/hero-home-exterior.jpg"       // << match EXACT filename in /public
              alt="South Florida home exterior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="section space-y-6">
        <h2 className="text-2xl font-bold">Services & Packages</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="card p-6">
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

      {/* SERVICE DETAIL IMAGE (optional banner) */}
      <section className="space-y-4">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
          <Image
            src="/service-detail.jpg"            // << drop your chosen interior/detail image here
            alt="Service detail interior"
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
          Palm Beach County: Delray Beach, Boca Raton, Boynton Beach, West Palm Beach • Broward County: Deerfield Beach,
          Pompano Beach, Coconut Creek and nearby communities.
        </p>
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-white/10">
        
          <Image
            src="/coverage.jpg"
            alt="Coverage map - Palm Beach & Broward"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
      </section>

      {/* TRUST / PEOPLE (optional) */}
      <section id="trust" className="space-y-4">
        <h2 className="text-2xl font-bold">Why HomeWatch Co.</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold">Compass-affiliated</h3>
            <p className="text-slate-300 mt-2">Professional standards, vetted local partners, concierge mindset.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold">Photo-verified visits</h3>
            <p className="text-slate-300 mt-2">Every visit documented—peace of mind when you’re away.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="font-semibold">Licensed & insured</h3>
            <p className="text-slate-300 mt-2">We take duty of care seriously—your property is treated like our own.</p>
          </div>
        </div>

        {/* trust image if you have one */}
        <div className="relative aspect-[3/2] rounded-2xl overflow-hidden border border-white/10 bg-slate-800">
          <Image
            src="/trust-people.jpg"              // << optional people image
            alt="Team meeting homeowner"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </section>

{/* PRICING */}
<section id="pricing" className="section space-y-6">
  <h2 className="text-2xl font-bold">Pricing</h2>
  <p className="text-slate-300 max-w-3xl">Straightforward plans with add-ons when you need them. Final pricing depends on property size and access.</p>

  <div className="grid md:grid-cols-3 gap-6">
    <div className="card p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-white">Weekly Home-Watch</h3>
      <p className="mt-1 text-3xl font-bold">$149<span className="text-base font-normal text-slate-400">/visit</span></p>
      <p className="text-slate-400 text-sm">Billed monthly</p>
      <ul className="mt-4 text-slate-300 text-sm list-disc pl-5 space-y-1">
        <li>Full interior & exterior check</li><li>AC temp & humidity</li><li>Leaks & breakers scan</li><li>Mail & deliveries</li><li>Photo-verified report</li>
      </ul>
      <a href="#contact" className="mt-auto inline-flex justify-center rounded-lg border border-white/20 px-4 py-2 font-semibold">Request quote</a>
    </div>

    <div className="card p-6 flex flex-col border-white/20 bg-white/10">
      <h3 className="text-lg font-semibold text-white">Monthly Home-Watch</h3>
      <p className="mt-1 text-3xl font-bold">$149<span className="text-base font-normal text-slate-400">/month</span></p>
      <p className="text-slate-400 text-sm">One documented visit monthly</p>
      <ul className="mt-4 text-slate-300 text-sm list-disc pl-5 space-y-1">
        <li>Interior & exterior check</li><li>AC temp & humidity</li><li>Leaks & breakers scan</li><li>Mail & deliveries</li><li>Photo-verified report</li>
      </ul>
      <a href="#contact" className="mt-auto inline-flex justify-center rounded-lg border border-white/20 px-4 py-2 font-semibold">Request quote</a>
    </div>

    <div className="card p-6 flex flex-col">
      <h3 className="text-lg font-semibold text-white">One-Time Check</h3>
      <p className="mt-1 text-3xl font-bold">$199<span className="text-base font-normal text-slate-400"> flat</span></p>
      <p className="text-slate-400 text-sm">Pre-arrival reset</p>
      <ul className="mt-4 text-slate-300 text-sm list-disc pl-5 space-y-1">
        <li>Full walkthrough & photo report</li><li>Fridge purge on request</li><li>Deliveries check</li>
      </ul>
      <a href="#contact" className="mt-auto inline-flex justify-center rounded-lg border border-white/20 px-4 py-2 font-semibold">Book inquiry</a>
    </div>
  </div>
</section>

      {/* CONTACT */}
      <section id="contact" className="space-y-6">
        <h2 className="text-2xl font-bold">Contact</h2>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <p className="text-slate-300">Prefer a message? We’ll respond quickly.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {/* TODO: replace with real info */}
            <a href="mailto:homewatch@example.com" className="rounded-lg border border-white/20 px-4 py-2">Email</a>
            <a href="tel:+15615550123" className="rounded-lg border border-white/20 px-4 py-2">Call</a>
            <a href="https://wa.me/15615550123" className="rounded-lg border border-white/20 px-4 py-2" target="_blank">WhatsApp</a>
          </div>
          <p className="text-xs text-slate-500 mt-3">
            By contacting us you agree to our basic Terms & Privacy.
          </p>
        </div>
      </section>
    </div>
  );
}