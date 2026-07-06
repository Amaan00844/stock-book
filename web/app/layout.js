import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Providers from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import PageTransition from "@/components/PageTransition";
import SeoJsonLd from "@/components/SeoJsonLd";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-display",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata = {
  metadataBase: new URL("https://stock-book-drab.vercel.app"),
  title: {
    default: "Stock Book | Simple Inventory Ledger",
    template: "%s | Stock Book",
  },
  description:
    "Stock Book helps you photograph stock, tag prices, and keep a searchable inventory ledger for everyday product tracking.",
  keywords: [
    "inventory tracker",
    "stock book",
    "product ledger",
    "inventory management",
    "small business inventory",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stock Book | Simple Inventory Ledger",
    description:
      "Photograph your stock, tag the price, and keep a searchable ledger in one place.",
    url: "https://stock-book-drab.vercel.app/",
    siteName: "Stock Book",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Book | Simple Inventory Ledger",
    description:
      "Photograph your stock, tag the price, and keep a searchable ledger in one place.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Runs before paint so the page never flashes the wrong theme.
const noFlashScript = `
(function () {
  try {
    var stored = localStorage.getItem("stockbook-theme");
    var theme = stored || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#f7efe4" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body
        className={`${display.variable} ${mono.variable} ${body.variable} font-body paper-grain min-h-screen`}
      >
        <Providers>
          <header className="border-b border-line/70 bg-paper/95 backdrop-blur-sm sticky top-0 z-20">
            <div className="mx-auto max-w-5xl px-5 sm:px-8 py-4 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3 group">
                <span className="w-9 h-9 rounded-sm bg-ink text-paper flex items-center justify-center font-display font-bold text-sm rotate-[-3deg] group-hover:rotate-0 transition-transform">
                  £
                </span>
                <span className="font-display font-bold text-lg tracking-tight text-ink">
                  Stock Book
                </span>
              </Link>
              <nav className="flex items-center gap-2 text-sm font-medium">
                <Link
                  href="/"
                  className="px-3 py-1.5 rounded-full text-ink-soft hover:bg-paper-dim transition-colors"
                >
                  Ledger
                </Link>
                <Link
                  href="/add"
                  className="px-3.5 py-1.5 rounded-full bg-ink text-paper hover:bg-moss transition-colors"
                >
                  + New item
                </Link>
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-full text-ink-soft hover:bg-paper-dim transition-colors"
                >
                  Login
                </Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-5 sm:px-8">
            <PageTransition>{children}</PageTransition>
          </main>
          <SeoJsonLd />
          <footer className="mx-auto max-w-5xl px-5 sm:px-8 py-10 text-xs text-ink-soft/70">
            Every entry is timestamped in London time the moment it's saved.
          </footer>
        </Providers>
      </body>
    </html>
  );
}
