import { TextLink } from "@/components/ui";
import { TOOLS, type ToolId } from "@/lib/stack";

// Realistic output mocks per tool. Demo data only: fictional brands.

function Chip({ tone = "fg", children }: { tone?: "good" | "bad" | "mid" | "fg"; children: React.ReactNode }) {
  const c = { good: "oklch(0.75 0.17 145)", bad: "oklch(0.7 0.18 25)", mid: "oklch(0.8 0.14 85)", fg: "var(--fg-3)" }[tone];
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] whitespace-nowrap" style={{ color: c, borderColor: `color-mix(in oklch, ${c} 35%, transparent)` }}>
      <span className="size-1.5 rounded-full" style={{ background: c }} />
      {children}
    </span>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`glass reveal rounded-3xl p-5 ${className}`}>{children}</div>;
}

const COMPETITORS = [
  ["Northwind Coffee", "Raised subscription price 12%", "Today", "bad"],
  ["Brewly", "Launched oat-latte campaign on Reels", "2d ago", "mid"],
  ["Bean & Co", "New landing page: /gift-boxes", "5d ago", "fg"],
  ["Roastery X", "Hiring 3 growth marketers", "1w ago", "fg"],
] as const;

const MENTIONS = [
  ["Reddit", "Love the new blend but shipping took 9 days 😩", "Mixed", "mid"],
  ["Review ★★★★★", "Best coffee subscription I've tried, period.", "Positive", "good"],
  ["X", "prices went up AGAIN? switching to Brewly", "Negative", "bad"],
] as const;

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const POSTS = [0, 1, 3, 4, 6];

const ADS = [
  ["Your morning, upgraded.", 2.1],
  ["Fresh beans. Zero effort.", 3.9],
  ["Skip the café line.", 2.8],
  ["Roasted Monday, yours Wednesday.", 1.6],
] as const;

const KEYWORDS = [
  ["coffee subscription gift", "8.1k", 18],
  ["best decaf beans", "5.4k", 22],
  ["oat milk latte at home", "3.2k", 12],
  ["single origin vs blend", "2.7k", 9],
] as const;

