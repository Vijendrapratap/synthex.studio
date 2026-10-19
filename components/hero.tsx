"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ToolIcon } from "@/components/tool-icon";
import { BRAND } from "@/lib/brand";
import { TOOLS, type ToolId } from "@/lib/stack";

const PROMPTS: Record<ToolId, string> = {
  "content-os": "Plan 30 LinkedIn posts for a coffee brand launch",
  competitor: "What did my top 3 competitors change this week?",
  sentiment: "How do people feel about our new pricing?",
  ads: "Write 12 Meta ad variants for our summer sale",
  seo: "Find keywords we can rank for in 90 days",
};

// Floating outcomes pinned to the product window's edges, clear of its content.
const FLOATS: [ToolId, string, string, string][] = [
  ["competitor", "Northwind raised prices 12%", "spotted 2 hours ago", "-left-12 -top-9"],
  ["sentiment", "Sentiment +8% this week", "top praise: taste", "right-6 -bottom-9"],
  ["seo", "86 quick-win keywords", "18 briefs ready to write", "-left-14 bottom-16"],
];

const ids = Object.keys(TOOLS) as ToolId[];

export function Hero({ mocks }: { mocks: Record<ToolId, React.ReactNode> }) {
  const [i, setI] = useState(0);
  const [mode, setMode] = useState<"brand" | "task">("brand");
  const id = ids[i];
  const tool = TOOLS[id];

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % ids.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden px-4 pt-28 pb-20 sm:px-8 lg:min-h-[100svh] lg:pt-32">
      <div aria-hidden className="aurora">
        <span className="right-[-10%] top-[-10%] size-[620px]" style={{ background: "oklch(0.85 0.2 122)" }} />
        <span className="right-[15%] top-[30%] size-[520px]" style={{ background: `oklch(0.7 0.18 ${tool.hue})`, animationDelay: "-6s" }} />
        <span className="bottom-[-20%] left-[-10%] size-[480px] opacity-25" style={{ background: "oklch(0.6 0.2 290)", animationDelay: "-12s" }} />
      </div>

      <div className="relative grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <div className="label flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-signal shadow-[0_0_10px_var(--signal)]" /> Pay once · self-hosted · any model
          </div>
          <h1 className="display mt-8 text-[clamp(3.2rem,7.4vw,7.6rem)]">
            <span className="block">Own it.</span>
            <span className="block outline-text">Run it.</span>
            <span className="block text-signal-text">Grow it.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg-2">
            Your marketing team in a box, and you own the box. Plan content, watch competitors, hear customers and run
            ads with AI tools you buy once and keep forever.
          </p>

          <div className="mt-8 max-w-xl">
            <div role="tablist" className="flex gap-1 text-sm">
              {(["brand", "task"] as const).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`rounded-t-xl px-4 py-2 transition ${mode === m ? "glass !border-b-0 text-fg" : "text-fg-3 hover:text-fg-2"}`}
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
            <form action="#demo" className={`glass flex items-center gap-3 rounded-2xl p-2 pl-4 ${mode === "brand" ? "rounded-tl-none" : ""}`}>
              <span className="font-mono text-signal-text">{mode === "brand" ? "◎" : "/"}</span>
              <input
                key={mode === "brand" ? "brand" : id}
                aria-label={mode === "brand" ? "Your website" : "Describe a task"}
                placeholder={mode === "brand" ? "yourbrand.com" : PROMPTS[id]}
                className="rise min-w-0 flex-1 bg-transparent py-2 text-fg outline-none placeholder:text-fg-3"
              />
              <button className="btn rounded-xl px-4 py-2.5">
                {mode === "brand" ? "Scan ↵" : "Try it ↵"}
              </button>
            </form>
          </div>
        </div>

        {/* Product window: the active tool's real output */}
        <div aria-hidden className="group/win relative hidden [perspective:1800px] lg:block">
          <div className="glass overflow-hidden rounded-[24px] transition-transform duration-1000 ease-out-expo [transform:rotateY(-7deg)_rotateX(4deg)] group-hover/win:[transform:none]">
            <div className="flex items-center gap-2 border-b border-line px-4 py-3">
              <span className="size-2.5 rounded-full bg-fg-3/50" />
              <span className="size-2.5 rounded-full bg-fg-3/50" />
              <span className="size-2.5 rounded-full bg-fg-3/50" />
              <span className="mx-auto rounded-md bg-ink-3 px-3 py-1 font-mono text-[11px] text-fg-3">
                app.{BRAND.domain}/{id}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-signal-text">
                <span className="size-1.5 animate-pulse rounded-full bg-signal" /> live
              </span>
            </div>
            <div className="grid grid-cols-[170px_1fr]">
              <nav className="space-y-1 border-r border-line p-3">
                {ids.map((tid) => (
                  <div key={tid} className={`flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-[13px] transition ${tid === id ? "bg-ink-3 text-fg" : "text-fg-3"}`}>
                    <ToolIcon id={tid} size={24} />
                    {TOOLS[tid].name}
                  </div>
                ))}
                <div className="mt-4 flex items-center gap-2.5 px-2 py-1.5 text-[13px] text-fg-3">
                  <ToolIcon id="agent" size={24} /> Agents <span className="ml-auto rounded bg-signal/15 px-1 text-[9px] text-signal-text">SOON</span>
                </div>
              </nav>
              <div className="relative h-[420px] overflow-hidden p-5 [mask-image:linear-gradient(#000_82%,transparent)]">
                <div className="mb-4 flex items-baseline justify-between">
                  <span className="font-semibold">{tool.name}</span>
                  <span className="label">{tool.stage}</span>
                </div>
                <div key={id} className="rise">
                  {mocks[id]}
                </div>
              </div>
            </div>
          </div>

          {FLOATS.map(([tid, title, sub, pos], n) => {
            const on = tid === id;
            return (
              <div key={tid} className={`absolute ${pos}`} style={{ animation: `floaty ${5 + n * 0.6}s ease-in-out ${-n}s infinite` }}>
                <div
                  className={`glass flex items-center gap-3 rounded-2xl px-3.5 py-2.5 transition duration-700 ease-out-expo ${on ? "scale-105 !border-signal opacity-100 shadow-[0_20px_60px_-20px_var(--signal)]" : "scale-95 opacity-75"}`}
                >
                  <ToolIcon id={tid} size={32} />
                  <span>
                    <span className="block text-sm font-semibold text-fg">{title}</span>
                    <span className="block text-xs text-fg-3">{sub}</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="label relative mt-14 flex flex-wrap items-center gap-x-5 gap-y-2">
        <span className="inline-block h-0.5 w-6 bg-line-2">
          <span key={id} className="block h-full w-full origin-left bg-signal [animation:race_4.5s_linear]" />
        </span>
        <span>Now running</span>
        <span className="text-fg">{tool.name}</span>
        <Link href={`/tools/${id}`} className="text-fg hover:text-signal-text">
          See it ↗
        </Link>
      </div>
    </section>
  );
}
