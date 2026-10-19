import type { Metadata } from "next";
import { ToolIcon } from "@/components/tool-icon";
import { Eyebrow, PageHero } from "@/components/ui";
import { BRAND } from "@/lib/brand";
import { TOOLS, type ToolId } from "@/lib/stack";

export const metadata: Metadata = {
  title: `Agents · ${BRAND.name}`,
  description: "AI agents that run your marketing tools end to end, on your server, with the approvals you choose.",
};

const STEPS = [
  ["Give it a goal", "“Launch our summer blend next week.” Plain words, no prompts to engineer."],
  ["It plans with your tools", "The agent decides which tools to run, in what order, using your brand memory."],
  ["It runs, you approve", "Work happens on your server. You sign off at the points you choose."],
];

const AUTONOMY = [
  ["Suggest", "Ideas and plans only. You do the work.", 1],
  ["Draft", "Prepares everything. You review and ship it.", 2],
  ["Approve", "Does the work and waits for your yes before anything goes live.", 3],
  ["Autopilot", "Runs on a schedule and reports back. Spending caps always apply.", 4],
] as const;

// Upcoming agents. Draft roadmap: names and scope may change.
const AGENTS: [string, string, ToolId[], string[]][] = [
  ["Launch agent", "Takes a product or offer from idea to live campaign.", ["competitor", "content-os", "ads"], ["Research rivals", "Draft the campaign", "Build ad variants", "Schedule it all"]],
  ["Weekly growth review", "Every Monday, a one-page summary of what worked and what to do next.", ["sentiment", "ads", "seo"], ["Pull last week's results", "Spot what changed", "Recommend 3 actions"]],
  ["Competitor watch", "Keeps an eye on rivals and tells you only when it matters.", ["competitor", "sentiment"], ["Track changes daily", "Score the impact", "Alert with a suggested response"]],
  ["Review responder", "Drafts on-brand replies to reviews and comments.", ["sentiment", "content-os"], ["Read new reviews", "Draft replies in your voice", "Queue for approval"]],
  ["SEO writer", "Turns quick-win keywords into published articles.", ["seo", "content-os"], ["Pick winnable keywords", "Write the brief", "Draft and schedule the post"]],
];

const SAFETY = [
  ["Runs on your server", "Agents use the same self-hosted tools. Nothing leaves your infrastructure."],
  ["Every action logged", "A plain-language history of what it did and why."],
  ["Approvals by default", "Nothing goes live without you until you say otherwise."],
  ["Spending caps", "Hard limits on ad spend and AI usage per run."],
];

export default function AgentsPage() {
  return (
    <main>
      <PageHero eyebrow="Agents · coming soon" title="Agents that" accent="do the work.">
        Agents sit on top of your tools and run whole jobs end to end: research, writing, ads and scheduling. They work on
        your server, with exactly as much freedom as you give them.
      </PageHero>

      <section className="border-t border-line px-4 py-24 sm:px-8">
        <Eyebrow n="01">How agents work</Eyebrow>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {STEPS.map(([t, d], i) => (
            <div key={t} className="glass spot lift reveal rounded-3xl p-7">
              <div className="display outline-text text-7xl">0{i + 1}</div>
              <h3 className="display mt-8 text-2xl" style={{ letterSpacing: "-0.02em" }}>
                {t}
              </h3>
              <p className="mt-3 leading-relaxed text-fg-3">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-light px-4 py-24 sm:px-8">
        <Eyebrow n="02">Autonomy you control</Eyebrow>
        <h2 className="display mt-6 mb-12 text-[clamp(2.4rem,5vw,4.5rem)]">You set the leash.</h2>
        <div className="grid gap-4 md:grid-cols-4">
          {AUTONOMY.map(([t, d, level]) => (
            <div key={t} className="neu spot reveal rounded-3xl p-6">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className={`h-2 flex-1 rounded-full ${n <= level ? "bg-signal" : "neu-in"}`} />
                ))}
              </div>
              <h3 className="display mt-8 text-2xl" style={{ letterSpacing: "-0.02em" }}>
                {t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fg-3">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8">
        <Eyebrow n="03">On the roadmap</Eyebrow>
        <h2 className="display mt-6 mb-12 text-[clamp(2.4rem,5vw,4.5rem)]">First agents.</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          {AGENTS.map(([name, line, tools, steps], i) => (
            <div key={name} className={`glass spot lift reveal rounded-3xl p-7 ${i === 0 ? "lg:col-span-2" : ""}`}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <ToolIcon id="agent" size={48} />
                  <div>
                    <h3 className="display text-2xl" style={{ letterSpacing: "-0.02em" }}>
                      {name}
                    </h3>
                    <p className="mt-1 text-sm text-fg-3">{line}</p>
                  </div>
                </div>
                <div className="flex -space-x-2">
                  {tools.map((t) => (
                    <span key={t} title={TOOLS[t].name} className="rounded-[28%] ring-4 ring-[#0b0b0c]">
                      <ToolIcon id={t} size={36} />
                    </span>
                  ))}
                </div>
              </div>
              <ol className="mt-8 flex flex-wrap items-center gap-2 text-sm">
                {steps.map((s, n) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="neu-in rounded-full px-3 py-1.5 text-fg-2">
                      <span className="mr-1.5 font-mono text-xs text-signal-text">{n + 1}</span>
                      {s}
                    </span>
                    {n < steps.length - 1 && <span className="text-fg-3">→</span>}
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-light grid gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[5fr_7fr]">
        <div>
          <Eyebrow n="04">Safe by design</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">Powerful, never reckless.</h2>
          <form className="neu-in mt-10 flex max-w-md gap-2 rounded-xl p-1.5">
            <input type="email" required placeholder="you@company.com" aria-label="Email for the agents waitlist" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-fg-3" />
            <button className="btn rounded-lg px-4 py-2 text-sm">Join waitlist</button>
          </form>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {SAFETY.map(([t, d]) => (
            <div key={t} className="neu spot reveal rounded-2xl p-6">
              <h3 className="font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-3">{d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
