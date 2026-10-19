import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolIcon } from "@/components/tool-icon";
import { Eyebrow, TextLink } from "@/components/ui";
import { COPY, MOCKS } from "@/components/walkthrough";
import { BRAND } from "@/lib/brand";
import { quote, TOOLS, type ToolId } from "@/lib/stack";

// Same for every tool today. Draft: confirm per tool before launch.
const SPECS = [
  ["Install", "docker compose up · or our done-for-you setup"],
  ["Runs on", "Any Linux server, Mac or Windows machine with Docker"],
  ["Your data", "Postgres on your server. Nothing is stored on ours"],
  ["Models", "OpenRouter, OpenAI, Anthropic or local Ollama"],
  ["License", "Perpetual · 12 months of updates included"],
];

export function generateStaticParams() {
  return Object.keys(TOOLS).map((slug) => ({ slug }));
}

function getTool(slug: string) {
  return slug in TOOLS ? { id: slug as ToolId, ...TOOLS[slug as ToolId] } : null;
}

export async function generateMetadata({ params }: PageProps<"/tools/[slug]">): Promise<Metadata> {
  const t = getTool((await params).slug);
  return t ? { title: `${t.name} · ${BRAND.name}`, description: `${t.line} Pay once, self-hosted, any model.` } : {};
}

export default async function ToolPage({ params }: PageProps<"/tools/[slug]">) {
  const t = getTool((await params).slug);
  if (!t) notFound();
  const accent = `oklch(0.75 0.16 ${t.hue})`;
  const [title, body] = COPY[t.id];

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-8 lg:min-h-[85svh] lg:pt-40">
        <div aria-hidden className="aurora">
          <span className="right-[-5%] top-[5%] size-[560px]" style={{ background: accent }} />
          <span className="right-[25%] top-[40%] size-[380px] opacity-30" style={{ background: "oklch(0.85 0.2 122)", animationDelay: "-7s" }} />
        </div>
        <div aria-hidden className="absolute right-[12%] top-[32%] hidden rotate-[-8deg] lg:block" style={{ animation: "floaty 7s ease-in-out infinite" }}>
          <ToolIcon id={t.id} size={220} className="bg-ink-1/60 backdrop-blur-xl" />
        </div>
        <div className="relative max-w-3xl">
          <Link href="/#tools" className="label hover:text-fg">
            ← All tools
          </Link>
          <div className="label mt-10">
            <span style={{ color: accent }}>●</span> {t.stage}
          </div>
          <h1 className="display mt-6 text-[clamp(3.2rem,10vw,8.5rem)]">{t.name}</h1>
          <p className="mt-8 max-w-xl text-xl leading-relaxed text-fg-2">{t.line}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href={`/?stack=${t.id}#stack`} className="rounded-xl bg-signal px-6 py-4 text-lg font-semibold text-signal-ink hover:brightness-110">
              Own it · ${t.price}
            </Link>
            <span className="text-sm text-fg-3">One-time · 14-day free trial · cheaper in a combo</span>
          </div>
        </div>
      </section>

      {/* Demo */}
      <section className="grid items-center gap-10 px-4 py-24 sm:px-8 lg:grid-cols-2" style={{ background: `color-mix(in oklch, var(--ink-0) 93%, ${accent})` }}>
        <div>
          <Eyebrow n="01">See it work</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">{title}</h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-2">{body}</p>
          <p className="mt-4 text-sm text-fg-3">Sample output for a demo coffee brand.</p>
        </div>
        <div className="mx-auto w-full max-w-xl">{MOCKS[t.id]}</div>
      </section>

      {/* Features */}
      <section className="surface-light px-4 py-24 sm:px-8">
        <Eyebrow n="02">What it does</Eyebrow>
        <div className="mt-8 grid gap-12 md:grid-cols-3 md:gap-6">
          {t.features.map(([name, desc], i) => (
            <div key={name} className="border-t border-line pt-6">
              <div className="display outline-text text-8xl">0{i + 1}</div>
              <h3 className="display mt-8 text-3xl" style={{ letterSpacing: "-0.02em" }}>
                {name}
              </h3>
              <p className="mt-4 max-w-sm leading-relaxed text-fg-3">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pairs */}
      <section className="surface-light border-t border-line px-4 py-24 sm:px-8">
        <Eyebrow n="03">Better together</Eyebrow>
        <h2 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">Stack it.</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {t.pairs.map((p) => {
            const pair = TOOLS[p as ToolId];
            const q = quote([t.id, p]);
            return (
              <div key={p} className="flex flex-col justify-between gap-8 rounded-3xl border border-line bg-ink-1 p-7">
                <div>
                  <div className="flex items-center gap-3">
                    <ToolIcon id={t.id} size={36} />
                    <span className="text-fg-3">+</span>
                    <ToolIcon id={p as ToolId} size={36} />
                  </div>
                  <h3 className="display mt-6 text-2xl" style={{ letterSpacing: "-0.02em" }}>
                    {t.name} + {pair.name}
                  </h3>
                  <p className="mt-3 text-fg-3 leading-relaxed">{pair.line}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="font-mono text-sm">
                    <span className="text-fg-3 line-through">${q.list}</span> <span className="text-lg text-fg">${q.total}</span>{" "}
                    <span className="text-signal-text">−{Math.round(q.pct * 100)}%</span>
                  </div>
                  <TextLink href={`/?stack=${t.id},${p}#stack`}>Build this combo</TextLink>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Specs */}
      <section className="grid gap-10 border-t border-line px-4 py-24 sm:px-8 lg:grid-cols-[5fr_7fr]">
        <div>
          <Eyebrow n="04">Ownership specs</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">
            Yours,
            <br />
            <span className="text-signal-text">fully.</span>
          </h2>
        </div>
        <dl className="rounded-3xl border border-line">
          {SPECS.map(([k, v]) => (
            <div key={k} className="grid gap-1 border-b border-line px-6 py-5 last:border-0 sm:grid-cols-[160px_1fr]">
              <dt className="label !text-fg-3">{k}</dt>
              <dd className="text-fg-2">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Other tools */}
      <section className="surface-light px-4 py-24 sm:px-8">
        <div className="label">More tools</div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(TOOLS) as ToolId[])
            .filter((id) => id !== t.id)
            .map((id) => (
              <Link key={id} href={`/tools/${id}`} className="group flex items-center gap-4 rounded-2xl border border-line bg-ink-1 p-5 transition hover:border-line-2">
                <ToolIcon id={id} size={36} />
                <span className="flex-1 font-semibold" style={{ fontStretch: "112%" }}>
                  {TOOLS[id].name}
                </span>
                <span className="text-fg-3 transition group-hover:translate-x-1">→</span>
              </Link>
            ))}
        </div>
      </section>
    </main>
  );
}
