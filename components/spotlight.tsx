"use client";

import { useEffect } from "react";

// One listener for the whole page: the .spot (or [data-spot]) card under the cursor gets --mx/--my,
// which children inherit, so an overlay inside a card can draw the light.
export function Spotlight() {
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>(".spot, [data-spot]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", move, { passive: true });
    return () => document.removeEventListener("pointermove", move);
  }, []);
  return null;
}
