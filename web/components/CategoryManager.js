"use client";

import { useState } from "react";

const DEFAULT_CATEGORIES = [
  { name: "General Stock", color: "#9a6d24", description: "Default stock items" },
  { name: "Apparel & Accessories", color: "#2e5235", description: "Clothing, shoes, and wearables" },
  { name: "Electronics & Tech", color: "#3b82f6", description: "Gadgets, hardware, and cables" },
  { name: "Luxury & Rare", color: "#8c3f2c", description: "High-value collectibles and jewelry" },
  { name: "Grocery & Consumables", color: "#10b981", description: "Food items and perishables" },
];

export default function CategoryManager({ products = [] }) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);
  const [newCatName, setNewCatName] = useState("");
  const [newCatColor, setNewCatColor] = useState("#9a6d24");

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    setCategories([
      ...categories,
      { name: newCatName.trim(), color: newCatColor, description: "Custom category" },
    ]);
    setNewCatName("");
  };

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-line pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass mb-1">
          Taxonomy & Organization
        </p>
        <h1 className="font-display text-3xl font-bold text-ink">Category Manager</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Organize your inventory shelf with custom categories and visual color tags.
        </p>
      </div>

      {/* Add New Category Form */}
      <form
        onSubmit={handleAddCategory}
        className="rounded-2xl border border-line bg-paper/80 p-6 dark:bg-paper-dim/60 shadow-sm flex flex-wrap items-end gap-4"
      >
        <div className="flex-1 min-w-[200px]">
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
            Category Name
          </label>
          <input
            type="text"
            value={newCatName}
            onChange={(e) => setNewCatName(e.target.value)}
            placeholder="e.g. Office Supplies"
            className="w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-brass"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-ink-soft mb-2">
            Tag Badge Color
          </label>
          <input
            type="color"
            value={newCatColor}
            onChange={(e) => setNewCatColor(e.target.value)}
            className="h-10 w-16 cursor-pointer rounded-xl border border-line bg-paper p-1"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-ink px-6 py-2.5 text-sm font-semibold text-paper hover:bg-moss transition-colors shadow-md"
        >
          + Add Category
        </button>
      </form>

      {/* Category List Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const itemCount = products.filter(
            (p) => (p.category || "General Stock") === cat.name
          ).length;

          return (
            <div
              key={cat.name}
              className="rounded-2xl border border-line bg-paper-dim/60 p-5 dark:bg-paper-dim/40 shadow-sm flex flex-col justify-between space-y-4 hover:border-brass/60 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-black/20"
                    style={{ backgroundColor: cat.color }}
                  />
                  <h3 className="font-display font-bold text-ink text-base">{cat.name}</h3>
                </div>
                <span className="font-mono text-xs font-bold text-moss bg-moss/10 px-2.5 py-1 rounded-full border border-moss/20">
                  {itemCount} item{itemCount === 1 ? "" : "s"}
                </span>
              </div>

              <p className="text-xs text-ink-soft">{cat.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
