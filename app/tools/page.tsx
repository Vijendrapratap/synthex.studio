import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { ToolIcon } from "@/components/tool-icon";
import { Eyebrow, PageHero } from "@/components/ui";
import { BRAND } from "@/lib/brand";
import { TOOLS, type ToolId } from "@/lib/stack";

export const metadata: Metadata = {
  title: `Tools · ${BRAND.name}`,
  description: "Content, competitor research, market sentiment, ads and SEO. Self-hosted AI marketing tools you buy once.",
};

const ids = Object.keys(TOOLS) as ToolId[];

// The order work flows through the suite.
const FLOW: [string, string, ToolId[]][] = [
  ["Listen", "Know the market before you say a word.", ["competitor", "sentiment"]],
  ["Plan", "Pick the topics and keywords you can win.", ["seo"]],
  ["Create", "Write and schedule in your own voice.", ["content-os"]],
  ["Amplify", "Put budget behind what already works.", ["ads"]],
];

export default function ToolsPage() {
  return (
    <main>
      <PageHero eyebrow="Tools" title="Five tools." accent="One marketing team.">
        Each tool does one marketing job really well and runs on your own server. Buy one, or stack them so every tool
        learns from the others.
      </PageHero>

      {/* Flow */}
      <section className="border-t border-line px-4 py-24 sm:px-8">
        <Eyebrow n="01">How they work together</Eyebrow>
        <h2 className="display mt-6 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)]">Research feeds the writing. Results feed the research.</h2>
        <div className="mt-14 grid gap-4 md:grid-cols-4">
          {FLOW.map(([stage, line, tools], i) => (
            <div key={stage} className="relative">
              <div className="glass spot lift reveal h-full rounded-3xl p-6">
                <div className="label">
                  <span className="text-signal-text">0{i + 1}</span> / {stage}
                </div>
                <p className="mt-4 text-fg-2">{line}</p>
                <div className="mt-8 space-y-2">
                  {tools.map((t) => (
                    <Link key={t} href={`/tools/${t}`} className="flex items-center gap-3 rounded-xl p-2 text-sm font-semibold transition hover:bg-white/[0.05]">
                      <ToolIcon id={t} size={34} />
                      {TOOLS[t].name}
                    </Link>
                  ))}
                </div>
              </div>
              {i < FLOW.length - 1 && (
                <span aria-hidden className="absolute -right-3.5 top-1/2 z-10 hidden size-7 -translate-y-1/2 place-items-center rounded-full bg-signal text-xs text-signal-ink md:grid">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-fg-3">
          Every tool reads and writes one shared brand memory on your server: your voice, your customers, your rivals.
          Add a tool and it already knows your business.
        </p>
      </section>

      {/* Catalog */}
      <section className="surface-light px-4 py-24 sm:px-8">
        <Eyebrow n="02">The catalog</Eyebrow>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ids.map((id) => {
            const t = TOOLS[id];
            return (
              <Link key={id} href={`/tools/${id}`} className="neu spot lift reveal group flex flex-col rounded-3xl p-7">
                <div className="flex items-start justify-between">
                  <ToolIcon id={id} size={52} />
                  <span className="neu-in rounded-full px-3 py-1 font-mono text-xs text-fg-2">${t.price}</span>
                </div>
                <div className="label mt-8">{t.stage}</div>
                <h3 className="display mt-2 text-3xl" style={{ letterSpacing: "-0.02em" }}>
                  {t.name}
                </h3>
                <p className="mt-3 text-fg-2">{t.line}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-fg-3">
                  {t.features.map(([f, d]) => (
                    <li key={f} className="flex gap-2">
                      <span className="text-signal-text">✓</span>
                      <span>
                        <span className="font-medium text-fg">{f}.</span> {d}
                      </span>
                    </li>
                  ))}
                </ul>
                <span className="mt-8 text-sm font-semibold transition group-hover:translate-x-1">Explore {t.name} →</span>
              </Link>
            );
          })}
          <div className="neu-in flex flex-col items-center justify-center gap-3 rounded-3xl p-7 text-center">
            <ToolIcon id="agent" size={52} />
            <div className="label mt-4">Next drop</div>
            <p className="display text-2xl text-fg-3">More tools and agents are on the way.</p>
            <Link href="/agents" className="mt-2 text-sm font-semibold text-signal-text">
              See what&apos;s coming →
            </Link>
          </div>
        </div>
      </section>

      {/* Outputs */}
      <section className="py-24">
        <div className="mb-12 px-4 sm:px-8">
          <Eyebrow n="03">What they make</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">A week of work, at a glance.</h2>
        </div>
        <Gallery />
      </section>
    </main>
  );
}
