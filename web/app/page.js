"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import ProductTag from "@/components/ProductTag";
import TagSkeleton from "@/components/TagSkeleton";
import HeroSection from "@/components/HeroSection";
import ItemDrawer from "@/components/ItemDrawer";
import { useToast } from "@/components/ToastProvider";

const SORTS = {
  newest: { label: "Newest first", fn: (a, b) => new Date(b.capturedAtUTC) - new Date(a.capturedAtUTC) },
  oldest: { label: "Oldest first", fn: (a, b) => new Date(a.capturedAtUTC) - new Date(b.capturedAtUTC) },
  "price-desc": { label: "Price: high to low", fn: (a, b) => b.price - a.price },
  "price-asc": { label: "Price: low to high", fn: (a, b) => a.price - b.price },
};

export default function LedgerPage() {
  return (
    <Suspense fallback={null}>
      <LedgerContent />
    </Suspense>
  );
}

function LedgerContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("newest");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("stockbook-token") : null;
    if (!token) {
      router.replace("/login");
      return;
    }
    load();
  }, [router]);

  // Open item drawer if URL parameter `item` is set
  useEffect(() => {
    const itemId = searchParams.get("item");
    if (itemId && products.length > 0) {
      const match = products.find((p) => p._id === itemId);
      if (match) {
        setSelectedProduct(match);
        setDrawerOpen(true);
      }
    }
  }, [searchParams, products]);

  useEffect(() => {
    if (searchParams.get("saved") === "1") {
      showToast("Saved to the ledger.", { type: "success" });
      router.replace("/");
    }
  }, [searchParams, router, showToast]);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      setError(
        "Couldn't reach the stockroom server. Check NEXT_PUBLIC_API_URL and that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleted = (id, name) => {
    setProducts((prev) => prev.filter((p) => p._id !== id));
    showToast(`Removed "${name || "item"}" from the ledger.`, { type: "success" });
  };

  const handleDeleteError = () => {
    showToast("Could not delete this item. Try again.", { type: "error" });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const categories = useMemo(() => {
    const set = new Set();
    products.forEach((p) => {
      if (p.category) set.add(p.category);
    });
    return ["ALL", ...Array.from(set)];
  }, [products]);

  const visibleProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "ALL") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (query) {
      filtered = filtered.filter((p) =>
        (p.name || "Untitled item").toLowerCase().includes(query.toLowerCase())
      );
    }

    return [...filtered].sort(SORTS[sort].fn);
  }, [products, query, sort, selectedCategory]);

  const total = products.reduce((sum, p) => sum + Number(p.price || 0), 0);

  return (
    <div className="py-10 space-y-8">
      <HeroSection />

      <div className="flex flex-wrap items-end justify-between gap-4 mb-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-brass mb-1">
            {products.length} item{products.length === 1 ? "" : "s"} on the shelf
          </p>
          <h1 className="font-display text-3xl font-bold text-ink">The Ledger</h1>
          <p className="mt-2 max-w-2xl text-sm text-ink-soft">
            Keep a clear inventory record of every item, from product photos and prices to searchable notes in one streamlined stock book.
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs uppercase tracking-widest text-ink-soft/70">
            Stock value
          </p>
          <p className="font-mono text-2xl font-semibold text-moss tabular">
            £{total.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Category Pills & Search & Sort Bar */}
      {!loading && !error && products.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[180px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/60 text-sm">
                ⌕
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search items by title or category..."
                className="w-full rounded-xl border border-line bg-white/40 dark:bg-black/10 pl-8 pr-3 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-brass"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-line bg-white/40 dark:bg-black/10 px-3 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-brass"
            >
              {Object.entries(SORTS).map(([key, { label }]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Pills */}
          {categories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-mono uppercase text-ink-soft mr-1">Category:</span>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? "bg-ink text-paper shadow-sm"
                      : "bg-paper-dim/60 text-ink-soft hover:text-ink hover:bg-paper-dim"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 pt-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <TagSkeleton key={i} index={i} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="border border-brick/30 bg-brick/5 rounded-2xl p-5 text-brick text-sm">
          {error}
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="border border-dashed border-line rounded-2xl p-12 text-center animate-fade-up">
          <p className="font-display text-xl text-ink mb-2 font-bold">Nothing on the shelf yet</p>
          <p className="text-sm text-ink-soft mb-6 max-w-md mx-auto">
            Photograph your first item and tag it with a price to start the ledger.
          </p>
          <Link
            href="/add"
            className="inline-flex px-6 py-3 rounded-full bg-ink text-paper text-sm font-semibold hover:bg-moss transition-colors shadow-lg"
          >
            + New item
          </Link>
        </div>
      )}

      {!loading && !error && products.length > 0 && visibleProducts.length === 0 && (
        <p className="text-sm text-ink-soft py-10 text-center">
          No items match your criteria.
        </p>
      )}

      {!loading && !error && visibleProducts.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 pt-2">
          {visibleProducts.map((p, i) => (
            <ProductTag
              key={p._id}
              product={p}
              index={i}
              onDeleted={handleDeleted}
              onDeleteError={handleDeleteError}
              onClick={handleProductClick}
            />
          ))}
        </div>
      )}

      {/* Item Slide-over Drawer */}
      <ItemDrawer
        product={selectedProduct}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onDeleted={handleDeleted}
      />
    </div>
  );
}
