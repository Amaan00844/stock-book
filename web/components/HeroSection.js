import Link from "next/link";

const highlights = [
  "Snap photos instantly",
  "Track prices in seconds",
  "Search your stock anytime",
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-line/70 bg-gradient-to-br from-paper via-paper-dim to-[#f2eadb] p-6 shadow-[0_20px_80px_-32px_rgba(0,0,0,0.25)] sm:p-8 lg:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.8),transparent_45%)]" />
      <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-brass">
            Smart stock ledger
          </p>
          <h1 className="max-w-2xl font-display text-4xl font-bold leading-tight text-ink sm:text-5xl">
            Turn everyday stock into a beautiful, searchable inventory book.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-ink-soft sm:text-lg">
            Stock Book helps you capture product photos, add prices, and keep every item organized in one calm, modern workspace.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/login"
              className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-moss"
            >
              Get started
            </Link>
            <Link
              href="/add"
              className="rounded-full border border-line bg-white/70 px-5 py-3 text-sm font-semibold text-ink transition hover:border-brass hover:text-brass"
            >
              Add your first item
            </Link>
          </div>

          <ul className="mt-6 flex flex-wrap gap-3">
            {highlights.map((item) => (
              <li key={item} className="rounded-full border border-line/80 bg-white/70 px-3 py-2 text-sm text-ink-soft">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-tr from-brass/20 via-transparent to-moss/20 blur-3xl" />
          <div className="relative rounded-[1.5rem] border border-line/80 bg-paper/90 p-4 shadow-xl">
            <div className="rounded-[1.2rem] border border-line/70 bg-gradient-to-br from-[#fffaf2] to-[#f4ebdc] p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-soft">Live snapshot</p>
                  <p className="font-display text-xl font-semibold text-ink">Your stock at a glance</p>
                </div>
                <div className="rounded-full bg-moss/15 px-3 py-1 text-sm font-medium text-moss">
                  +12 this week
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-line/70 bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">Items</p>
                  <p className="mt-2 font-display text-3xl font-bold text-ink">128</p>
                </div>
                <div className="rounded-2xl border border-line/70 bg-white/80 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">Value</p>
                  <p className="mt-2 font-display text-3xl font-bold text-ink">£4,280</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-line/70 bg-ink p-4 text-paper">
                <p className="text-sm font-medium">“Every entry is stamped in London time.”</p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-paper/70">Trusted workflow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
