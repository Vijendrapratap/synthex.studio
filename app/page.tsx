import Link from "next/link";
import { Gallery } from "@/components/gallery";
import { Hero } from "@/components/hero";
import { Eyebrow, TextLink } from "@/components/ui";
import { StackBuilder } from "@/components/stack-builder";
import { Walkthrough } from "@/components/walkthrough";
import { TOOLS, type ToolId } from "@/lib/stack";

const STEPS = [
  ["Install", "One command on your server, laptop or cloud: docker compose up. Or we set it up for you.", "Read the install guide"],
  ["Connect", "Plug in your model (OpenRouter, OpenAI or a local Ollama) and your channels. Your keys, your bill.", "See supported models"],
  ["Own", "No seats, no renewals, no lock-in. Export everything, any time. It keeps working even if we disappear.", "How ownership works"],
];

const PIPELINE = [
  ["ok", "docker compose up · 6 services healthy"],
  ["ok", "postgres · your-server:5432"],
  ["ok", "model · openrouter (your key)"],
  ["ok", "license · verified offline"],
  ["fix", "telemetry · disabled by default"],
  ["ok", "content-os · 30 posts scheduled"],
];

const AUTONOMY = [
  ["Autopilot", "Runs on a schedule, reports back."],
  ["Approve", "Does the work, waits for your yes."],
  ["Draft", "Prepares everything, you ship it."],
  ["Suggest", "Ideas only. You stay hands-on."],
];

const BYO = [
  ["Brand kit", "Your logo, voice, colors and examples, so every output sounds like you."],
  ["Your data", "CSV, CRM, analytics. Kept in your own database, never on ours."],
  ["Your model", "OpenRouter, OpenAI, Anthropic or local Ollama. Switch any time."],
  ["Your channels", "LinkedIn, X, Instagram, Meta and Google Ads, connected with your accounts."],
];

const PROOF = [
  ["$0/mo", "after you buy. No seats, no renewals.", "Cost to keep", 125, -4],
  ["0 bytes", "of your data sent to our servers.", "Data shared", 300, 1.5],
  ["1 command", "docker compose up and you're live.", "Time to install", 200, 4],
] as const;

const MANIFESTO = [
  "Every month you pay for seats. Every month the price creeps up. Your content calendar, your competitor notes, your customer insights all live on someone else's servers.",
  "The day you stop paying, your history goes with them. You built the knowledge, but you never owned it.",
  "GrowthPebbles flips that. Buy the tool once, run it where you want, plug in the model you trust. Your marketing brain stays yours.",
];

// Draft answers: confirm these policies before launch.
const FAQ: [string, [string, string][]][] = [
  [
    "General",
    [
      ["What is GrowthPebbles?", "A collection of AI marketing tools (content, competitor research, sentiment, ads and SEO) that you buy once and run on your own infrastructure. Each tool works alone, and together they share research and brand context."],
      ["Do I need to be technical?", "If you can paste one command, you can install it. Prefer not to? Our done-for-you setup installs everything on your cloud and hands you the keys."],
      ["Which AI models does it use?", "Whichever you choose: OpenRouter, OpenAI, Anthropic, or local models through Ollama. You pay the provider directly, with no markup from us."],
    ],
  ],
  [
    "Ownership",
    [
      ["Where does my data live?", "In your own database, on your own server. Tools only contact us to check your license, and even that works offline."],
      ["What happens after 12 months of updates?", "Everything keeps working forever. Renewing is optional and only gets you new features and new tools."],
    ],
  ],
  [
    "Pricing",
    [
      ["How do combo discounts work?", "2 tools save 10%, 3 save 15%, 4 save 20%, and all of them is The Stack, our lowest price. Only the best discount applies."],
      ["Is there a free trial?", "Yes, 14 days with every feature, running on your own machine. No card needed."],
      ["Can agencies use it for clients?", "Yes. The agency license covers multiple client workspaces and white-labelled reports."],
    ],
  ],
];

const TICKER: [ToolId, string][] = [
  ["competitor", "Northwind raised prices 12%"],
  ["content-os", "30 posts scheduled for May"],
  ["sentiment", "Sentiment up 8% this week"],
  ["ads", "Variant 2 wins · CTR 3.9%"],
  ["seo", "86 quick-win keywords found"],
  ["competitor", "Brewly launched a Reels campaign"],
  ["sentiment", "Top complaint: shipping time"],
  ["content-os", "Brand voice applied to 12 drafts"],
  ["ads", "Losing ads paused · $140 saved"],
  ["seo", "18 briefs ready to write"],
];

