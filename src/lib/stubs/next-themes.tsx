"use client";

import React from "react";

type Theme = "system" | "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined" || !window.matchMedia) {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export const ThemeProvider = ({
  children,
  attribute = "class",
  defaultTheme = "system",
}: {
  children: React.ReactNode;
  attribute?: string;
  defaultTheme?: Theme;
}) => {
  const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
  const resolvedTheme = theme === "system" ? getSystemTheme() : theme;

  React.useEffect(() => {
    const root = document.documentElement;
    if (attribute === "class") {
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
    } else {
      root.setAttribute(attribute, resolvedTheme);
    }
  }, [attribute, resolvedTheme]);

  React.useEffect(() => {
    const stored = window.localStorage.getItem("ppsi-theme") as
      | Theme
      | null;
    if (stored) {
      setThemeState(stored);
    }
  }, []);

  const setTheme = React.useCallback((value: Theme) => {
    setThemeState(value);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("ppsi-theme", value);
    }
  }, []);

  const value = React.useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme,
    }),
    [theme, resolvedTheme, setTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
