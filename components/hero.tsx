"use client";

import { useEffect, useState } from "react";
import { TOOLS, type ToolId } from "@/lib/stack";

const PROMPTS: Record<ToolId, string> = {
  "content-os": "Plan 30 LinkedIn posts for a coffee brand launch",
  competitor: "What did my top 3 competitors change this week?",
  sentiment: "How do people feel about our new pricing?",
  ads: "Write 12 Meta ad variants for our summer sale",
  seo: "Find keywords we can rank for in 90 days",
};

const ids = Object.keys(TOOLS) as ToolId[];

export function Hero() {
  const [i, setI] = useState(0);
  const [mode, setMode] = useState<"brand" | "task">("brand");
  const id = ids[i];
  const tool = TOOLS[id];

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ids.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-4 pt-28 pb-10 sm:px-8 flex flex-col justify-end">
      <div
        aria-hidden
        className="pebble absolute -right-[15%] top-[12%] w-[90vw] max-w-[760px] opacity-40 sm:right-[4%] sm:w-[48vw] sm:opacity-100"
        style={{ "--h": tool.hue } as React.CSSProperties}
      />

      <div className="relative">
        <h1 className="display text-[clamp(3.2rem,11vw,9.5rem)]">
          <span className="block">
            Own it.
            <span className="ml-[0.08em] inline-block size-[0.14em] rounded-full bg-signal align-baseline shadow-[0_0_24px_var(--signal)]" />
          </span>
          <span className="block outline-text">Run it.</span>
          <span className="block outline-text">Grow it.</span>
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg-2">
          AI marketing tools you buy once and run on your own servers. Content, competitors, sentiment, ads and
          SEO, with your data, your model and no subscription.
        </p>

        <div className="mt-8 max-w-2xl">
          <div role="tablist" className="flex gap-1 text-sm">
            {(["brand", "task"] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => setMode(m)}
                className={`rounded-t-xl px-4 py-2 transition ${mode === m ? "bg-ink-2 text-fg" : "text-fg-3 hover:text-fg-2"}`}
              >
                {m === "brand" ? (
                  <>
                    Scan my brand <span className="ml-1 rounded-md bg-signal/15 px-1.5 py-0.5 text-[11px] text-signal-text">Free</span>
                  </>
                ) : (
                  "Describe a task"
                )}
              </button>
            ))}
          </div>
          <form
            action="#demo"
            className={`flex items-center gap-3 rounded-2xl bg-ink-2 p-2 pl-4 ${mode === "brand" ? "rounded-tl-none" : ""}`}
          >
            <span className="font-mono text-signal-text">{mode === "brand" ? "◎" : "/"}</span>
            <input
              key={mode === "brand" ? "brand" : id}
              aria-label={mode === "brand" ? "Your website" : "Describe a task"}
              placeholder={mode === "brand" ? "yourbrand.com" : PROMPTS[id]}
              className="rise min-w-0 flex-1 bg-transparent py-2 text-fg outline-none placeholder:text-fg-3"
            />
            <button className="rounded-xl bg-signal px-4 py-2.5 font-semibold text-signal-ink transition hover:brightness-110">
              {mode === "brand" ? "Scan ↵" : "Try it ↵"}
            </button>
          </form>
        </div>

        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <div key={id} className="rise w-full max-w-sm rounded-xl border border-line bg-ink-1/80 p-4 font-mono text-xs backdrop-blur sm:order-2">
            {tool.sample.map((line, n) => (
              <div key={line} className="flex gap-4 py-0.5" style={{ animationDelay: `${n * 120}ms` }}>
                <span className="text-signal-text">ok</span>
                <span className="text-fg-2">{line}</span>
              </div>
            ))}
          </div>
          <div className="label flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-block h-0.5 w-6 bg-line-2">
              <span key={id} className="block h-full w-full origin-left bg-signal [animation:grow_4.5s_linear]" />
            </span>
            <span>Now running</span>
            <span className="text-fg">{tool.name}</span>
            <span>{tool.stage}</span>
            <a href="#stack" className="text-fg hover:text-signal-text">
              Add to stack ↗
            </a>
          </div>
        </div>
      </div>
      <style>{`@keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
    </section>
  );
}
