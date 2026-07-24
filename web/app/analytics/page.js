"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/lib/api";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";

export default function AnalyticsPage() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-paper-dim rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <AnalyticsDashboard products={products} />
    </div>
  );
}
