"use client";

import { useState } from "react";
import Image from "next/image";
import { photoSrc, deleteProduct } from "@/lib/api";

export default function ItemDrawer({ product, isOpen, onClose, onDeleted }) {
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!isOpen || !product) return null;

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteProduct(product._id);
      onDeleted?.(product._id, product.name);
      onClose();
    } catch (e) {
      alert("Failed to delete product.");
    } finally {
      setDeleting(false);
    }
  };

  const formattedPrice = Number(product.price || 0).toFixed(2);
  const currencySymbol = product.currency === "USD" ? "$" : product.currency === "EUR" ? "€" : "£";

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm animate-backdrop-in"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-paper border-l border-line shadow-2xl flex flex-col justify-between animate-drawer-in dark:bg-paper-dim dark:border-line">
          {/* Header */}
          <div className="p-6 border-b border-line flex items-center justify-between bg-paper-dim/40 dark:bg-paper/40">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brass">
                Stock Item Details
              </p>
              <h2 className="font-display text-xl font-bold text-ink truncate max-w-[280px]">
                {product.name || "Untitled Item"}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full border border-line flex items-center justify-center text-ink hover:bg-paper-dim transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {/* Photo preview */}
            <div className="relative w-full aspect-square rounded-2xl border border-line bg-paper-dim overflow-hidden shadow-inner">
              {product.photoUrl ? (
                <Image
                  src={photoSrc(product.photoUrl)}
                  alt={product.name || "Product photo"}
                  fill
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-ink-soft">
                  <span className="text-4xl mb-2">📷</span>
                  <span className="text-sm">No photo available</span>
                </div>
              )}
            </div>

            {/* Price Tag Highlight */}
            <div className="rounded-2xl border border-line p-5 bg-gradient-to-br from-paper to-paper-dim dark:from-paper-dim dark:to-paper flex items-center justify-between">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-ink-soft">
                  Ledger Price
                </p>
                <p className="font-mono text-3xl font-bold text-moss mt-1">
                  {currencySymbol}{formattedPrice}
                </p>
              </div>
              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full border border-brass/40 bg-brass/10 text-xs font-semibold text-brass">
                  In Stock
                </span>
              </div>
            </div>

            {/* Simulated Shelf Barcode Tag */}
            <div className="rounded-xl border border-dashed border-line p-4 bg-white/70 dark:bg-black/20 text-center space-y-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
                Printable Shelf Tag
              </p>
              {/* Simulated barcode lines */}
              <div className="flex justify-center items-center gap-1 h-10 py-1">
                {[3, 1, 4, 2, 5, 2, 1, 4, 3, 1, 2, 5, 2, 4, 1, 3, 2, 4].map((w, i) => (
                  <div key={i} className="bg-ink h-full" style={{ width: `${w * 2}px` }} />
                ))}
              </div>
              <p className="font-mono text-[11px] text-ink-soft">
                ID: {product._id ? product._id.slice(-8).toUpperCase() : "STOCK-TAG"}
              </p>
            </div>

            {/* Metadata breakdown */}
            <div className="space-y-3 pt-2 border-t border-line/60">
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-soft">Category</span>
                <span className="font-semibold text-ink px-2.5 py-0.5 rounded-full border border-line bg-paper-dim text-xs">
                  {product.category || "General Stock"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-soft">Captured Time</span>
                <span className="font-mono text-xs text-ink font-medium">
                  {product.capturedAtLondon || "Timestamp pending"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-ink-soft">Timezone Standard</span>
                <span className="font-mono text-xs text-brass">GMT / BST (London Time)</span>
              </div>
            </div>
          </div>

          {/* Drawer Actions */}
          <div className="p-6 border-t border-line bg-paper-dim/40 dark:bg-paper/40 space-y-3">
            <button
              onClick={() => window.print()}
              className="w-full rounded-xl border border-line bg-paper px-4 py-3 font-semibold text-ink hover:border-brass hover:text-brass transition-all duration-200 text-sm flex items-center justify-center gap-2 dark:bg-paper-dim"
            >
              🖨️ Print Shelf Label
            </button>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="w-full rounded-xl border border-brick/30 bg-brick/10 px-4 py-3 font-semibold text-brick hover:bg-brick hover:text-paper transition-all duration-200 text-sm"
              >
                Delete Stock Item
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex-1 rounded-xl bg-brick px-4 py-3 font-semibold text-paper hover:opacity-90 transition-opacity text-sm disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Confirm Delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="rounded-xl border border-line px-4 py-3 font-semibold text-ink hover:bg-paper-dim text-sm"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