export const MOCKS: Record<ToolId, React.ReactNode> = {
  competitor: (
    <div className="space-y-3">
      {COMPETITORS.map(([name, signal, when, tone]) => (
        <Card key={name} className="flex flex-wrap items-center justify-between gap-3 !rounded-full !py-3">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-ink-3 text-sm font-bold">{name[0]}</span>
            <div className="text-sm font-semibold">{name}</div>
          </div>
          <Chip tone={tone}>
            {signal} · {when}
          </Chip>
        </Card>
      ))}
    </div>
  ),
  sentiment: (
    <div className="space-y-3">
      <Card className="flex items-end justify-between">
        <div>
          <div className="label">Brand sentiment · 7 days</div>
          <div className="display mt-2 text-5xl" style={{ letterSpacing: "-0.02em" }}>
            +8%
          </div>
        </div>
        <div className="flex h-16 items-end gap-1.5">
          {[30, 42, 38, 55, 48, 62, 70].map((h, i) => (
            <span key={i} className="w-3 rounded-sm bg-signal" style={{ height: `${h}%`, opacity: 0.35 + i * 0.1 }} />
          ))}
        </div>
      </Card>
      {MENTIONS.map(([src, text, label, tone]) => (
        <Card key={text} className="!py-4">
          <div className="flex items-center justify-between gap-3">
            <span className="label">{src}</span>
            <Chip tone={tone}>{label}</Chip>
          </div>
          <p className="mt-2 text-sm text-fg-2">“{text}”</p>
        </Card>
      ))}
    </div>
  ),
  "content-os": (
    <div className="space-y-3">
      <Card className="!p-4">
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {DAYS.map((d, i) => (
            <div key={d}>
              <div className="label !text-[10px] !tracking-[0.1em]">{d}</div>
              <div className={`mt-2 h-14 rounded-lg ${POSTS.includes(i) ? "bg-signal/80" : "bg-ink-3"}`} />
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold">LinkedIn · Tue 9:00</span>
          <Chip tone="good">Scheduled</Chip>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-fg-2">
          Your customers are asking about <mark className="bg-transparent text-signal-text">shipping times</mark> more than price. So
          this week we&apos;re showing the roast-to-door journey: <mark className="bg-transparent text-signal-text">48 hours, start to finish</mark>.
          Here&apos;s how we do it…
        </p>
        <div className="mt-3 text-xs text-fg-3">Highlighted lines came from Market Sentiment research</div>
      </Card>
    </div>
  ),
  ads: (
    <div className="grid grid-cols-2 gap-3">
      {ADS.map(([headline, ctr], i) => (
        <Card key={headline} className={`!p-4 ${i === 1 ? "ring-1 ring-signal" : ""}`}>
          <div className="aspect-video rounded-xl" style={{ background: `linear-gradient(135deg, oklch(0.45 0.12 ${40 + i * 50}), oklch(0.25 0.06 ${40 + i * 50}))` }} />
          <div className="mt-3 text-sm font-semibold leading-snug">{headline}</div>
          <div className="mt-3 flex items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink-3">
              <div className="h-full rounded-full bg-signal" style={{ width: `${(ctr / 4) * 100}%` }} />
            </div>
            <span className="font-mono text-[11px] text-fg-2">{ctr}%</span>
          </div>
          {i === 1 && <div className="mt-2 font-mono text-[10px] tracking-[0.14em] text-signal-text">WINNER</div>}
        </Card>
      ))}
    </div>
  ),
  seo: (
    <Card className="!p-0">
      <div className="grid grid-cols-[1fr_auto_auto] gap-x-6 border-b border-line px-5 py-3 label">
        <span>Keyword</span>
        <span>Volume</span>
        <span>Difficulty</span>
      </div>
      {KEYWORDS.map(([kw, vol, kd]) => (
        <div key={kw} className="grid grid-cols-[1fr_auto_auto] items-center gap-x-6 border-b border-line px-5 py-3.5 text-sm last:border-0">
          <span className="flex flex-wrap items-center gap-2">
            {kw} {kd < 15 && <Chip tone="good">Quick win</Chip>}
          </span>
          <span className="font-mono text-fg-2">{vol}</span>
          <span className="font-mono text-fg-2">{kd}</span>
        </div>
      ))}
    </Card>
  ),
};

export const COPY: Record<ToolId, [string, string]> = {
  competitor: ["Know first.", "Pricing changes, launches, new pages and job posts from every rival, with the date and a source link. Delivered as a weekly brief."],
  sentiment: ["Hear the room.", "Reviews, Reddit, X and comments, scored and grouped by theme, so you know what to fix and what to shout about."],
  "content-os": ["Never blank-page again.", "A month of posts written from your research, in your brand voice, scheduled across every channel. Not a template with your name swapped in."],
  ads: ["Let the numbers pick.", "Generate ad variants, push them to Meta and Google, and watch the winner rise. Losing ads get paused automatically."],
  seo: ["Rank where you can win.", "Find keywords where you have a real chance, then get a brief for each one ready for Content OS to write."],
};

export function Walkthrough() {
  return (
    <div>
      {(Object.keys(TOOLS) as ToolId[]).map((id) => {
        const t = TOOLS[id];
        const [title, body] = COPY[id];
        return (
          <div
            key={id}
            className="grid items-center gap-10 px-4 py-20 sm:px-8 lg:min-h-[90vh] lg:grid-cols-2"
            style={{ background: `color-mix(in oklch, var(--ink-0) 93%, oklch(0.7 0.16 ${t.hue}))` }}
          >
            <div className="lg:sticky lg:top-32 lg:self-start lg:pt-16">
              <div className="label">
                <span style={{ color: `oklch(0.75 0.16 ${t.hue})` }}>●</span> {t.name} · {t.stage}
              </div>
              <h3 className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">{title}</h3>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-2">{body}</p>
              <div className="mt-8 flex flex-wrap gap-6">
                <TextLink href={`/tools/${id}`}>{`Explore ${t.name}`}</TextLink>
                <TextLink href={`/pricing?stack=${id}#stack`}>{`Add to stack · $${t.price}`}</TextLink>
              </div>
            </div>
            <div className="mx-auto w-full max-w-xl">{MOCKS[id]}</div>
          </div>
        );
      })}
    </div>
  );
}
