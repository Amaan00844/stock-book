"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "./ThemeProvider";

export default function CommandPalette({ isOpen, onClose, products = [] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose(!isOpen);
      }
      if (e.key === "Escape" && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navigationActions = [
    { id: "nav-home", title: "Go to Ledger", subtitle: "View complete inventory", icon: "📚", href: "/", shortcut: "G L" },
    { id: "nav-add", title: "Add New Product", subtitle: "Photograph and price a new stock item", icon: "✨", href: "/add", shortcut: "N" },
    { id: "nav-analytics", title: "View Analytics & Insights", subtitle: "Financial metrics, stock value graphs", icon: "📊", href: "/analytics", shortcut: "G A" },
    { id: "nav-categories", title: "Manage Categories", subtitle: "Tag colors and stock counters", icon: "🏷️", href: "/categories", shortcut: "G C" },
    { id: "nav-history", title: "Audit Log & History", subtitle: "Timestamped transaction log", icon: "📜", href: "/history", shortcut: "G H" },
    { id: "nav-settings", title: "System Settings", subtitle: "Currency preferences & backup export", icon: "⚙️", href: "/settings", shortcut: "G S" },
  ];

  const filteredProducts = query.trim()
    ? products.filter((p) => (p.name || "").toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSelectRoute = (href) => {
    onClose(false);
    setQuery("");
    router.push(href);
  };

  const handleToggleTheme = () => {
    toggleTheme();
    onClose(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md animate-backdrop-in"
        onClick={() => onClose(false)}
      />

      {/* Spotlight Window */}
      <div className="relative w-full max-w-xl rounded-2xl border border-line bg-paper shadow-2xl overflow-hidden animate-modal-in dark:bg-paper-dim dark:border-line dark:shadow-[0_0_50px_rgba(0,0,0,0.7)] z-10">
        {/* Search input bar */}
        <div className="flex items-center border-b border-line px-4 py-3.5 bg-paper-dim/40 dark:bg-paper/40">
          <span className="text-xl text-brass mr-3 leading-none">🔍</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search inventory..."
            className="w-full bg-transparent text-ink placeholder:text-ink-soft/60 focus:outline-none text-base font-medium"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 rounded border border-line bg-paper px-2 py-0.5 text-[10px] font-mono text-ink-soft">
            ESC
          </kbd>
        </div>

        {/* Results / Navigation Commands */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-1 divide-y divide-line/30">
          {/* Matching Products */}
          {query.trim() !== "" && (
            <div className="pb-2">
              <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-brass">
                Matching Inventory Items ({filteredProducts.length})
              </p>
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 5).map((product) => (
                  <button
                    key={product._id}
                    onClick={() => handleSelectRoute(`/?item=${product._id}`)}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-paper-dim transition-colors group dark:hover:bg-paper/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-paper-dim flex items-center justify-center font-bold text-xs text-brass border border-line/60">
                        📦
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink group-hover:text-brass transition-colors">
                          {product.name || "Untitled Item"}
                        </p>
                        <p className="text-xs text-ink-soft font-mono">
                          Recorded: {product.capturedAtLondon || "London time"}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-sm font-bold text-moss">
                      £{Number(product.price || 0).toFixed(2)}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-3 text-sm text-ink-soft italic">No items found matching "{query}".</p>
              )}
            </div>
          )}

          {/* Quick Actions & Navigation */}
          <div className="pt-2">
            <p className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] text-ink-soft">
              Navigation & Actions
            </p>
            {navigationActions.map((action) => (
              <button
                key={action.id}
                onClick={() => handleSelectRoute(action.href)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-paper-dim transition-colors group dark:hover:bg-paper/20"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg leading-none">{action.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-ink group-hover:text-brass transition-colors">
                      {action.title}
                    </p>
                    <p className="text-xs text-ink-soft">{action.subtitle}</p>
                  </div>
                </div>
                {action.shortcut && (
                  <kbd className="hidden sm:inline-flex items-center rounded border border-line bg-paper px-2 py-0.5 text-[10px] font-mono text-ink-soft">
                    {action.shortcut}
                  </kbd>
                )}
              </button>
            ))}

            {/* Toggle Theme Action */}
            <button
              onClick={handleToggleTheme}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left hover:bg-paper-dim transition-colors group dark:hover:bg-paper/20"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg leading-none">{theme === "dark" ? "☀️" : "🌙"}</span>
                <div>
                  <p className="text-sm font-semibold text-ink group-hover:text-brass transition-colors">
                    Switch to {theme === "dark" ? "Day Ledger" : "Night Stocktake"}
                  </p>
                  <p className="text-xs text-ink-soft">Toggle theme mode</p>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer shortcuts helper */}
        <div className="border-t border-line px-4 py-2.5 bg-paper-dim/60 flex items-center justify-between text-xs text-ink-soft font-mono dark:bg-paper/30">
          <div className="flex items-center gap-3">
            <span><kbd className="border border-line bg-paper px-1.5 py-0.5 rounded text-[10px]">↑↓</kbd> navigate</span>
            <span><kbd className="border border-line bg-paper px-1.5 py-0.5 rounded text-[10px]">↵</kbd> select</span>
          </div>
          <span className="text-brass">Stock Book Command Bar</span>
        </div>
      </div>
    </div>
  );
}
