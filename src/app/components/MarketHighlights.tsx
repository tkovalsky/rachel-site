// src/app/components/MarketHighlights.tsx
type Highlight = { label: string; value: string; note?: string };

export default function MarketHighlights({ items, ctaHref }: { items: Highlight[]; ctaHref?: string }) {
  return (
    <section aria-label="Market highlights" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Market Snapshot</h2>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <div key={it.label} className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <div className="text-3xl font-semibold text-slate-900">{it.value}</div>
              <div className="mt-1 text-sm text-slate-600">{it.label}</div>
              {it.note && <div className="mt-2 text-xs text-slate-500">{it.note}</div>}
            </div>
          ))}
        </div>
        {ctaHref && (
          <div className="mt-6">
            <a
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get the latest report
              <span aria-hidden>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}