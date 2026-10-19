import type { Metadata } from "next";
import { Savings } from "@/components/savings";
import { StackBuilder } from "@/components/stack-builder";
import { ToolIcon } from "@/components/tool-icon";
import { Eyebrow, PageHero, TextLink } from "@/components/ui";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: `Pricing · ${BRAND.name}`,
  description: "Pay once and own your AI marketing tools. Combo discounts, no subscriptions, no seats.",
};

// Draft: confirm every item before launch.
const INCLUDED = [
  ["Perpetual license", "The version you buy works forever, even if you never renew."],
  ["12 months of updates", "New features and fixes for a year. Renewing after that is optional."],
  ["14-day free trial", "Every feature, on your own machine, with no card needed."],
  ["Offline license check", "Runs on locked-down servers. Nothing phones home."],
  ["Full data export", "CSV and JSON for everything, any time."],
  ["Email support", "Real people who built the tools."],
];

const ADDONS: [string, string, string, "stack" | "agent" | "competitor" | "content-os"][] = [
  ["Update renewal", "Optional", "Keep getting new features and every new tool after your first year.", "stack"],
  ["Done-for-you install", "One-time", "We set everything up on your cloud and hand you the keys in a day.", "content-os"],
  ["Priority support", "Yearly", "Same-day answers and a direct line to the team.", "competitor"],
  ["Agency license", "Per agency", "Unlimited client workspaces and white-labelled reports.", "agent"],
];

const PRICING_FAQ = [
  ["Is this really a one-time payment?", "Yes. You pay once per tool or once for The Stack. The only ongoing cost is your AI provider's usage, which you pay them directly."],
  ["How do combo discounts work?", "2 tools save 10%, 3 save 15%, 4 save 20%, and every tool together is The Stack, our lowest price. Only the best discount applies."],
  ["Can I add tools later?", "Yes. Tools you already own count toward your combo discount when you add more."],
  ["What happens when updates end?", "Nothing breaks. You keep the version you have. Renew only if you want what's new."],
];

export default function PricingPage() {
  return (
    <main>
      <PageHero eyebrow="Pricing" title="Pay once." accent="Own it forever.">
        No seats, no monthly bills and no price creep. Pick the tools your business needs and the more you stack, the
        less each one costs.
      </PageHero>

      <section id="stack" className="surface-light scroll-mt-16 px-4 py-24 sm:px-8">
        <Eyebrow n="01">Build your stack</Eyebrow>
        <h2 className="display mt-6 mb-12 text-[clamp(2.4rem,5vw,4.5rem)]">More tools, less to pay.</h2>
        <StackBuilder />
      </section>

      <section className="px-4 py-24 sm:px-8">
        <Eyebrow n="02">Rent vs own</Eyebrow>
        <h2 className="display mt-6 mb-12 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)]">See what renting really costs you.</h2>
        <Savings />
      </section>

      <section className="surface-light grid gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[5fr_7fr]">
        <div>
          <Eyebrow n="03">Every license</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">What you get.</h2>
          <p className="mt-6 max-w-md text-fg-2">Included with every tool and with The Stack. Full terms come with your license.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {INCLUDED.map(([t, d]) => (
            <div key={t} className="neu spot reveal rounded-2xl p-6">
              <span className="neu-in grid size-9 place-items-center rounded-full text-sm text-signal-text">✓</span>
              <h3 className="mt-5 font-semibold">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-3">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-4 py-24 sm:px-8">
        <Eyebrow n="04">Add-ons</Eyebrow>
        <h2 className="display mt-6 mb-12 text-[clamp(2.4rem,5vw,4.5rem)]">Only if you want them.</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {ADDONS.map(([t, when, d, icon]) => (
            <div key={t} className="glass spot lift reveal flex flex-col rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <ToolIcon id={icon} size={40} />
                <span className="label">{when}</span>
              </div>
              <h3 className="display mt-8 text-xl" style={{ letterSpacing: "-0.01em" }}>
                {t}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-fg-3">{d}</p>
              <div className="mt-6">
                <TextLink href="/#drops">Ask about it</TextLink>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-light grid gap-12 px-4 py-24 sm:px-8 lg:grid-cols-[5fr_7fr]">
        <div>
          <Eyebrow n="05">Pricing questions</Eyebrow>
          <h2 className="display mt-6 text-[clamp(2.4rem,5vw,4.5rem)]">Straight answers.</h2>
        </div>
        <div className="space-y-3">
          {PRICING_FAQ.map(([q, a]) => (
            <details key={q} name="pricing-faq" className="neu group rounded-2xl px-6 py-5 open:neu-in">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-medium">
                {q}
                <span className="text-xl text-fg-3 transition duration-300 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-fg-2">{a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
