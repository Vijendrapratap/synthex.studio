"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { TOOLS, type ToolId } from "@/lib/stack";

const PROMPTS: Record<ToolId, string> = {
  "content-os": "Plan 30 LinkedIn posts for a coffee brand launch",
  competitor: "What did my top 3 competitors change this week?",
  sentiment: "How do people feel about our new pricing?",
  ads: "Write 12 Meta ad variants for our summer sale",
  seo: "Find keywords we can rank for in 90 days",
};

// One floating outcome per tool, placed around the pebble (percent of the art box).
const FLOATS: Record<ToolId, { icon: string; title: string; sub: string; pos: string }> = {
  "content-os": { icon: "✓", title: "30 posts scheduled", sub: "LinkedIn · Instagram · X", pos: "left-[2%] top-[8%]" },
  competitor: { icon: "▲", title: "Northwind raised prices 12%", sub: "spotted 2 hours ago", pos: "right-[0%] top-[22%]" },
  sentiment: { icon: "♥", title: "Sentiment +8% this week", sub: "top praise: taste", pos: "left-[4%] top-[50%]" },
  ads: { icon: "★", title: "Variant 2 wins · CTR 3.9%", sub: "budget moved automatically", pos: "right-[4%] top-[66%]" },
  seo: { icon: "↗", title: "86 quick-win keywords", sub: "18 briefs ready to write", pos: "left-[16%] bottom-[2%]" },
};

const ids = Object.keys(TOOLS) as ToolId[];

export function Hero() {
  const [i, setI] = useState(0);
  const [mode, setMode] = useState<"brand" | "task">("brand");
  const id = ids[i];
  const tool = TOOLS[id];

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ids.length), 3500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] overflow-hidden px-4 pt-28 pb-10 sm:px-8 flex flex-col justify-end">
      {/* Art: pebble + floating outcomes */}
      <div aria-hidden className="absolute -right-[20%] top-[10%] aspect-square w-[95vw] max-w-[780px] opacity-40 sm:right-[2%] sm:w-[50vw] sm:opacity-100">
        <div className="pebble absolute inset-[12%]" style={{ "--h": tool.hue } as React.CSSProperties} />
        {ids.map((tid, n) => {
          const f = FLOATS[tid];
          const on = tid === id;
          return (
            <div key={tid} className={`absolute hidden lg:block ${f.pos}`} style={{ animation: `floaty ${5 + n * 0.6}s ease-in-out ${-n}s infinite` }}>
              <div
                className={`flex items-center gap-3 rounded-2xl border bg-ink-1/80 px-4 py-3 backdrop-blur-md transition duration-700 ease-out-expo ${on ? "scale-105 border-signal opacity-100 shadow-[0_20px_60px_-20px_var(--signal)]" : "scale-95 border-line-2 opacity-60"}`}
              >
                <span className="grid size-8 place-items-center rounded-full text-sm" style={{ background: `oklch(0.72 0.17 ${TOOLS[tid].hue} / 0.2)`, color: `oklch(0.8 0.16 ${TOOLS[tid].hue})` }}>
                  {f.icon}
                </span>
                <span>
                  <span className="block text-sm font-semibold text-fg">{f.title}</span>
                  <span className="block text-xs text-fg-3">{f.sub}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>

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
          Your marketing team in a box, and you own the box. Plan content, watch competitors, hear customers and run
          ads with AI tools you buy once and keep forever.
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
          <form action="#demo" className={`flex items-center gap-3 rounded-2xl bg-ink-2 p-2 pl-4 ${mode === "brand" ? "rounded-tl-none" : ""}`}>
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

        <div className="label mt-10 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="inline-block h-0.5 w-6 bg-line-2">
            <span key={id} className="block h-full w-full origin-left bg-signal [animation:race_3.5s_linear]" />
          </span>
          <span>Now running</span>
          <span className="text-fg">{tool.name}</span>
          <span>{tool.stage}</span>
          <Link href={`/tools/${id}`} className="text-fg hover:text-signal-text">
            See it ↗
          </Link>
        </div>
      </div>
    </section>
  );
}