// In the owner's words. Each pain links to the pebble that fixes it.
const PAINS: [string, ToolId | "stack", string][] = [
  ["I know I should post every day. I just don't have the time.", "content-os", "A month of posts, written in your voice and scheduled in one afternoon."],
  ["My competitor ran a promo and I heard about it from a customer.", "competitor", "Know the same day a rival changes prices, pages or campaigns."],
  ["Sales dipped and I honestly don't know why.", "sentiment", "See what customers are saying right now, grouped into what to fix."],
  ["I spend on ads every month and can't tell what's working.", "ads", "Variants tested for you. Winners get the budget, losers get paused."],
  ["We're basically invisible on Google.", "seo", "The keywords you can actually win, with briefs ready to write."],
  ["I pay for six subscriptions and still do it all myself.", "stack", "Every tool, paid for once, running on your own server."],
];

export default function Home() {
  return (
    <>
      <main>
        <Hero />

        {/* Ticker: what the pebbles did today */}
        <div aria-hidden className="overflow-hidden border-y border-line bg-ink-1 py-4 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="flex w-max gap-3 hover:[animation-play-state:paused]" style={{ animation: "marquee 60s linear infinite" }}>
            {[...TICKER, ...TICKER].map(([tool, text], i) => (
              <span key={i} className="flex items-center gap-2 whitespace-nowrap rounded-full border border-line-2 px-4 py-1.5 text-sm text-fg-2">
                <span className="size-2 rounded-full" style={{ background: `oklch(0.75 0.16 ${TOOLS[tool].hue})` }} />
                {text}
              </span>
            ))}
          </div>
        </div>

        {/* Proof: ownership facts, not testimonials */}
        <section className="flex flex-col items-center justify-center gap-4 px-4 py-24 sm:flex-row sm:px-8">
          {PROOF.map(([big, small, tag, hue, rot]) => (
            <div
              key={big}
              className="reveal flex aspect-[4/5] w-full max-w-[300px] flex-col justify-between rounded-[32px] border border-line p-6 transition duration-500 ease-out-expo hover:!rotate-0 hover:-translate-y-2"
              style={{ rotate: `${rot}deg`, background: `color-mix(in oklch, var(--ink-1) 82%, oklch(0.75 0.16 ${hue}))` }}
            >
              <span className="w-fit rounded-full bg-ink-0/40 px-3 py-1 text-xs text-fg-2">{tag}</span>
              <div>
                <div className="display text-4xl" style={{ letterSpacing: "-0.03em" }}>
                  {big}
                </div>
                <div className="mt-2 text-sm text-fg-2">{small}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Manifesto: words ink in as you scroll */}
        <section className="mx-2 rounded-[40px] bg-ink-2 px-4 py-24 sm:mx-4 sm:px-8 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-[5fr_7fr]">
            <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)] lg:sticky lg:top-28 lg:self-start">
              Stop renting your marketing brain.
            </h2>
            <div className="space-y-8 text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium leading-snug">
              {MANIFESTO.map((para) => (
                <p key={para}>
                  {para.split(" ").map((w, i) => (
                    <span key={i} className="ink">
                      {w}{" "}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* 01 · Gallery */}
        <section id="tools" className="scroll-mt-14 py-24">
          <div className="mb-12 flex flex-col justify-between gap-6 px-4 sm:px-8 lg:flex-row lg:items-end">
            <div>
              <Eyebrow n="01">Made with pebbles</Eyebrow>
              <h2 className="display mt-6 text-[clamp(2.8rem,8vw,6.5rem)]">
                Real work,
                <br />
                <span className="text-signal-text">done for you.</span>
              </h2>
            </div>
            <p className="max-w-md text-fg-3 leading-relaxed">
              This is what a week looks like when the pebbles are running. Every card is a real output type. Open one
              to see the tool behind it.
            </p>
          </div>
          <Gallery />
        </section>

        {/* 02 · Pains */}
        <section className="border-t border-line px-4 py-24 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Eyebrow n="02">Sound familiar?</Eyebrow>
              <h2 className="display mt-6 text-[clamp(2.8rem,8vw,6.5rem)]">
                You run the
                <br />
                <span className="outline-text">whole business.</span>
              </h2>
            </div>
            <p className="max-w-md text-fg-3 leading-relaxed">
              Marketing is one of twenty jobs on your plate. Here is what owners tell us, and the pebble that takes
              each one off it.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {PAINS.map(([quote, tool, fix]) => {
              const t = tool === "stack" ? null : TOOLS[tool];
              const hue = t?.hue ?? 122;
              return (
                <Link
                  key={quote}
                  href={t ? `/tools/${tool}` : "/#stack"}
                  className="reveal group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-line bg-ink-1 p-7 transition duration-500 ease-out-expo hover:-translate-y-1 hover:border-line-2"
                >
                  <div aria-hidden className="pebble absolute -right-16 -top-16 w-48 opacity-0 transition duration-700 group-hover:opacity-60" style={{ "--h": hue } as React.CSSProperties} />
                  <p className="relative text-[1.6rem] font-semibold leading-tight tracking-tight text-fg" style={{ fontStretch: "105%" }}>
                    “{quote}”
                  </p>
                  <div className="relative mt-8 border-t border-line pt-5">
                    <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: `oklch(0.78 0.16 ${hue})` }}>
                      <span className="pebble w-4" style={{ "--h": hue, animation: "none" } as React.CSSProperties} />
                      {t?.name ?? "The Stack"}
                    </div>
                    <p className="mt-2 text-fg-2">{fix}</p>
                    <span className="mt-4 inline-block text-sm text-fg-3 transition group-hover:translate-x-1 group-hover:text-fg">Fix this →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 02 · See it work */}
        <section id="demo" className="scroll-mt-14 border-t border-line">
          <div className="px-4 pt-24 pb-4 sm:px-8">
            <Eyebrow n="03">See it work</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.8rem,8vw,6.5rem)]">
              One brand.
              <br />
              <span className="outline-text">Five pebbles.</span>
            </h2>
            <p className="mt-6 max-w-xl text-fg-3 leading-relaxed">
              Real outputs for a sample coffee brand. Every tool reads the same research, so each pebble makes the
              next one smarter.
            </p>
          </div>
          <Walkthrough />
        </section>

        {/* 02 · How it works */}
        <section className="border-t border-line px-4 py-24 sm:px-8">
          <Eyebrow n="04">How it works</Eyebrow>
          <div className="mt-8 grid gap-12 md:grid-cols-3 md:gap-6">
            {STEPS.map(([title, body, link], i) => (
              <div key={title} className="border-t border-line pt-6">
                <div className="display outline-text text-8xl">0{i + 1}</div>
                <h3 className="display mt-8 text-3xl" style={{ letterSpacing: "-0.02em" }}>
                  {title}
                </h3>
                <p className="mt-4 max-w-sm text-fg-3 leading-relaxed">{body}</p>
                <div className="mt-6">
                  <TextLink href="#own">{link}</TextLink>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 03 · Ownership */}
        <section id="own" className="scroll-mt-14 grid gap-12 border-t border-line px-4 py-24 sm:px-8 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow n="05">Built to own</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.8rem,7vw,5.5rem)]">
              Your server.
              <br />
              Your data.
              <br />
              <span className="text-signal-text">Your rules.</span>
            </h2>
            <div className="mt-10 max-w-lg space-y-5 text-fg-3 leading-relaxed">
              <p>
                <strong className="font-medium text-fg">Self-hosted.</strong> Everything runs on infrastructure you
                control. Customer lists, drafts and reports never touch our servers.
              </p>
              <p>
                <strong className="font-medium text-fg">Any model.</strong> Bring your own API key or run fully
                offline with local models. You pay providers directly, with no markup.
              </p>
              <p>
                <strong className="font-medium text-fg">Pay once.</strong> A perpetual license with a year of
                updates included. Renewing is optional and the tools never stop working.
              </p>
            </div>
            <div className="mt-8">
              <TextLink href="#stack">Compare with renting SaaS</TextLink>
            </div>
          </div>
          <div className="rounded-2xl border border-line-2 bg-ink-1 font-mono text-[13px]">
            <div className="flex items-center gap-2 border-b border-line px-5 py-4">
              <span className="size-2.5 rounded-full bg-fg-3" />
              <span className="size-2.5 rounded-full bg-fg-3" />
              <span className="size-2.5 rounded-full bg-fg-3" />
              <span className="label ml-3">your-server</span>
            </div>
            <div className="space-y-2.5 p-5">
              {PIPELINE.map(([s, l]) => (
                <div key={l} className="flex gap-6">
                  <span className={s === "ok" ? "w-6 text-fg-3" : "w-6 text-signal-text"}>{s}</span>
                  <span className="text-fg-2">{l}</span>
                </div>
              ))}
              <div className="flex gap-6 pt-2">
                <span className="w-6 animate-pulse text-signal-text">●</span>
                <span className="text-fg">running · 0 bytes sent to us</span>
              </div>
            </div>
          </div>
        </section>

        {/* 04 · Agents */}
        <section id="agents" className="scroll-mt-14 grid gap-12 border-t border-line px-4 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
          <div aria-hidden className="relative mx-auto aspect-square w-full max-w-md">
            <div className="pebble absolute left-[8%] top-[30%] w-[58%]" style={{ "--h": 125 } as React.CSSProperties} />
            <div className="pebble absolute right-[6%] top-[8%] w-[34%]" style={{ "--h": 300, animationDelay: "-4s" } as React.CSSProperties} />
            <div className="pebble absolute bottom-[6%] right-[14%] w-[26%]" style={{ "--h": 200, animationDelay: "-8s" } as React.CSSProperties} />
          </div>
          <div>
            <Eyebrow n="06">Agents · coming soon</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.8rem,7vw,5.5rem)]">
              Agents that
              <br />
              do the work.
            </h2>
            <p className="mt-8 max-w-lg text-fg-2 leading-relaxed">
              Agents sit on top of your pebbles. A Launch agent researches rivals, drafts the campaign, builds the
              ads and schedules it all. You decide how much it does alone.
            </p>
            <h3 className="mt-10 font-semibold" style={{ fontStretch: "112%" }}>
              Autonomy you control
            </h3>
            <div className="mt-4 grid grid-cols-2 overflow-hidden rounded-xl border border-line">
              {AUTONOMY.map(([t, d], i) => (
                <div key={t} className={`p-4 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line" : ""}`}>
                  <div className="text-sm font-semibold">{t}</div>
                  <div className="mt-1 text-xs text-fg-3">{d}</div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <TextLink href="#drops">Join the agents waitlist</TextLink>
            </div>
          </div>
        </section>

        {/* 05 · Bring your own */}
        <section className="grid gap-12 border-t border-line px-4 py-24 sm:px-8 lg:grid-cols-2">
          <div>
            <Eyebrow n="07">Bring your own</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.8rem,7vw,5.5rem)]">
              Plug in
              <br />
              your stuff.
            </h2>
            <p className="mt-8 max-w-lg text-fg-2 leading-relaxed">
              Your brand, data, model and channels are set up once and shared by every tool. Every pebble you add
              already knows your business.
            </p>
          </div>
          <div className="grid overflow-hidden rounded-2xl border border-line sm:grid-cols-2">
            {BYO.map(([t, d], i) => (
              <div key={t} className={`p-7 ${i % 2 ? "sm:border-l" : ""} ${i ? "border-t sm:border-t-0" : ""} ${i > 1 ? "sm:border-t" : ""} border-line`}>
                <div className="font-mono text-2xl text-signal-text">{["Aa", "▤", "◎", "⇄"][i]}</div>
                <h3 className="display mt-8 text-xl" style={{ letterSpacing: "-0.01em" }}>
                  {t}
                </h3>
                <p className="mt-2 text-sm text-fg-3 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 06 · Stack builder */}
        <section id="stack" className="scroll-mt-14 border-t border-line px-4 py-24 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <Eyebrow n="08">Build your stack</Eyebrow>
              <h2 className="display mt-6 text-[clamp(2.8rem,8vw,6.5rem)]">
                More pebbles,
                <br />
                <span className="text-signal-text">less to pay.</span>
              </h2>
            </div>
            <p className="max-w-md text-fg-3 leading-relaxed">
              Pick the tools your business needs. 2 tools save 10%, 3 save 15%, 4 save 20%, and all of them is The
              Stack, our best price.
            </p>
          </div>
          <StackBuilder />
        </section>

        {/* 08 · FAQ */}
        <section id="faq" className="scroll-mt-14 grid gap-12 border-t border-line px-4 py-24 sm:px-8 lg:grid-cols-[5fr_7fr]">
          <div>
            <Eyebrow n="09">Questions</Eyebrow>
            <h2 className="display mt-6 text-[clamp(2.8rem,6vw,5rem)]">
              Fair
              <br />
              questions.
            </h2>
          </div>
          <div>
            {FAQ.map(([group, items]) => (
              <div key={group} className="mb-10">
                <div className="label mb-2">{group}</div>
                {items.map(([q, a]) => (
                  <details key={q} name="faq" className="group border-b border-line py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-medium">
                      {q}
                      <span className="text-2xl text-fg-3 transition group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 max-w-2xl leading-relaxed text-fg-2">{a}</p>
                  </details>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="relative overflow-hidden border-t border-line px-4 py-32 sm:px-8">
          <div aria-hidden className="pebble absolute -bottom-[30%] -right-[10%] w-[70vw] max-w-[820px] opacity-90" style={{ "--h": 122 } as React.CSSProperties} />
          <div className="relative">
            <h2 className="display text-[clamp(3.2rem,12vw,10rem)]">
              Own your
              <br />
              <span className="text-signal-text">growth.</span>
            </h2>
            <div className="mt-12 flex flex-wrap items-center gap-6">
              <a href="#stack" className="rounded-xl bg-signal px-6 py-4 text-lg font-semibold text-signal-ink hover:brightness-110">
                Build your stack →
              </a>
              <span className="text-sm text-fg-2">14-day free trial · runs on your machine</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
