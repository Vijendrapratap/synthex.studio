"use client";

// No React state: the active button is styled from html[data-theme] directly.
function apply(theme: string) {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem("theme", theme);
  } catch {}
}

const ACTIVE = {
  dark: "bg-ink-3 text-fg [:root[data-theme=light]_&]:bg-transparent [:root[data-theme=light]_&]:text-fg-3",
  light: "text-fg-3 [:root[data-theme=light]_&]:bg-ink-3 [:root[data-theme=light]_&]:text-fg",
};

export function ThemeToggle() {
  return (
    <div className="flex rounded-full border border-line-2 p-1 text-xs">
      {(["dark", "light"] as const).map((t) => (
        <button key={t} onClick={() => apply(t)} className={`rounded-full px-3 py-1 capitalize transition ${ACTIVE[t]}`}>
          {t}
        </button>
      ))}
    </div>
  );
}
