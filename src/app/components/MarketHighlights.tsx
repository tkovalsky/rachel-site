// src/app/components/MarketHighlights.tsx
export type Format = "currency" | "integer" | "percent" | "raw";

export type MarketStat = {
  key?: string;
  label: string;
  value?: number | string;
  format?: Format;
  sublabel?: string;
};

type Source = { label: string; href?: string };

type Props = {
  items?: MarketStat[];
  source?: Source;
};

export default function MarketHighlights({ items = [], source }: Props) {
  return (
    <section aria-label="Market Snapshot" className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <h2 className="text-xl md:text-2xl font-semibold text-slate-900">Market Snapshot</h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((m) => {
            const v =
              m.value == null
                ? "—"
                : m.format === "currency"
                ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 })
                    .format(Number(m.value))
                : m.format === "percent"
                ? `${Number(m.value).toFixed(0)}%`
                : m.format === "integer"
                ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(Number(m.value))
                : String(m.value);

            return (
              <div key={m.key ?? m.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <div className="text-4xl font-semibold tracking-tight text-slate-900">{v}</div>
                <div className="mt-2 text-lg text-slate-800">{m.label}</div>
                {m.sublabel && <div className="mt-3 text-sm text-slate-500">{m.sublabel}</div>}
              </div>
            );
          })}
        </div>

        {source && (
          <p className="mt-6 text-xs text-slate-500">
            Source:{" "}
            {source.href ? (
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                {source.label}
              </a>
            ) : (
              source.label
            )}
          </p>
        )}
      </div>
    </section>
  );
}