/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        "paper-dim": "var(--color-paper-dim)",
        ink: "var(--color-ink)",
        "ink-soft": "var(--color-ink-soft)",
        brass: "var(--color-brass)",
        "brass-light": "var(--color-brass-light)",
        brick: "var(--color-brick)",
        line: "var(--color-line)",
        moss: "var(--color-moss)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        mono: ["var(--font-mono)"],
        body: ["var(--font-body)"],
      },
      boxShadow: {
        tag: "0 2px 0 rgba(0,0,0,0.08), 0 12px 24px -12px rgba(0,0,0,0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-400px 0" },
          "100%": { backgroundPosition: "400px 0" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(8px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "indeterminate": {
          "0%": { transform: "translateX(-100%) scaleX(0.4)" },
          "60%": { transform: "translateX(60%) scaleX(0.6)" },
          "100%": { transform: "translateX(130%) scaleX(0.4)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.45s ease-out both",
        "fade-in": "fade-in 0.3s ease-out both",
        shimmer: "shimmer 1.6s ease-in-out infinite",
        "toast-in": "toast-in 0.25s ease-out both",
        indeterminate: "indeterminate 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

