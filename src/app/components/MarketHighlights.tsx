// src/app/components/MarketHighlights.tsx
import { DynamicMarketData } from './DynamicContent';

export interface MarketStat {
  key: string;
  label: string;
  value: number;
  format: 'currency' | 'percent' | 'raw';
  sublabel: string;
}

type Props = {
  items?: MarketStat[];
  source?: { label: string };
  area?: string;
  limit?: number;
  randomize?: boolean;
};

export default function MarketHighlights({ area, limit = 3, randomize = true }: Props) {
  return (
    <section aria-label="Market Snapshot" className="border-t border-divider bg-surface">
      <div className="section py-16">
        <h2 className="h2 text-deep">Market Snapshot</h2>

        <div className="mt-8">
          <DynamicMarketData 
            area={area}
            limit={limit}
            randomize={randomize}
          />
        </div>

        <p className="mt-8 body-small text-ink-lighter">
          Source: BeachesMLS / local stats
        </p>
      </div>
    </section>
  );
}