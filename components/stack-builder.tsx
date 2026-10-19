"use client";

import { useEffect, useState } from "react";
import { ToolIcon } from "@/components/tool-icon";
import { quote, STACK_PRICE, TOOLS, type ToolId } from "@/lib/stack";

const ALL = Object.keys(TOOLS) as ToolId[];

const KITS: { name: string; tools: ToolId[] }[] = [
  { name: "Launch kit", tools: ["competitor", "content-os", "seo"] },
  { name: "Ads kit", tools: ["ads", "sentiment", "competitor"] },
  { name: "Creator kit", tools: ["content-os", "seo"] },
  { name: "Everything", tools: ALL },
];

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

export function StackBuilder() {
  const [picked, setPicked] = useState<ToolId[]>(["content-os", "seo"]);

  // Selection lives in the URL so stacks can be shared.
  useEffect(() => {
    const s = new URLSearchParams(location.search).get("stack");
    // Read after hydration so the static HTML stays cacheable.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (s) setPicked(s.split(",").filter((id): id is ToolId => id in TOOLS));
  }, []);

  const update = (next: ToolId[]) => {
    setPicked(next);
    const url = new URL(location.href);
    url.searchParams.set("stack", next.join(","));
    history.replaceState(null, "", url);
  };

  const toggle = (id: ToolId) => update(picked.includes(id) ? picked.filter((p) => p !== id) : [...picked, id]);
  const q = quote(picked);
  const toStack = STACK_PRICE - q.total;

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <div>
        <div className="mb-6 flex flex-wrap gap-3">
          {KITS.map((k) => (
            <button
              key={k.name}
              onClick={() => update(k.tools)}
              className="neu lift rounded-full px-4 py-2 text-sm text-fg-2 hover:text-fg active:neu-in"
            >
              {k.name}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {ALL.map((id) => {
            const t = TOOLS[id];
            const on = picked.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                aria-pressed={on}
                className={`spot relative flex items-start gap-4 rounded-2xl p-5 text-left transition-[box-shadow,transform] duration-500 ease-out-expo active:scale-[0.99] ${on ? "neu-in" : "neu hover:-translate-y-0.5"}`}
              >
                <span className={`transition ${on ? "" : "opacity-50 grayscale"}`}>
                  <ToolIcon id={id} size={44} />
                </span>
                <span className="flex-1">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="font-semibold" style={{ fontStretch: "112%" }}>
                      {t.name}
                    </span>
                    <span className="font-mono text-sm text-fg-2">{usd(t.price)}</span>
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-fg-3">{t.line}</span>
                </span>
                <span aria-hidden className={`absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-signal text-xs font-bold text-signal-ink shadow-[0_4px_12px_-2px_rgb(198_241_53/0.7)] transition duration-300 ease-[var(--ease-spring)] ${on ? "scale-100" : "scale-0"}`}>
                  ✓
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="neu sticky bottom-3 h-fit rounded-3xl p-6 lg:top-24">
        <div className="label">Your stack · {picked.length} of {ALL.length}</div>
        <div className="mt-4 hidden min-h-12 flex-col-reverse gap-1 lg:flex">
          {picked.map((id) => (
            <div key={id} className="rise flex items-center gap-2 text-sm">
              <ToolIcon id={id} size={22} />
              {TOOLS[id].name}
            </div>
          ))}
        </div>
        <dl className="neu-in mt-5 space-y-1.5 rounded-2xl p-4 font-mono text-sm">
          <div className="flex justify-between text-fg-3">
            <dt>List</dt>
            <dd className={q.savings ? "line-through" : ""}>{usd(q.list)}</dd>
          </div>
          {q.savings > 0 && (
            <div className="flex justify-between text-signal-text">
              <dt>{q.isStack ? "The Stack" : `Combo −${Math.round(q.pct * 100)}%`}</dt>
              <dd>−{usd(q.savings)}</dd>
            </div>
          )}
          <div className="flex items-baseline justify-between pt-1 text-fg">
            <dt>One-time</dt>
            <dd className="display text-3xl" style={{ letterSpacing: "-0.02em" }}>
              {usd(q.total)}
            </dd>
          </div>
        </dl>

        <p className="mt-3 min-h-10 text-sm text-fg-2">
          {q.isStack
            ? "Every tool, plus every tool we release in your first year."
            : q.next
              ? `Add ${q.next.need} more → save ${Math.round(q.next.pct * 100)}%.`
              : null}
          {!q.isStack && picked.length > 0 && toStack <= STACK_PRICE * 0.25 && (
            <button onClick={() => update(ALL)} className="block text-signal-text underline underline-offset-4">
              Get all {ALL.length} for {toStack ? `just ${usd(toStack)} more` : "the same price"}
            </button>
          )}
        </p>

        <button
          disabled={!picked.length}
          className="btn mt-4 w-full rounded-xl py-3.5 disabled:opacity-40"
        >
          Own this stack →
        </button>
        <p className="mt-3 text-center text-xs text-fg-3">Pay once · 12 months of updates · runs on your servers</p>
      </aside>
    </div>
  );
}
