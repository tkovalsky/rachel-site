type Props = { areas: string[] };

export default function AreasGrid({ areas }: Props) {
  return (
    <section id="areas" className="border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Areas of Focus</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {areas.map(a => (
            <div key={a} className="rounded-lg border border-slate-200 bg-white p-4 text-slate-700">{a}</div>
          ))}
        </div>
      </div>
    </section>
  );
}