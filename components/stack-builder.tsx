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
        <div className="mb-4 flex flex-wrap gap-2">
          {KITS.map((k) => (
            <button
              key={k.name}
              onClick={() => update(k.tools)}
              className="rounded-full border border-line-2 px-4 py-2 text-sm text-fg-2 transition hover:border-fg-3 hover:text-fg"
            >
              {k.name}
            </button>
          ))}
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {ALL.map((id) => {
            const t = TOOLS[id];
            const on = picked.includes(id);
            return (
              <button
                key={id}
                onClick={() => toggle(id)}
                aria-pressed={on}
                className={`flex items-start gap-4 rounded-2xl border p-5 text-left transition duration-300 ease-out-expo ${on ? "border-fg bg-ink-1 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.35)]" : "border-line bg-ink-1/60 hover:border-line-2"}`}
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
              </button>
            );
          })}
        </div>
      </div>

      <aside className="sticky bottom-3 h-fit rounded-2xl border border-line-2 bg-ink-1/95 p-5 backdrop-blur lg:top-24">
        <div className="label">Your stack · {picked.length} of {ALL.length}</div>
        <div className="mt-4 hidden min-h-12 flex-col-reverse gap-1 lg:flex">
          {picked.map((id) => (
            <div key={id} className="rise flex items-center gap-2 text-sm">
              <ToolIcon id={id} size={22} />
              {TOOLS[id].name}
            </div>
          ))}
        </div>
        <dl className="mt-4 space-y-1.5 border-t border-line pt-4 font-mono text-sm">
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
          className="mt-4 w-full rounded-xl bg-signal py-3 font-semibold text-signal-ink transition hover:brightness-110 disabled:opacity-40"
        >
          Own this stack →
        </button>
        <p className="mt-3 text-center text-xs text-fg-3">Pay once · 12 months of updates · runs on your servers</p>
      </aside>
    </div>
  );
}
