import type { Metadata } from "next";
import { ToolIcon } from "@/components/tool-icon";
import { Eyebrow, PageHero, TextLink } from "@/components/ui";
import { BRAND } from "@/lib/brand";
import { TOOLS, type ToolId } from "@/lib/stack";

export const metadata: Metadata = {
  title: `Ownership · ${BRAND.name}`,
  description: "Self-hosted AI marketing tools. Your server, your data, your model, and a license that never expires.",
};

const DEPLOY = [
  ["Your server", "One command on any machine with Docker: a VPS, an office box or a spare laptop.", "docker compose up"],
  ["Your cloud", "We install it on your AWS, Google Cloud or DigitalOcean account and hand you the keys.", "done-for-you setup"],
  ["Your laptop", "Try every tool locally for 14 days before you put it anywhere else.", "free trial"],
];

const MODELS = [
  ["OpenRouter", "Hundreds of models through one key."],
  ["OpenAI", "Use your own API account."],
  ["Anthropic", "Claude models with your key."],
  ["Ollama", "Fully local. Nothing leaves the machine."],
];

// Generic comparison against subscription tools, no vendor named.
const COMPARE: [string, string, string][] = [
  ["Where your data lives", "On the vendor's servers", "On your server"],
  ["What you pay over time", "Every month, rising", "Once"],
  ["If you stop paying", "Access and history are gone", "Everything keeps working"],
  ["AI model", "Whatever they picked", "Any model, or fully local"],
  ["Works offline", "No", "Yes, with local models"],
  ["Export everything", "Sometimes, partly", "Any time, CSV and JSON"],
  ["Seats", "Paid per person", "Unlimited on your install"],
];

const ids = Object.keys(TOOLS) as ToolId[];

export default function OwnershipPage() {
  return (
    <main>
      <PageHero eyebrow="Ownership" title="Your server." accent="Your rules.">
        {BRAND.name} runs on infrastructure you control. Your customer lists, drafts and reports never touch our
        servers, and the tools keep working whether or not you ever talk to us again.
      </PageHero>

      {/* Architecture */}
      <section className="border-t border-line px-4 py-24 sm:px-8">
        <Eyebrow n="01">Where everything lives</Eyebrow>
        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_280px]">
          <div className="glass spot relative rounded-3xl p-6 sm:p-8">
            <div className="label flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-signal" /> Your infrastructure
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-5">
              {ids.map((id) => (
                <div key={id} className="neu-in flex flex-col items-center gap-2 rounded-2xl p-4 text-center text-xs text-fg-2">
                  <ToolIcon id={id} size={40} />
                  {TOOLS[id].name}
                </div>
              ))}
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {[
                ["Postgres", "All your data"],
                ["Brand memory", "Voice, customers, rivals"],
                ["Your model key", "Billed by your provider"],
              ].map(([t, d]) => (
                <div key={t} className="neu-in rounded-2xl px-4 py-3">
                  <div className="font-mono text-sm text-fg">{t}</div>
                  <div className="text-xs text-fg-3">{d}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center lg:flex-col">
            <span className="h-px w-16 border-t border-dashed border-line-2 lg:h-24 lg:w-px lg:border-l lg:border-t-0" />
            <span className="label px-3 py-2 text-center">license check only</span>
            <span className="h-px w-16 border-t border-dashed border-line-2 lg:h-24 lg:w-px lg:border-l lg:border-t-0" />
          </div>
          <div className="neu-in flex flex-col justify-center rounded-3xl p-6 text-center">
            <div className="label">Our servers</div>
            <p className="mt-3 text-sm leading-relaxed text-fg-3">
              Verify a license key. That&apos;s it. Air-gapped? Activate offline with a license file.
            </p>
          </div>
        </div>
      </section>

      {/* Deploy */}
      <section className="surface-light px-4 py-24 sm:px-8">
        <Eyebrow n="02">Run it anywhere</Eyebrow>
        <h2 className="display mt-6 mb-12 text-[clamp(2.4rem,5vw,4.5rem)]">Three ways to install.</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {DEPLOY.map(([t, d, tag]) => (
            <div key={t} className="neu spot lift reveal flex flex-col rounded-3xl p-7">
              <span className="neu-in w-fit rounded-full px-3 py-1 font-mono text-xs text-signal-text">{tag}</span>
              <h3 className="display mt-8 text-2xl" style={{ letterSpacing: "-0.02em" }}>
                {t}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-3">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Models */}
      <section className="px-4 py-24 sm:px-8">
        <Eyebrow n="03">Bring your own model</Eyebrow>
        <h2 className="display mt-6 mb-12 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)]">Switch models in one setting.</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODELS.map(([t, d]) => (
            <div key={t} className="glass spot lift reveal rounded-3xl p-6">
              <div className="font-mono text-lg text-fg">{t}</div>
              <p className="mt-2 text-sm text-fg-3">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Compare */}
      <section className="surface-light px-4 py-24 sm:px-8">
        <Eyebrow n="04">Rent vs own</Eyebrow>
        <h2 className="display mt-6 mb-12 text-[clamp(2.4rem,5vw,4.5rem)]">The honest comparison.</h2>
        <div className="neu overflow-hidden rounded-3xl">
          <div className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 border-b border-line px-6 py-4 label">
            <span />
            <span>Subscription tools</span>
            <span className="text-signal-text">{BRAND.name}</span>
          </div>
          {COMPARE.map(([row, rent, own]) => (
            <div key={row} className="grid grid-cols-[1.2fr_1fr_1fr] gap-4 border-b border-line px-6 py-4 text-sm last:border-0">
              <span className="font-medium text-fg">{row}</span>
              <span className="text-fg-3">{rent}</span>
              <span className="flex gap-2 text-fg">
                <span className="text-signal-text">✓</span>
                {own}
              </span>
            </div>
          ))}
        </div>
        <div className="neu-in mt-10 rounded-3xl p-8">
          <h3 className="display text-2xl" style={{ letterSpacing: "-0.02em" }}>
            And if we ever shut down?
          </h3>
          {/* Draft promise: confirm final wording (e.g. source release to license holders) before launch. */}
          <p className="mt-3 max-w-2xl leading-relaxed text-fg-2">
            Your install keeps running, because it never depended on us. Your data, your tools and your license stay
            exactly where they are.
          </p>
          <div className="mt-6">
            <TextLink href="/pricing">See pricing</TextLink>
          </div>
        </div>
      </section>
    </main>
  );
}
