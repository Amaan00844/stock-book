"use client";

import { useMemo } from "react";
import Link from "next/link";

export default function AnalyticsDashboard({ products = [] }) {
  const stats = useMemo(() => {
    if (!products.length) {
      return {
        totalValue: 0,
        avgPrice: 0,
        maxPrice: 0,
        maxPriceItem: null,
        tierLow: 0,
        tierMid: 0,
        tierHigh: 0,
        categories: {},
      };
    }

    let total = 0;
    let max = 0;
    let maxItem = null;
    let low = 0; // < 50
    let mid = 0; // 50 - 200
    let high = 0; // > 200
    const cats = {};

    products.forEach((p) => {
      const price = Number(p.price || 0);
      total += price;

      if (price > max) {
        max = price;
        maxItem = p;
      }

      if (price < 50) low++;
      else if (price <= 200) mid++;
      else high++;

      const catName = p.category || "General";
      cats[catName] = (cats[catName] || 0) + 1;
    });

    return {
      totalValue: total,
      avgPrice: total / products.length,
      maxPrice: max,
      maxPriceItem: maxItem,
      tierLow: low,
      tierMid: mid,
      tierHigh: high,
      categories: cats,
    };
  }, [products]);

  const handleExportCSV = () => {
    if (!products.length) return;
    const headers = ["ID", "Name", "Price", "Currency", "CapturedAtLondon"];
    const rows = products.map((p) => [
      p._id || "",
      `"${(p.name || "").replace(/"/g, '""')}"`,
      p.price || 0,
      p.currency || "GBP",
      `"${p.capturedAtLondon || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `stock_book_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Top Banner & Export CSV */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass mb-1">
            Financial & Volume Analytics
          </p>
          <h1 className="font-display text-3xl font-bold text-ink">Stock Insights</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Real-time breakdown of valuation, price distribution, and inventory metrics.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          disabled={!products.length}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition-all hover:bg-moss disabled:opacity-50 flex items-center gap-2 shadow-md dark:shadow-[0_0_20px_rgba(126,203,138,0.15)]"
        >
          📥 Export Ledger CSV
        </button>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Stock Value */}
        <div className="rounded-2xl border border-line bg-paper-dim/60 p-5 dark:bg-paper-dim/40 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-moss/10 rounded-full blur-2xl group-hover:bg-moss/20 transition-colors" />
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Total Inventory Value</p>
          <p className="font-mono text-3xl font-bold text-moss mt-2 tabular">
            £{stats.totalValue.toFixed(2)}
          </p>
          <p className="text-xs text-ink-soft/80 mt-2 font-mono">Across {products.length} items</p>
        </div>

        {/* Average Item Price */}
        <div className="rounded-2xl border border-line bg-paper-dim/60 p-5 dark:bg-paper-dim/40 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-brass/10 rounded-full blur-2xl group-hover:bg-brass/20 transition-colors" />
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Average Item Price</p>
          <p className="font-mono text-3xl font-bold text-brass mt-2 tabular">
            £{stats.avgPrice.toFixed(2)}
          </p>
          <p className="text-xs text-ink-soft/80 mt-2 font-mono">Mean unit valuation</p>
        </div>

        {/* Highest Valued Item */}
        <div className="rounded-2xl border border-line bg-paper-dim/60 p-5 dark:bg-paper-dim/40 shadow-sm relative overflow-hidden group">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Top Single Item</p>
          <p className="font-mono text-3xl font-bold text-ink mt-2 tabular">
            £{stats.maxPrice.toFixed(2)}
          </p>
          <p className="text-xs text-brass font-medium truncate mt-2">
            {stats.maxPriceItem ? stats.maxPriceItem.name : "None"}
          </p>
        </div>

        {/* Total Stock Volume */}
        <div className="rounded-2xl border border-line bg-paper-dim/60 p-5 dark:bg-paper-dim/40 shadow-sm relative overflow-hidden group">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">Total Units Recorded</p>
          <p className="font-mono text-3xl font-bold text-ink mt-2 tabular">
            {products.length}
          </p>
          <p className="text-xs text-moss font-medium mt-2">100% Stamped in London Time</p>
        </div>
      </div>

      {/* Visual Charts & Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        {/* Price Tier Distribution Bar Chart */}
        <div className="rounded-2xl border border-line bg-paper/80 p-6 dark:bg-paper-dim/60 shadow-sm space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">Price Tier Distribution</h3>
          <p className="text-xs text-ink-soft">Breakdown of products by price ranges.</p>

          <div className="space-y-4 pt-2">
            {/* Low tier */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                <span>Budget Tier (&lt; £50)</span>
                <span className="font-mono">{stats.tierLow} items ({products.length ? Math.round((stats.tierLow / products.length) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-paper-dim overflow-hidden dark:bg-paper">
                <div
                  className="h-full bg-moss transition-all duration-500 rounded-full"
                  style={{ width: `${products.length ? (stats.tierLow / products.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Mid tier */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                <span>Mid Tier (£50 - £200)</span>
                <span className="font-mono">{stats.tierMid} items ({products.length ? Math.round((stats.tierMid / products.length) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-paper-dim overflow-hidden dark:bg-paper">
                <div
                  className="h-full bg-brass transition-all duration-500 rounded-full"
                  style={{ width: `${products.length ? (stats.tierMid / products.length) * 100 : 0}%` }}
                />
              </div>
            </div>

            {/* Premium tier */}
            <div>
              <div className="flex justify-between text-xs font-semibold text-ink mb-1">
                <span>Premium Tier (&gt; £200)</span>
                <span className="font-mono">{stats.tierHigh} items ({products.length ? Math.round((stats.tierHigh / products.length) * 100) : 0}%)</span>
              </div>
              <div className="w-full h-3 rounded-full bg-paper-dim overflow-hidden dark:bg-paper">
                <div
                  className="h-full bg-brick transition-all duration-500 rounded-full"
                  style={{ width: `${products.length ? (stats.tierHigh / products.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Category Volume Breakdown */}
        <div className="rounded-2xl border border-line bg-paper/80 p-6 dark:bg-paper-dim/60 shadow-sm space-y-4">
          <h3 className="font-display text-lg font-bold text-ink">Category Tally</h3>
          <p className="text-xs text-ink-soft">Distribution of products across registered categories.</p>

          <div className="space-y-3 pt-2">
            {Object.keys(stats.categories).length > 0 ? (
              Object.entries(stats.categories).map(([cat, count]) => (
                <div key={cat} className="flex items-center justify-between p-3 rounded-xl border border-line/60 bg-paper-dim/30">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brass" />
                    <span className="text-sm font-semibold text-ink">{cat}</span>
                  </div>
                  <span className="font-mono text-xs font-bold text-moss bg-moss/10 px-2.5 py-1 rounded-full border border-moss/20">
                    {count} unit{count === 1 ? "" : "s"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-ink-soft italic">No categories tagged yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
