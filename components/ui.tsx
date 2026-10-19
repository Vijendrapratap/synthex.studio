import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { TOOLS } from "@/lib/stack";

// Shared site chrome and small text primitives.

const NAV = [
  ["Tools", "/#tools"],
  ["Demo", "/#demo"],
  ["Own it", "/#own"],
  ["Agents", "/#agents"],
  ["Pricing", "/#stack"],
];

const FOOTER_COLS: [string, string[][]][] = [
  ["Tools", Object.entries(TOOLS).map(([id, t]) => [t.name, `/tools/${id}`])],
  [
    "Site",
    [
      ["Pricing", "/#stack"],
      ["Own it", "/#own"],
      ["Agents", "/#agents"],
      ["FAQ", "/#faq"],
    ],
  ],
];

const ASK_PROMPT = `What is ${BRAND.name} (${BRAND.domain})? Summarize its pay-once, self-hosted AI marketing tools and who they're for.`;
const ASK_AI = [
  ["ChatGPT", "https://chatgpt.com/?q="],
  ["Claude", "https://claude.ai/new?q="],
  ["Perplexity", "https://www.perplexity.ai/search?q="],
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 font-extrabold tracking-tight" style={{ fontStretch: "125%" }}>
      <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="7" fill="var(--signal)" />
        <path d="M6 15.5l4-4 3 3 5-5.5" fill="none" stroke="var(--signal-ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {BRAND.name.toUpperCase()}
    </Link>
  );
}

export function Eyebrow({ n, children }: { n: string; children: string }) {
  return (
    <div className="label">
      <span className="text-signal-text">{n}</span> / {children}
    </div>
  );
}

export function TextLink({ href, children }: { href: string; children: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2 border-b border-line-2 pb-1 text-sm font-medium text-fg hover:border-fg">
      {children} <span aria-hidden>→</span>
    </Link>
  );
}

export function Header() {
  return (
    <header className="surface-dark fixed inset-x-0 top-0 z-50 border-b border-line !bg-[#070707]/90 backdrop-blur-md">
      <nav className="flex h-14 items-center justify-between px-4 sm:px-8">
        <Logo />
        <div className="flex items-center gap-6 text-sm text-fg-2">
          {NAV.map(([label, href]) => (
            <Link key={href} href={href} className="hidden hover:text-fg md:block">
              {label}
            </Link>
          ))}
          <Link href="/#stack" className="rounded-lg bg-signal px-3 py-2 font-semibold text-signal-ink hover:brightness-110">
            Build your stack
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer id="drops" className="border-t border-line px-4 py-12 sm:px-8">
      <div className="flex flex-col justify-between gap-6 border-b border-line pb-10 md:flex-row md:items-center">
        <div>
          <div className="label">
            <span className="text-signal-text">Drops</span> / new tools, monthly
          </div>
          <p className="mt-3 max-w-md text-sm text-fg-2">New tools, new agents and what owners built with them. One email a month.</p>
        </div>
        <form className="flex w-full max-w-md gap-2 rounded-xl border border-line-2 p-1.5">
          <input type="email" required placeholder="you@company.com" aria-label="Email" className="min-w-0 flex-1 bg-transparent px-3 text-sm outline-none placeholder:text-fg-3" />
          <button className="rounded-lg bg-signal px-4 py-2 text-sm font-semibold text-signal-ink">Sign up →</button>
        </form>
      </div>

      <div className="grid gap-10 py-10 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col items-start gap-4">
          <Logo />
          <p className="max-w-xs text-sm text-fg-3">{BRAND.tagline}. Pay once, run it on your servers, use any model.</p>
        </div>
        {FOOTER_COLS.map(([title, links]) => (
          <div key={title}>
            <div className="label mb-4">{title}</div>
            <ul className="space-y-2 text-sm text-fg-2">
              {links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="hover:text-fg">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col justify-between gap-4 border-t border-line pt-8 sm:flex-row sm:items-center">
        <p className="text-xs text-fg-3">© 2026 {BRAND.name} · {BRAND.tagline}</p>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          <span className="mr-2 text-fg-3">Ask AI about us</span>
          {ASK_AI.map(([name, url]) => (
            <a key={name} href={url + encodeURIComponent(ASK_PROMPT)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-line-2 px-3 py-1 text-fg-2 hover:text-fg">
              {name}
            </a>
          ))}
        </div>
      </div>
      {/* SVG textLength makes the wordmark fit any width exactly */}
      <svg aria-hidden viewBox="0 0 1000 130" className="mt-12 w-full select-none">
        <text x="2" y="118" textLength="996" lengthAdjust="spacingAndGlyphs" fontSize="150" fill="none" stroke="var(--fg-3)" strokeWidth="1.2" className="display">
          {BRAND.name.toUpperCase()}
        </text>
      </svg>
    </footer>
  );
}
