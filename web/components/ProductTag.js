"use client";

import { useState } from "react";
import Image from "next/image";
import { photoSrc, deleteProduct } from "@/lib/api";

const rotations = ["-rotate-1", "rotate-0", "rotate-1", "-rotate-2", "rotate-2"];

export default function ProductTag({ product, index = 0, onDeleted, onDeleteError, onClick }) {
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const rotate = rotations[index % rotations.length];

  const handleDelete = async (e) => {
    e.stopPropagation();
    setBusy(true);
    setConfirming(false);
    try {
      await deleteProduct(product._id);
      onDeleted?.(product._id, product.name);
    } catch (e) {
      onDeleteError?.();
      setBusy(false);
    }
  };

  return (
    <div
      onClick={() => onClick?.(product)}
      className={`group relative ${rotate} hover:rotate-0 hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-up`}
      style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
    >
      {/* string + hole, the tag's hanging loop */}
      <div className="absolute -top-4 left-6 flex flex-col items-center z-10 pointer-events-none">
        <div className="tag-string" />
        <div className="tag-hole" />
      </div>

      <div className="relative bg-paper border border-line rounded-[8px] shadow-tag overflow-hidden transition-all duration-300 hover:shadow-[0_12px_36px_rgba(0,0,0,0.22)] dark:hover:shadow-[0_12px_36px_rgba(0,0,0,0.6)] dark:border-line/80">
        <div className="relative w-full aspect-[4/3] bg-paper-dim">
          {!imgLoaded && product.photoUrl && <div className="skeleton absolute inset-0" />}

          {product.photoUrl ? (
            <Image
              src={photoSrc(product.photoUrl)}
              alt={product.name || "Product photo"}
              fill
              className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              unoptimized
              onLoad={() => setImgLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ink-soft/50 text-sm font-medium">
              📷 No photo
            </div>
          )}

          {/* Quick view hover badge */}
          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-paper/95 text-ink text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-line">
              🔍 Inspect Item
            </span>
          </div>

          {/* Delete control */}
          {!confirming ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setConfirming(true);
              }}
              aria-label="Delete item"
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-ink/80 text-paper text-xs opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center justify-center hover:bg-brick z-20"
            >
              ✕
            </button>
          ) : (
            <div
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2 right-2 flex items-center gap-1 bg-ink/95 rounded-full pl-2 pr-1 py-1 animate-fade-in z-20 shadow-lg"
            >
              <span className="text-paper text-[10px] font-medium">Remove?</span>
              <button
                onClick={handleDelete}
                disabled={busy}
                className="w-5 h-5 rounded-full bg-brick text-paper text-[10px] flex items-center justify-center disabled:opacity-50"
              >
                ✓
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setConfirming(false);
                }}
                disabled={busy}
                className="w-5 h-5 rounded-full bg-paper/20 text-paper text-[10px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-dashed border-line">
          <div className="flex items-center justify-between gap-1 mb-1">
            <p className="font-display font-semibold text-ink truncate group-hover:text-brass transition-colors">
              {product.name || "Untitled item"}
            </p>
            {product.category && (
              <span className="text-[9px] font-mono uppercase tracking-wider text-brass bg-brass/10 px-1.5 py-0.5 rounded border border-brass/20 flex-shrink-0">
                {product.category}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-mono text-xl font-bold text-moss tabular">
              £{Number(product.price).toFixed(2)}
            </span>
            <span className="text-[10px] font-mono text-ink-soft tabular flex-shrink-0">
              {product.capturedAtLondon}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
