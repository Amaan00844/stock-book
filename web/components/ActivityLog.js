"use client";

export default function ActivityLog({ products = [] }) {
  // Generate real audit events based on products in the database
  const historyEvents = products.map((p) => ({
    id: p._id,
    action: "ADDED_TO_SHELF",
    title: `Recorded "${p.name || "Untitled Item"}" in ledger`,
    details: `Price tagged at £${Number(p.price || 0).toFixed(2)}`,
    time: p.capturedAtLondon || "London Time",
    timestamp: p.capturedAtUTC ? new Date(p.capturedAtUTC) : new Date(),
    icon: "✨",
  }));

  // Sort newest first
  historyEvents.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="space-y-8 animate-fade-up">
      {/* Header */}
      <div className="border-b border-line pb-6">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-brass mb-1">
          Audit Trail & History
        </p>
        <h1 className="font-display text-3xl font-bold text-ink">Ledger History</h1>
        <p className="mt-1 text-sm text-ink-soft">
          Complete timestamped audit log of every stock addition and inventory update.
        </p>
      </div>

      {/* Timeline view */}
      <div className="relative pl-6 border-l-2 border-line space-y-6">
        {historyEvents.length > 0 ? (
          historyEvents.map((evt, idx) => (
            <div key={evt.id || idx} className="relative group">
              {/* Timeline marker node */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-paper border-2 border-brass flex items-center justify-center text-[8px] group-hover:scale-125 transition-transform" />

              {/* Event Card */}
              <div className="rounded-2xl border border-line bg-paper/80 p-5 dark:bg-paper-dim/50 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{evt.icon}</span>
                  <div>
                    <h3 className="font-display font-bold text-ink text-base">{evt.title}</h3>
                    <p className="text-xs text-ink-soft mt-0.5">{evt.details}</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brass/30 bg-brass/10 font-mono text-xs text-brass font-medium">
                    🕐 {evt.time}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-8 text-center border border-dashed border-line rounded-2xl text-ink-soft">
            No history events recorded yet.
          </div>
        )}
      </div>
    </div>
  );
}
