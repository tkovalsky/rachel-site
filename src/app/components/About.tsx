type Props = { intro: string; bullets: string[] };

export default function About({ intro, bullets }: Props) {
  return (
    <section id="about" className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">About Rachel</h2>

        <p className="mt-4 text-slate-700 leading-relaxed">{intro}</p>

        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {bullets.map((h) => (
            <div
              key={h}
              className="rounded-lg border border-slate-200 bg-white p-4 text-slate-700"
            >
              {h}
            </div>
          ))}
        </div>

        <p className="mt-6 text-sm text-slate-600">
          Affiliated with Compass Florida, LLC (Koolik Group).{" "}
          <a
            href="https://koolik.com/meet-rachel-kovalsky/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:text-slate-800"
          >
            View Rachel’s Koolik profile
          </a>.
        </p>
      </div>
    </section>
  );
}