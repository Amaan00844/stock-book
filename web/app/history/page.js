"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import ActivityLog from "@/components/ActivityLog";

export default function HistoryPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("stockbook-token") : null;
    if (!token) {
      router.replace("/login");
      return;
    }
    fetchProducts()
      .then(setProducts)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="py-12 space-y-4 animate-pulse">
        <div className="h-8 w-64 bg-paper-dim rounded-lg" />
        <div className="h-4 w-96 bg-paper-dim rounded-lg" />
      </div>
    );
  }

  return (
    <div className="py-8">
      <ActivityLog products={products} />
    </div>
  );
}
