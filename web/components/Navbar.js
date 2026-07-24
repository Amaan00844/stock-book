"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";

export default function Navbar() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Ledger" },
    { href: "/analytics", label: "Analytics" },
    { href: "/categories", label: "Categories" },
    { href: "/history", label: "History" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <>
      <header className="border-b border-line bg-paper/95 backdrop-blur-md sticky top-0 z-30 shadow-sm">
        <div className="mx-auto max-w-5xl px-4 sm:px-8 py-3 flex items-center justify-between gap-2">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-ink text-paper flex items-center justify-center font-display font-bold text-sm rotate-[-3deg] group-hover:rotate-0 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-ink/20">
              £
            </span>
            <span className="font-display font-bold text-base sm:text-lg tracking-tight text-ink">
              Stock Book
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                    active
                      ? "bg-paper-dim text-ink font-semibold"
                      : "text-ink-soft hover:bg-paper-dim/60 hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Spotlight Trigger, + New Item, ThemeToggle */}
          <div className="flex items-center gap-2">
            {/* Ctrl + K Trigger */}
            <button
              onClick={() => setPaletteOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-line bg-paper-dim/60 text-xs font-mono text-ink-soft hover:border-brass hover:text-ink transition-all"
              title="Open Spotlight Search (Ctrl+K)"
            >
              <span>🔍</span>
              <kbd className="hidden sm:inline-block bg-paper px-1.5 py-0.5 rounded text-[10px]">
                ⌘K
              </kbd>
            </button>

            {/* + New Item button */}
            <Link
              href="/add"
              className="px-3.5 sm:px-4 py-1.5 rounded-full bg-ink text-paper text-xs sm:text-sm font-semibold hover:bg-moss transition-all duration-200 shadow-md shadow-ink/10 flex-shrink-0"
            >
              + New item
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Floating Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-40 bg-paper/90 backdrop-blur-lg border border-line rounded-full shadow-2xl p-1.5 flex items-center justify-around dark:bg-paper-dim/90">
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                active ? "bg-ink text-paper font-semibold" : "text-ink-soft"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Spotlight Dialog */}
      <CommandPalette isOpen={paletteOpen} onClose={setPaletteOpen} />
    </>
  );
}
