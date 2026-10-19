"use client";

import { useRef } from "react";
import { TOOLS } from "@/lib/stack";

export function ToolRail() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => rail.current?.scrollBy({ left: dir * rail.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <>
      <div ref={rail} className="no-scrollbar flex snap-x snap-mandatory scroll-px-4 gap-3 overflow-x-auto px-4 sm:scroll-px-8 sm:px-8">
        {Object.entries(TOOLS).map(([id, t]) => (
          <a
            key={id}
            href={`#stack`}
            className="group relative flex aspect-[4/3] w-[85vw] shrink-0 snap-start flex-col justify-end overflow-hidden rounded-2xl border border-line p-5 sm:w-[540px]"
            style={{
              background: `radial-gradient(circle at 75% 30%, oklch(0.6 0.2 ${t.hue} / 0.55), transparent 55%), linear-gradient(160deg, oklch(0.22 0.05 ${t.hue}), var(--ink-1) 70%)`,
            }}
          >
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="rounded-md bg-ink-0/70 px-2 py-1 font-mono text-[11px] tracking-[0.14em] text-fg">
                {t.stage.toUpperCase()}
              </span>
              <span className="rounded-md bg-signal px-2 py-1 font-mono text-[11px] tracking-[0.14em] text-signal-ink">
                OWN · ${t.price}
              </span>
            </div>
            <div className="absolute right-5 top-16 left-5 rounded-lg border border-white/10 bg-black/50 p-3 font-mono text-[11px] text-white/70 backdrop-blur transition duration-500 ease-out-expo group-hover:-translate-y-1 sm:left-auto sm:w-64">
              {t.sample.map((l) => (
                <div key={l}>
                  <span className="text-[#c6f135]">› </span>
                  {l}
                </div>
              ))}
            </div>
            <h3 className="display text-3xl text-white" style={{ letterSpacing: "-0.02em" }}>
              {t.name}
            </h3>
            <p className="mt-2 max-w-sm text-sm text-white/70">{t.line}</p>
          </a>
        ))}
        <div className="flex aspect-[4/3] w-[85vw] shrink-0 snap-start flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-line-2 text-center sm:w-[540px]">
          <span className="label">Next drop</span>
          <p className="display text-3xl text-fg-3">More pebbles soon.</p>
          <a href="#drops" className="text-sm text-fg underline underline-offset-4">
            Get notified
          </a>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between px-4 sm:px-8">
        <p className="text-sm text-fg-3">Every tool installs on its own and they all work together.</p>
        <div className="flex gap-2">
          {[-1, 1].map((d) => (
            <button
              key={d}
              onClick={() => scroll(d)}
              aria-label={d < 0 ? "Previous tools" : "Next tools"}
              className="grid size-11 place-items-center rounded-full border border-line-2 text-fg transition hover:bg-ink-3"
            >
              {d < 0 ? "←" : "→"}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
