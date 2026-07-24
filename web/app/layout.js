import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
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
    default: "Stock Book | Smart Inventory Ledger",
    template: "%s | Stock Book",
  },
  description:
    "Stock Book helps you photograph stock, tag prices, analyze financial metrics, and keep a searchable inventory ledger.",
  keywords: [
    "inventory tracker",
    "stock book",
    "product ledger",
    "inventory analytics",
    "stock management",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Stock Book | Smart Inventory Ledger",
    description:
      "Photograph your stock, tag the price, and keep a searchable ledger in one place.",
    url: "https://stock-book-drab.vercel.app/",
    siteName: "Stock Book",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stock Book | Smart Inventory Ledger",
    description:
      "Photograph your stock, tag the price, and keep a searchable ledger in one place.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
        className={`${display.variable} ${mono.variable} ${body.variable} font-body paper-grain min-h-screen pb-16 md:pb-0`}
      >
        <Providers>
          <Navbar />
          <main className="mx-auto max-w-5xl px-4 sm:px-8">
            <PageTransition>{children}</PageTransition>
          </main>
          <SeoJsonLd />
          <footer className="mx-auto max-w-5xl px-4 sm:px-8 py-10 border-t border-line/50 mt-10">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-ink-soft">
                Every entry is timestamped in London time the moment it's saved.
              </p>
              <p className="text-xs text-ink-soft/60 font-mono">
                © {new Date().getFullYear()} Stock Book
              </p>
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}
