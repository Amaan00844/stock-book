"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to day ledger" : "Switch to night stocktake"}
      title={isDark ? "Day ledger" : "Night stocktake"}
      className="relative w-9 h-9 rounded-full border border-line bg-paper-dim flex items-center justify-center overflow-hidden hover:border-brass transition-colors"
    >
      <span
        className="text-sm transition-transform duration-300"
        style={{ transform: isDark ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {isDark ? "☾" : "☼"}
      </span>
    </button>
  );
}
