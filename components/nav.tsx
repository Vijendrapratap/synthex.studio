"use client";

import Link from "next/link";
import { useState } from "react";
import { ToolIcon } from "@/components/tool-icon";
import { Logo } from "@/components/ui";
import { quote, STACK_PRICE, TOOLS, type ToolId } from "@/lib/stack";

const LINKS = [
  ["Agents", "/agents"],
  ["Ownership", "/ownership"],
  ["Pricing", "/pricing"],
];

const ids = Object.keys(TOOLS) as ToolId[];
const stackSave = Math.round((1 - STACK_PRICE / quote(ids).list) * 100);

function ToolLinks({ onPick }: { onPick?: () => void }) {
  return (
    <>
      {ids.map((id) => (
        <Link key={id} href={`/tools/${id}`} onClick={onPick} className="group/item flex items-start gap-3 rounded-xl p-3 transition hover:bg-white/[0.05]">
          <ToolIcon id={id} size={36} />
          <span>
            <span className="flex items-center gap-2 text-sm font-semibold text-fg">
              {TOOLS[id].name}
              <span className="text-fg-3 opacity-0 transition group-hover/item:translate-x-0.5 group-hover/item:opacity-100">→</span>
            </span>
            <span className="mt-0.5 block text-xs leading-relaxed text-fg-3">{TOOLS[id].line}</span>
          </span>
        </Link>
      ))}
    </>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="surface-dark fixed inset-x-0 top-0 z-50 !bg-transparent">
      <div className="glass !rounded-none !border-x-0 !border-t-0 !bg-[#070707]/85">
        <nav className="flex h-16 items-center justify-between px-4 sm:px-8">
          <Logo />

          <div className="hidden items-center gap-1 text-sm text-fg-2 md:flex">
            {/* Mega menu opens on hover or keyboard focus, no JS needed */}
            <div className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-3 py-2 transition hover:text-fg group-focus-within:text-fg">
                Tools <span className="text-[10px] transition duration-300 group-hover:rotate-180 group-focus-within:rotate-180">▾</span>
              </button>
              <div className="invisible absolute left-1/2 top-full w-[760px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition duration-300 ease-out-expo group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                <div className="glass grid grid-cols-[1fr_230px] gap-3 rounded-2xl !bg-[#0f0f10]/95 p-3">
                  <div className="grid grid-cols-2 gap-1">
                    <ToolLinks />
                  </div>
                  <Link href="/pricing" className="spot relative flex flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#141415] bg-[radial-gradient(circle_at_80%_0%,#c6f13540,transparent_60%)] p-5">
                    <ToolIcon id="stack" size={40} />
                    <div>
                      <div className="label !text-signal-text">The Stack</div>
                      <div className="display mt-2 text-2xl text-fg" style={{ letterSpacing: "-0.02em" }}>
                        All {ids.length} tools
                      </div>
                      <p className="mt-2 text-xs leading-relaxed text-fg-3">
                        ${STACK_PRICE} once · save {stackSave}% · every new tool for a year
                      </p>
                      <span className="mt-4 inline-block text-sm font-medium text-signal-text">Build your stack →</span>
                    </div>
                  </Link>
                  <Link href="/tools" className="col-span-2 flex items-center justify-between rounded-xl border-t border-white/5 px-3 pt-3 pb-1 text-xs text-fg-3 hover:text-fg">
                    <span>See how the tools work together</span>
                    <span>Browse all tools →</span>
                  </Link>
                </div>
              </div>
            </div>
            {LINKS.map(([label, href]) => (
              <Link key={href} href={href} className="rounded-lg px-3 py-2 transition hover:text-fg">
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Link href="/pricing" className="btn whitespace-nowrap rounded-lg px-3.5 py-2 text-sm">
              <span className="sm:hidden">Pricing</span>
              <span className="max-sm:hidden">Build your stack</span>
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="neu-in grid size-10 place-items-center rounded-lg md:hidden"
            >
              <span className="relative block h-3 w-4">
                <span className={`absolute left-0 h-0.5 w-4 rounded bg-fg transition duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                <span className={`absolute left-0 top-1.5 h-0.5 w-4 rounded bg-fg transition duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 h-0.5 w-4 rounded bg-fg transition duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div className={`glass !bg-[#0a0a0b]/95 max-h-[calc(100svh-4rem)] overflow-y-auto !rounded-none !border-x-0 !border-t-0 transition-all duration-500 ease-out-expo md:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-3 opacity-0"}`}>
        <div className="space-y-1 p-4">
          <div className="label px-3 pb-1">Tools</div>
          <ToolLinks onPick={close} />
          <div className="my-3 border-t border-line" />
          {[["All tools", "/tools"], ...LINKS].map(([label, href]) => (
            <Link key={href} href={href} onClick={close} className="block rounded-xl px-3 py-3 text-lg font-semibold text-fg hover:bg-white/[0.05]">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
