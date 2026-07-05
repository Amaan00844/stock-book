"use client";

import { useState } from "react";
import Image from "next/image";
import { photoSrc, deleteProduct } from "@/lib/api";

const rotations = ["-rotate-1", "rotate-0", "rotate-1", "-rotate-2", "rotate-2"];

export default function ProductTag({ product, index = 0, onDeleted, onDeleteError }) {
  const [busy, setBusy] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const rotate = rotations[index % rotations.length];

  const handleDelete = async () => {
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
      className={`group relative ${rotate} hover:rotate-0 transition-transform duration-200 animate-fade-up`}
      style={{ animationDelay: `${Math.min(index, 10) * 40}ms` }}
    >
      {/* string + hole, the tag's hanging loop */}
      <div className="absolute -top-4 left-6 flex flex-col items-center z-10">
        <div className="tag-string" />
        <div className="tag-hole" />
      </div>

      <div className="relative bg-paper border border-line rounded-[4px] shadow-tag overflow-hidden">
        <div className="relative w-full aspect-[4/3] bg-paper-dim">
          {!imgLoaded && product.photoUrl && <div className="skeleton absolute inset-0" />}

          {product.photoUrl ? (
            <Image
              src={photoSrc(product.photoUrl)}
              alt={product.name || "Product photo"}
              fill
              className={`object-cover transition-opacity duration-300 ${
                imgLoaded ? "opacity-100" : "opacity-0"
              }`}
              unoptimized
              onLoad={() => setImgLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-ink-soft/50 text-sm">
              No photo
            </div>
          )}

          {/* Delete control: click once to arm, click again to confirm */}
          {!confirming ? (
            <button
              onClick={() => setConfirming(true)}
              aria-label="Delete item"
              className="absolute top-2 right-2 w-7 h-7 rounded-full bg-ink/80 text-paper text-xs opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity flex items-center justify-center hover:bg-brick"
            >
              ✕
            </button>
          ) : (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-ink/90 rounded-full pl-2 pr-1 py-1 animate-fade-in">
              <span className="text-paper text-[10px] font-medium">Remove?</span>
              <button
                onClick={handleDelete}
                disabled={busy}
                className="w-5 h-5 rounded-full bg-brick text-paper text-[10px] flex items-center justify-center disabled:opacity-50"
              >
                ✓
              </button>
              <button
                onClick={() => setConfirming(false)}
                disabled={busy}
                className="w-5 h-5 rounded-full bg-paper/20 text-paper text-[10px] flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-dashed border-line">
          <p className="font-display font-medium text-ink truncate">
            {product.name || "Untitled item"}
          </p>
          <div className="mt-1.5 flex items-baseline justify-between">
            <span className="font-mono text-xl font-semibold text-moss tabular">
              £{Number(product.price).toFixed(2)}
            </span>
            <span className="text-[11px] font-mono text-ink-soft/70 tabular">
              {product.capturedAtLondon}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
