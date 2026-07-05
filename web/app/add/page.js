"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createProduct } from "@/lib/api";
import { nowInLondon, getDeviceTimezone, LONDON_TZ } from "@/lib/londonTime";
import { useToast } from "@/components/ToastProvider";

const MAX_FILE_MB = 8;

export default function AddItemPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [clock, setClock] = useState(nowInLondon());
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setClock(nowInLondon()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!photoFile) {
      setPreviewUrl("");
      return;
    }
    const url = URL.createObjectURL(photoFile);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [photoFile]);

  const validateAndSetFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("That file isn't an image. Try a JPG or PNG.", { type: "error" });
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      showToast(`That photo is over ${MAX_FILE_MB}MB. Try a smaller one.`, { type: "error" });
      return;
    }
    setError("");
    setPhotoFile(file);
  };

  const handleFileChange = (e) => {
    validateAndSetFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!photoFile) {
      setError("Add a photo of the item first.");
      return;
    }
    const priceNumber = Number(price);
    if (!price || isNaN(priceNumber) || priceNumber < 0) {
      setError("Enter a valid price.");
      return;
    }

    setSubmitting(true);
    try {
      await createProduct({ photoFile, price: priceNumber, name, currency: "GBP" });
      router.push("/?saved=1");
    } catch (err) {
      setError(err.message || "Something went wrong saving this item.");
      showToast("Couldn't save this item.", { type: "error" });
      setSubmitting(false);
    }
  };

  const deviceTz = getDeviceTimezone();
  const tzMismatch = deviceTz !== LONDON_TZ;

  return (
    <div className="py-10 max-w-xl">
      <p className="font-mono text-xs uppercase tracking-widest text-brass mb-1">
        New entry
      </p>
      <h1 className="font-display text-3xl font-bold text-ink mb-6">Tag an item</h1>

      <div className="mb-6 border border-line rounded-md bg-paper-dim/40 px-4 py-3 flex items-center justify-between">
        <span className="text-xs font-medium text-ink-soft">Will be stamped</span>
        <span className="font-mono text-sm font-semibold text-ink tabular">{clock}</span>
      </div>
      {tzMismatch && (
        <p className="text-xs text-brass -mt-4 mb-6">
          Your browser reports the "{deviceTz}" timezone, but every entry is saved in
          Europe/London regardless of the device.
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-ink mb-2">Photo</label>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileInputRef.current?.click()}
            className={`cursor-pointer border-2 border-dashed rounded-md aspect-[4/3] flex items-center justify-center overflow-hidden bg-paper-dim/30 transition-all relative ${
              dragging
                ? "border-brass scale-[1.01] bg-brass/5"
                : "border-line hover:border-brass"
            }`}
          >
            {previewUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <div className="text-center px-6">
                <p className="font-display text-ink mb-1">
                  {dragging ? "Drop it here" : "Take or choose a photo"}
                </p>
                <p className="text-xs text-ink-soft">
                  Tap to open your camera, or drag a file in
                </p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleFileChange}
            className="hidden"
          />
          {previewUrl && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 text-xs font-medium text-brass hover:text-brass-light"
            >
              Choose a different photo
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2" htmlFor="name">
            Item name <span className="text-ink-soft/60">(optional)</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Blue cotton shirt"
            className="w-full rounded-md border border-line bg-white/40 dark:bg-black/10 px-3.5 py-2.5 text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-brass"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-2" htmlFor="price">
            Price
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-mono text-ink-soft">
              £
            </span>
            <input
              id="price"
              type="number"
              inputMode="decimal"
              step="0.01"
              min="0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-md border border-line bg-white/40 dark:bg-black/10 pl-8 pr-3.5 py-2.5 font-mono text-ink placeholder:text-ink-soft/50 focus:outline-none focus:ring-2 focus:ring-brass"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-brick border border-brick/30 bg-brick/5 rounded-md px-3.5 py-2.5 animate-fade-in">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="relative w-full overflow-hidden rounded-md bg-ink text-paper font-medium py-3 hover:bg-moss transition-colors disabled:opacity-90 disabled:cursor-wait"
        >
          <span className="relative z-10">{submitting ? "Saving…" : "Save to ledger"}</span>
          {submitting && (
            <span className="absolute inset-0 z-0">
              <span className="absolute inset-y-0 left-0 w-1/3 bg-white/10 animate-indeterminate" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
}
