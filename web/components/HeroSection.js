"use client";

import Link from "next/link";

const highlights = [
  { icon: "📸", label: "Snap photos instantly" },
  { icon: "💷", label: "Track prices in seconds" },
  { icon: "🔍", label: "Search your stock anytime" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-paper via-paper-dim to-paper shadow-[0_24px_80px_-24px_rgba(0,0,0,0.3)] sm:p-8 lg:p-10 p-6">
      {/* Light mode radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.9),transparent_50%)] dark:hidden" />
      {/* Dark mode ambient glows */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-brass/10 blur-3xl pointer-events-none hidden dark:block" />
      <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-moss/10 blur-3xl pointer-events-none hidden dark:block" />

      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* ── Left column ── */}
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-brass">
            Smart stock ledger
          </p>

          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Turn everyday stock into a{" "}
            <span className="relative inline-block">
              <span className="relative z-10">beautiful,</span>
              <span className="absolute inset-x-0 bottom-0.5 h-2 bg-brass/20 rounded-sm -z-0" />
            </span>{" "}
            searchable inventory book.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
            Stock Book helps you capture product photos, add prices, and keep
            every item organized in one calm, modern workspace.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="group relative overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper transition-all duration-300 hover:bg-moss hover:shadow-lg hover:shadow-moss/20 dark:hover:shadow-moss/30 active:scale-[0.97]"
            >
              <span className="relative z-10">Get started →</span>
            </Link>
            <Link
              href="/add"
              className="rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition-all duration-300 hover:border-brass hover:text-brass hover:bg-paper-dim active:scale-[0.97]"
            >
              Add your first item
            </Link>
          </div>

          {/* Feature pills */}
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {highlights.map(({ icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:border-brass/60 hover:text-ink dark:bg-paper-dim/60 dark:hover:bg-paper-dim"
              >
                <span className="text-base leading-none">{icon}</span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right column — mock dashboard card ── */}
        <div className="relative">
          {/* Glow ring behind the card */}
          <div className="absolute inset-4 rounded-[1.5rem] bg-gradient-to-tr from-brass/25 via-transparent to-moss/20 blur-2xl opacity-70 dark:opacity-100" />

          <div className="relative rounded-[1.5rem] border border-line/80 bg-paper/90 p-4 shadow-2xl backdrop-blur-sm dark:bg-paper-dim/80 dark:border-line dark:shadow-[0_0_0_1px_rgba(255,255,255,0.05)_inset]">
            <div className="rounded-[1.2rem] border border-line/60 bg-gradient-to-br from-paper to-paper-dim p-5 dark:from-paper-dim dark:to-paper dark:border-line/50">
              {/* Header row */}
              <div className="mb-5 flex items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass mb-1">
                    Live snapshot
                  </p>
                  <p className="font-display text-xl font-semibold text-ink leading-tight">
                    Your stock at a glance
                  </p>
                </div>
                <div className="flex-shrink-0 rounded-full border border-moss/30 bg-moss/10 px-3 py-1.5 text-xs font-semibold text-moss dark:border-moss/40 dark:bg-moss/15">
                  +12 this week
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-line/60 bg-paper/80 p-4 transition-shadow hover:shadow-md dark:bg-paper/10 dark:border-line dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <p className="text-xs uppercase tracking-[0.25em] text-ink-soft font-mono">
                    Items
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold text-ink">
                    128
                  </p>
                </div>
                <div className="rounded-2xl border border-line/60 bg-paper/80 p-4 transition-shadow hover:shadow-md dark:bg-paper/10 dark:border-line dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
                  <p className="text-xs uppercase tracking-[0.25em] text-ink-soft font-mono">
                    Value
                  </p>
                  <p className="mt-2 font-display text-3xl font-bold text-moss">
                    £4,280
                  </p>
                </div>
              </div>

              {/* Bottom banner */}
              <div className="mt-3 rounded-2xl border border-line/30 bg-ink p-4 dark:border-white/10 dark:bg-gradient-to-r dark:from-[#1e3022] dark:to-[#162019]">
                <p className="text-sm font-medium text-paper dark:text-ink">
                  "Every entry is stamped in London time."
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-paper/60 dark:text-ink-soft">
                  Trusted workflow
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
