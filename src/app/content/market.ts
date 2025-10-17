import type { MarketStat } from "@/app/components/MarketHighlights";

export const MARKET_SEP_2025 = {
  cards: [
    { key: "median", label: "Median Sale Price", value: 675000, format: "currency", sublabel: "Sep 2025" },
    { key: "mois", label: "Months of Inventory", value: 3.1, format: "raw", sublabel: "Sep 2025" },
    { key: "yoy", label: "YoY Price Change", value: 4, format: "percent", sublabel: "vs Sep 2024" },
  ] as MarketStat[],
  source: { label: "BeachesMLS / local stats" },
};