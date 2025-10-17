import type { MarketStat } from "@/app/components/MarketHighlights";

export const MARKET_SEP_2025: {
  cards: MarketStat[];
  source?: { label: string; href?: string };
} = {
  cards: [
    {
      key: "median-sale",
      label: "Median sale price (Boca/Delray)",
      value: 985000,
      format: "currency",
      sublabel: "Last 90 days"
    },
    {
      key: "dom",
      label: "Median days on market",
      value: 31,
      format: "integer",
      sublabel: "30–90 day trend"
    },
    {
      key: "cash",
      label: "% cash buyers",
      value: 42,
      format: "percent",
      sublabel: "Estimate, market dependent"
    }
  ],
  source: {
    label: "Local MLS + Public Recorder (illustrative)",
    href: "#"
  }
};
