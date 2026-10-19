import { TOOLS, type ToolId } from "@/lib/stack";

// Line icons per tool, drawn on a tinted tile. "stack" and "agent" cover the bundle and agents.
export type IconId = ToolId | "stack" | "agent";

const PATHS: Record<IconId, React.ReactNode> = {
  "content-os": (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8.5 14.5l2 2 4-4" />
    </>
  ),
  competitor: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <path d="M12 12l5.5-5.5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </>
  ),
  sentiment: <path d="M3 12h3.5l2.5-6 4 12 2.5-6H21" />,
  ads: <path d="M4 10.5v3a1 1 0 0 0 1 1h2l5.5 4v-13L7 9.5H5a1 1 0 0 0-1 1zM16 9a3.5 3.5 0 0 1 0 6M18.5 6.5a7 7 0 0 1 0 11" />,
  seo: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M15.5 15.5L20.5 20.5M7.5 12l2-2 1.5 1.5 2.5-3" />
    </>
  ),
  stack: <path d="M12 3.5l8.5 4.5-8.5 4.5L3.5 8zM3.5 12.5l8.5 4.5 8.5-4.5M3.5 16.5l8.5 4.5 8.5-4.5" />,
  agent: <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" />,
};

export const hueOf = (id: IconId) => (id === "stack" || id === "agent" ? 122 : TOOLS[id].hue);

export function ToolIcon({ id, size = 40, className = "" }: { id: IconId; size?: number; className?: string }) {
  const h = hueOf(id);
  return (
    <span
      className={`inline-grid shrink-0 place-items-center rounded-[28%] ${className}`}
      style={{ width: size, height: size, background: `oklch(0.72 0.15 ${h} / 0.16)`, color: `oklch(var(--icon-l) 0.16 ${h})`, boxShadow: `inset 0 0 0 1px oklch(0.72 0.15 ${h} / 0.28)` }}
    >
      <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {PATHS[id]}
      </svg>
    </span>
  );
}
