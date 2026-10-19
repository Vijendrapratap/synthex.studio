"use client";

import { useState } from "react";
import { STACK_PRICE } from "@/lib/stack";

const usd = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

// Uses the visitor's own numbers, so no competitor prices are claimed.
export function Savings() {
  const [monthly, setMonthly] = useState(300);
  const [years, setYears] = useState(3);
  const rent = monthly * 12 * years;
  const saved = rent - STACK_PRICE;
  const ownShare = Math.min(100, (STACK_PRICE / Math.max(rent, 1)) * 100);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="neu space-y-8 rounded-3xl p-7">
        <label className="block">
          <span className="flex items-baseline justify-between text-sm text-fg-2">
            What you pay for marketing tools each month <span className="font-mono text-lg text-fg">{usd(monthly)}</span>
          </span>
          <input type="range" min={50} max={2000} step={10} value={monthly} onChange={(e) => setMonthly(+e.target.value)} className="mt-4 w-full accent-[var(--signal)]" />
        </label>
        <label className="block">
          <span className="flex items-baseline justify-between text-sm text-fg-2">
            Over how many years <span className="font-mono text-lg text-fg">{years}</span>
          </span>
          <input type="range" min={1} max={5} value={years} onChange={(e) => setYears(+e.target.value)} className="mt-4 w-full accent-[var(--signal)]" />
        </label>
        <p className="text-xs leading-relaxed text-fg-3">
          Count everything: scheduling, social listening, SEO, ad tools and AI writing seats. Owning means you also pay
          your AI provider for usage, usually a few dollars to a few tens of dollars a month.
        </p>
      </div>

      <div className="glass spot relative overflow-hidden rounded-3xl p-7">
        <div className="space-y-5">
          <div>
            <div className="flex justify-between text-sm text-fg-2">
              <span>Renting for {years} {years === 1 ? "year" : "years"}</span>
              <span className="font-mono text-fg">{usd(rent)}</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-[oklch(0.68_0.18_25)]" />
          </div>
          <div>
            <div className="flex justify-between text-sm text-fg-2">
              <span>Owning The Stack</span>
              <span className="font-mono text-fg">{usd(STACK_PRICE)} once</span>
            </div>
            <div className="mt-2 h-3 rounded-full bg-ink-3">
              <div className="h-full rounded-full bg-signal transition-all duration-700 ease-out-expo" style={{ width: `${ownShare}%` }} />
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-line pt-6">
          <div className="label">{saved > 0 ? "You keep" : "Break-even"}</div>
          <div className="display mt-2 text-[clamp(2.6rem,6vw,4.5rem)] text-signal-text" style={{ letterSpacing: "-0.03em" }}>
            {saved > 0 ? usd(saved) : `${Math.ceil(STACK_PRICE / monthly)} months`}
          </div>
          <p className="mt-2 text-sm text-fg-3">
            {saved > 0 ? `Renting costs ${(rent / STACK_PRICE).toFixed(1)}× more than owning.` : "After that, every month is money you keep."}
          </p>
        </div>
      </div>
    </div>
  );
}
