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
    <section aria-label="Market Snapshot" className="border-t border-divider bg-surface">
      <div className="section py-16">
        <h2 className="h2 text-deep">Market Snapshot</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
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
              <div key={m.key ?? m.label} className="card p-6">
                <div className="text-5xl md:text-6xl font-bold tracking-tight text-deep">{v}</div>
                <div className="mt-3 body-large text-ink">{m.label}</div>
                {m.sublabel && <div className="mt-4 body-small text-ink-lighter">{m.sublabel}</div>}
              </div>
            );
          })}
        </div>

        {source && (
          <p className="mt-8 body-small text-ink-lighter">
            Source:{" "}
            {source.href ? (
              <a href={source.href} target="_blank" rel="noopener noreferrer" className="text-champagne hover:underline">
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