"use client";

import { ThemeProvider } from "./ThemeProvider";
import { ToastProvider } from "./ToastProvider";

export default function Providers({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
}
