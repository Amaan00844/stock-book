"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL, fetchProducts } from "@/lib/api";
import { useToast } from "@/components/ToastProvider";

export default function SettingsPage() {
  const [currency, setCurrency] = useState("GBP");
  const [user, setUser] = useState(null);
  const [apiStatus, setApiStatus] = useState("checking");
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("stockbook-token") : null;
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("stockbook-user") : null;
    const storedCurrency = typeof window !== "undefined" ? localStorage.getItem("stockbook-currency") : "GBP";

    if (!token) {
      router.replace("/login");
      return;
    }

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {}
    }
    if (storedCurrency) setCurrency(storedCurrency);

    // Ping API health
    fetch(`${API_URL}/`)
      .then((res) => {
        if (res.ok) setApiStatus("online");
        else setApiStatus("error");
      })
      .catch(() => setApiStatus("offline"));

    fetchProducts().then(setProducts).catch(() => {});
  }, [router]);

  const handleCurrencyChange = (newCurr) => {
    setCurrency(newCurr);
    localStorage.setItem("stockbook-currency", newCurr);
    showToast(`Currency updated to ${newCurr}`, { type: "success" });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `stockbook_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("Full JSON backup downloaded.", { type: "success" });
  };

  const handleLogout = () => {
    localStorage.removeItem("stockbook-token");
    localStorage.removeItem("stockbook-user");
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="py-8 space-y-8 animate-fade-up max-w-3xl">
      {/* Header */}
      <div className="border-b border-line pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass mb-1">
          Preferences & System Diagnostics
        </p>
        <h1 className="font-display text-3xl font-bold text-ink">Settings</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Manage currency standards, system health, and inventory data backups.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="rounded-2xl border border-line bg-paper/80 p-6 dark:bg-paper-dim/50 shadow-sm space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Account & Session</h2>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line/60 pt-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-soft font-mono">Logged in as</p>
            <p className="font-display text-xl font-bold text-ink mt-0.5">
              {user?.username ? `@${user.username}` : "Authenticated User"}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl border border-brick/30 bg-brick/10 px-4 py-2 text-sm font-semibold text-brick hover:bg-brick hover:text-paper transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Currency Preference */}
      <div className="rounded-2xl border border-line bg-paper/80 p-6 dark:bg-paper-dim/50 shadow-sm space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Ledger Currency Symbol</h2>
        <p className="text-xs text-ink-soft">Select your primary currency standard across the platform.</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {[
            { code: "GBP", label: "British Pound (£)", symbol: "£" },
            { code: "USD", label: "US Dollar ($)", symbol: "$" },
            { code: "EUR", label: "Euro (€)", symbol: "€" },
            { code: "INR", label: "Indian Rupee (₹)", symbol: "₹" },
          ].map((curr) => (
            <button
              key={curr.code}
              onClick={() => handleCurrencyChange(curr.code)}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                currency === curr.code
                  ? "border-brass bg-brass/10 font-bold text-brass shadow-sm scale-105"
                  : "border-line bg-paper-dim/40 text-ink-soft hover:text-ink hover:border-line/80"
              }`}
            >
              <span className="text-2xl font-mono mb-1">{curr.symbol}</span>
              <span className="text-xs font-semibold">{curr.code}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Backend & Database Health Check */}
      <div className="rounded-2xl border border-line bg-paper/80 p-6 dark:bg-paper-dim/50 shadow-sm space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Backend Service Monitor</h2>
        
        <div className="flex items-center justify-between p-4 rounded-xl border border-line/60 bg-paper-dim/30">
          <div className="flex items-center gap-3">
            <span className="text-xl">🌐</span>
            <div>
              <p className="text-sm font-semibold text-ink">Render Cloud API Endpoint</p>
              <p className="text-xs text-ink-soft font-mono truncate max-w-sm">{API_URL}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                apiStatus === "online"
                  ? "bg-moss animate-pulse"
                  : apiStatus === "checking"
                  ? "bg-brass animate-ping"
                  : "bg-brick"
              }`}
            />
            <span className="font-mono text-xs font-bold uppercase text-ink">
              {apiStatus}
            </span>
          </div>
        </div>
      </div>

      {/* Data Backup & Export Center */}
      <div className="rounded-2xl border border-line bg-paper/80 p-6 dark:bg-paper-dim/50 shadow-sm space-y-4">
        <h2 className="font-display text-lg font-bold text-ink">Data Backup Center</h2>
        <p className="text-xs text-ink-soft">Download a complete JSON database dump of all stock entries.</p>

        <button
          onClick={handleExportJSON}
          className="rounded-xl border border-line bg-ink px-5 py-3 text-sm font-semibold text-paper hover:bg-moss transition-colors shadow-md"
        >
          📦 Download Full JSON Backup
        </button>
      </div>
    </div>
  );
}
