"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext({ showToast: () => {} });

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const showToast = useCallback(
    (message, { type = "info", duration = 3200 } = {}) => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      timers.current[id] = setTimeout(() => dismiss(id), duration);
      return id;
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ showToast, dismiss }}>
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto animate-toast-in max-w-xs rounded-md border px-4 py-3 shadow-tag bg-paper text-sm font-medium flex items-start gap-2 ${
              t.type === "success"
                ? "border-moss/40 text-moss"
                : t.type === "error"
                ? "border-brick/40 text-brick"
                : "border-line text-ink"
            }`}
          >
            <span className="mt-0.5">
              {t.type === "success" ? "✓" : t.type === "error" ? "✕" : "•"}
            </span>
            <span className="text-ink">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
