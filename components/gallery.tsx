import Link from "next/link";
import { TOOLS, type ToolId } from "@/lib/stack";

// "Made with pebbles": code-drawn, looping scenes of real outcomes.
// Scenes are pure CSS/SVG on a fixed dark canvas (they're the "images").
// Swap any scene for a screen recording of the real tool when you have one.

const LIME = "#c6f135";
const anim = (name: string, dur: number, delay = 0, extra = "") =>
  ({ animation: `${name} ${dur}s ${extra || "ease-in-out"} ${delay}s infinite both` }) as React.CSSProperties;

function ContentScene() {
  const channels = ["#0a66c2", "#e1306c", "#f4f3ef", "#1877f2"];
  const filled = [0, 2, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 21, 22, 24, 26];
  return (
    <div className="absolute inset-0 flex items-start justify-center gap-8 bg-[radial-gradient(circle_at_30%_30%,#5a3a0a,#0c0b09_65%)] p-8 pt-16 pb-40 lg:items-center lg:pb-28">
      <div className="grid w-full max-w-[220px] grid-cols-7 gap-1.5 lg:max-w-sm">
        {Array.from({ length: 28 }, (_, i) => (
          <div key={i} className="aspect-square rounded-md bg-white/[0.06]">
            {filled.includes(i) && (
              <div className="size-full rounded-md" style={{ background: channels[i % 4], ...anim("pop", 7, filled.indexOf(i) * 0.18) }} />
            )}
          </div>
        ))}
      </div>
      <div className="relative hidden h-[300px] w-[160px] shrink-0 overflow-hidden rounded-[28px] border-4 border-[#222] bg-[#0f0f10] sm:block">
        <div style={anim("feed", 16, 0, "linear")}>
          {[0, 1].map((copy) =>
            ["#7a4a12", "#1e4b7a", "#5a1e4b", "#2f5a1e"].map((c, i) => (
              <div key={`${copy}${i}`} className="border-b border-white/5 p-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="size-4 rounded-full bg-[#c6f135]" />
                  <span className="h-1.5 w-14 rounded bg-white/30" />
                </div>
                <div className="mt-2 aspect-square rounded-lg" style={{ background: `linear-gradient(135deg, ${c}, #111)` }} />
                <div className="mt-2 h-1.5 w-full rounded bg-white/15" />
                <div className="mt-1 h-1.5 w-2/3 rounded bg-white/15" />
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  );
}

function CompetitorScene() {
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,#4a1414,#0c0909_65%)]">
      <svg viewBox="0 0 400 200" className="absolute inset-x-6 top-16 h-[38%] w-[calc(100%-3rem)]" preserveAspectRatio="none">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#ffffff10" />
        ))}
        <path d="M0 150 L80 146 L160 152 L240 147 L400 144" fill="none" stroke="#ffffff30" strokeWidth="2" />
        <path d="M0 132 L60 130 L120 134 L180 128 L250 131 L262 131 L266 74 L330 72 L400 70" fill="none" stroke="#ff6b5b" strokeWidth="3" pathLength={1} strokeDasharray="1" style={anim("draw", 6, 0, "ease-out")} />
      </svg>
      <div className="absolute left-[64%] top-[calc(4rem+11%)]">
        <span className="absolute size-3 rounded-full bg-[#ff6b5b]" style={anim("ping", 2, 0, "ease-out")} />
        <span className="relative block size-3 rounded-full bg-[#ff6b5b]" />
      </div>
      <div className="absolute right-5 top-5 rounded-xl border border-white/10 bg-black/60 px-3 py-2 font-mono text-[11px] text-white/80 backdrop-blur max-sm:hidden" style={anim("floaty", 5)}>
        <span className="text-[#ff6b5b]">▲ +12%</span> Northwind · pricing page
      </div>
    </div>
  );
}

function SentimentScene() {
  const words = [
    ["love the new blend", "#7ee08a", 8],
    ["shipping is slow", "#ff7a6b", 24],
    ["reordering!", "#7ee08a", 48],
    ["bit pricey", "#f2c45a", 66],
    ["5 stars ★", "#7ee08a", 14],
    ["late again", "#ff7a6b", 56],
    ["best beans ever", "#7ee08a", 34],
    ["great gift", "#7ee08a", 74],
  ] as const;
  return (
    <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(circle_at_50%_100%,#3a1a5a,#0b0a0f_70%)]">
      {words.map(([w, c, left], i) => (
        <span
          key={w}
          className="absolute bottom-[42%] whitespace-nowrap rounded-full border px-3 py-1 text-xs"
          style={{ left: `${left}%`, color: c, borderColor: `${c}55`, background: `${c}14`, ...anim("drift", 9 + (i % 3), -i * 1.3, "linear") }}
        >
          {w}
        </span>
      ))}
      <div className="absolute right-5 top-5 text-right">
        <div className="font-mono text-[10px] tracking-[0.16em] text-white/50">SENTIMENT · 7D</div>
        <div className="display text-4xl text-white">+8%</div>
      </div>
    </div>
  );
}

function AdsScene() {
  const ads = [
    ["Your morning, upgraded.", 0.52, "#7a3a12"],
    ["Fresh beans. Zero effort.", 0.97, "#5a5a0a"],
    ["Skip the café line.", 0.7, "#123a5a"],
    ["Roasted Monday.", 0.4, "#3a125a"],
  ] as const;
  return (
    <div className="absolute inset-0 grid grid-cols-2 gap-2.5 bg-[#0b0d10] p-4 pt-14 pb-36">
      {ads.map(([h, w, c], i) => (
        <div key={h} className="flex flex-col justify-between rounded-xl p-2.5" style={{ background: `linear-gradient(150deg, ${c}, #0d0d0d)`, ...(i === 1 ? anim("glow", 2.4) : {}) }}>
          <div className="text-[11px] font-semibold leading-tight text-white">{h}</div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div className="h-full origin-left rounded-full" style={{ width: `${w * 100}%`, background: i === 1 ? LIME : "#ffffff70", ...anim("race", 5, i * 0.15, "cubic-bezier(.16,1,.3,1)") }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SeoScene() {
  const nodes = [
    [70, 50, "gift box", true],
    [330, 42, "best decaf", false],
    [55, 160, "oat latte at home", true],
    [340, 165, "single origin", true],
    [200, 28, "cold brew kit", false],
  ] as const;
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#123a1a,#090c09_70%)]">
      <svg viewBox="0 0 400 220" className="absolute inset-x-0 top-12 h-[52%] w-full">
        {nodes.map(([x, y], i) => (
          <line key={i} x1="200" y1="110" x2={x} y2={y} stroke="#ffffff40" pathLength={1} strokeDasharray="1" style={anim("draw", 6, i * 0.3, "ease-out")} />
        ))}
        <circle cx="200" cy="110" r="7" fill="#f4f3ef" />
        <text x="200" y="134" textAnchor="middle" fill="#f4f3ef" fontSize="12">coffee subscription</text>
        {nodes.map(([x, y, label, win], i) => (
          <g key={label} style={anim("floaty", 4 + i * 0.4, i * 0.3)}>
            <circle cx={x} cy={y} r={win ? 6 : 4} fill={win ? LIME : "#ffffff70"} />
            <text x={x} y={y + 18} textAnchor="middle" fill={win ? LIME : "#ffffff90"} fontSize="10">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function BriefScene() {
  const lines = [0.92, 0.8, 0.95, 0.6, 0.88, 0.72];
  return (
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#3a2a12,#0c0b09_70%)]">
      <div className="absolute inset-x-[12%] top-14 -rotate-2 rounded-xl bg-[#f4f3ef] p-4 text-[#1c1b17] shadow-2xl" style={anim("floaty", 6)}>
        <div className="font-mono text-[9px] tracking-[0.16em] text-[#75736c]">WEEKLY RIVAL BRIEF · MON</div>
        <div className="mt-1 text-sm font-bold">3 things that changed</div>
        <div className="mt-3 space-y-1.5">
          {lines.map((w, i) => (
            <div key={i} className="h-1.5 origin-left rounded" style={{ width: `${w * 100}%`, background: i === 2 ? "#a8cf1f" : "#1c1b1730", ...anim("typing", 7, i * 0.35, "linear") }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ReviewsScene() {
  const cols = [
    ["Shipping", "#ff7a6b", ["took 9 days", "box was crushed", "slow again"]],
    ["Taste", "#7ee08a", ["perfect roast", "smooth, no bitterness", "best decaf"]],
    ["Price", "#f2c45a", ["worth it", "bit pricey", "loyalty deal?"]],
  ] as const;
  return (
    <div className="absolute inset-0 grid grid-cols-3 gap-2.5 overflow-hidden bg-[#0b0b0d] p-4 pt-14 pb-36">
      {cols.map(([name, c, items], ci) => (
        <div key={name} className="overflow-hidden rounded-xl bg-white/[0.04] p-2">
          <div className="mb-2 flex items-center gap-1.5 text-[11px] text-white/80">
            <span className="size-1.5 rounded-full" style={{ background: c }} />
            {name}
          </div>
          <div className="space-y-1.5">
            {items.map((t, i) => (
              <div key={t} className="rounded-md border border-white/5 bg-black/40 px-2 py-1.5 text-[10px] text-white/70" style={anim("drop", 8, ci * 0.4 + i * 0.9)}>
                {t}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AgentScene() {
  const steps = ["Research", "Write", "Build ads", "Schedule"];
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_50%_35%,#2a3a0a,#0a0b08_70%)] pb-36">
      <div className="relative size-48">
        <div className="absolute inset-0 rounded-full border border-dashed border-white/15" />
        <div className="absolute inset-0" style={anim("spin", 24, 0, "linear")}>
          {steps.map((s, i) => (
            <div key={s} className="absolute left-1/2 top-1/2" style={{ transform: `rotate(${i * 90}deg) translateY(-96px)` }}>
              <div style={{ transform: `rotate(${-i * 90}deg)` }}>
                <div className="-translate-x-1/2 -translate-y-1/2" style={{ animation: "spin 24s linear infinite reverse" }}>
                  <span className="block whitespace-nowrap rounded-full border border-white/10 bg-black/70 px-3 py-1 text-[11px] text-white/80">{s}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="pebble absolute left-1/2 top-1/2 w-20 -translate-x-1/2 -translate-y-1/2" style={{ "--h": 122 } as React.CSSProperties} />
      </div>
    </div>
  );
}

type Piece = { scene: React.ReactNode; tool: ToolId | "agents"; kind: string; title: string; desc: string; span: string; badge?: string };

const PIECES: Piece[] = [
  { scene: <ContentScene />, tool: "content-os", kind: "Calendar", title: "A month of posts, by lunch", desc: "16 posts across 4 channels, researched, written and scheduled.", span: "lg:col-span-7 lg:row-span-2" },
  { scene: <CompetitorScene />, tool: "competitor", kind: "Alert", title: "Rival raised prices", desc: "Spotted the same morning, with the page that changed.", span: "lg:col-span-5" },
  { scene: <SentimentScene />, tool: "sentiment", kind: "Live feed", title: "The mood, mapped", desc: "Every mention scored as it lands.", span: "lg:col-span-5" },
  { scene: <AdsScene />, tool: "ads", kind: "A/B test", title: "Variant 2 wins", desc: "Four ads raced. The winner gets the budget.", span: "lg:col-span-4" },
  { scene: <SeoScene />, tool: "seo", kind: "Keyword map", title: "Where you can rank", desc: "Lime dots are quick wins you can take this quarter.", span: "lg:col-span-4" },
  { scene: <BriefScene />, tool: "competitor", kind: "Brief", title: "Monday brief, written", desc: "What rivals did last week and what to do about it.", span: "lg:col-span-4" },
  { scene: <ReviewsScene />, tool: "sentiment", kind: "Themes", title: "Reviews, sorted", desc: "Hundreds of reviews grouped into what to fix and what to brag about.", span: "lg:col-span-5" },
  { scene: <AgentScene />, tool: "agents", kind: "Agent", title: "The Launch agent", desc: "Runs research, writing, ads and scheduling as one job.", span: "lg:col-span-7", badge: "Soon" },
];

export function Gallery() {
  return (
    <div className="grid auto-rows-[380px] gap-3 px-4 sm:px-8 lg:grid-cols-12">
      {PIECES.map((p) => {
        const name = p.tool === "agents" ? "Agents" : TOOLS[p.tool].name;
        return (
          <Link
            key={p.title}
            href={p.tool === "agents" ? "/#agents" : `/tools/${p.tool}`}
            className={`reveal group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0e] ${p.span}`}
          >
            <div className="absolute inset-0 transition duration-700 ease-out-expo group-hover:scale-[1.04]">{p.scene}</div>
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute left-4 top-4 flex gap-2">
              <span className="rounded-md bg-black/70 px-2 py-1 font-mono text-[11px] tracking-[0.14em] text-white/90">{name.toUpperCase()}</span>
              {p.badge && <span className="rounded-md bg-[#c6f135] px-2 py-1 font-mono text-[11px] tracking-[0.14em] text-[#0e1400]">{p.badge.toUpperCase()}</span>}
            </div>
            <div className="absolute inset-x-5 bottom-5">
              <h3 className="display text-[clamp(1.6rem,2.6vw,2.3rem)] text-white" style={{ letterSpacing: "-0.02em" }}>
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm text-white/70">{p.desc}</p>
              <span className="mt-3 inline-block translate-y-2 text-sm font-medium text-[#c6f135] opacity-0 transition duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {p.tool === "agents" ? "Join the waitlist →" : `Open ${name} →`}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
