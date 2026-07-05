"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // Pick up whatever the no-flash inline script (in layout.js) already
  // applied to <html data-theme="..."> before React hydrates.
  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(current);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("stockbook-theme", next);
    } catch {
      /* ignore - private browsing etc. */
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
