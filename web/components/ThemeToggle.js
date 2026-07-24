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
      className="relative w-9 h-9 rounded-full border border-line bg-paper-dim flex items-center justify-center overflow-hidden hover:border-brass hover:bg-paper transition-all duration-200 dark:bg-paper-dim dark:hover:border-brass group"
    >
      <span
        className="text-base transition-all duration-300 group-hover:scale-110"
        style={{ transform: isDark ? "rotate(180deg)" : "rotate(0deg)" }}
      >
        {isDark ? "☾" : "☼"}
      </span>
    </button>
  );
}
