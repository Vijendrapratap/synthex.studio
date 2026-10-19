// Single source of truth for tools and combo pricing.
// The Stack Builder UI and (later) the checkout API both call quote().
// Placeholder names, prices and hues: swap for the real catalog.

export type Tool = {
  name: string;
  stage: "Research" | "Create" | "Advertise" | "Analyze";
  price: number;
  hue: number; // per-tool accent, oklch hue
  line: string;
  sample: string[]; // fake terminal output shown on the card
};

export const TOOLS = {
  "content-os": {
    name: "Content OS",
    stage: "Create",
    price: 199,
    hue: 85,
    line: "Research, write and schedule a month of posts in one afternoon.",
    sample: ["researching 42 trending topics", "drafted 30 posts · 4 channels", "scheduled · next post Tue 9:00"],
  },
  competitor: {
    name: "Competitor Research",
    stage: "Research",
    price: 149,
    hue: 25,
    line: "Know what your rivals ship, price and post before they do.",
    sample: ["tracking 6 competitors", "3 new pricing pages detected", "weekly brief ready"],
  },
  sentiment: {
    name: "Market Sentiment",
    stage: "Analyze",
    price: 129,
    hue: 300,
    line: "Hear what the market says about you across reviews, Reddit and socials.",
    sample: ["12,480 mentions scanned", "sentiment +8% this week", "top complaint: shipping time"],
  },
  ads: {
    name: "Ads Harness",
    stage: "Advertise",
    price: 199,
    hue: 200,
    line: "Generate ad variants, launch them and see which ones actually convert.",
    sample: ["24 ad variants generated", "meta + google synced", "winner: variant 7 · CTR 3.9%"],
  },
  seo: {
    name: "SEO",
    stage: "Research",
    price: 149,
    hue: 145,
    line: "Find the keywords you can win and the briefs to win them.",
    sample: ["crawled 1,204 pages", "86 quick-win keywords", "18 content briefs drafted"],
  },
} satisfies Record<string, Tool>;

export type ToolId = keyof typeof TOOLS;

export const STACK_PRICE = 529;

// Best tier wins, discounts never stack. Ordered high → low.
const TIERS = [
  [4, 0.2],
  [3, 0.15],
  [2, 0.1],
] as const;

export function quote(ids: string[]) {
  const picked = [...new Set(ids)].filter((id): id is ToolId => id in TOOLS);
  const n = picked.length;
  const list = picked.reduce((sum, id) => sum + TOOLS[id].price, 0);
  const isStack = n === Object.keys(TOOLS).length;
  const pct = TIERS.find(([min]) => n >= min)?.[1] ?? 0;
  const total = isStack ? STACK_PRICE : Math.min(Math.round(list * (1 - pct)), STACK_PRICE);
  const tier = TIERS.findLast(([min]) => min > n);
  const next = isStack || !tier ? null : { need: tier[0] - n, pct: tier[1] };
  return { list, pct, total, savings: list - total, isStack, next };
}
