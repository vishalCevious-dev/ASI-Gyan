import { createContext, useContext, useMemo } from "react";

import type { ThemePreference, ThemeMode } from "@/hooks/useThemePreference";
import { useThemePreference } from "@/hooks/useThemePreference";

type ThemeContextValue = ThemePreference;

const ThemeContext = createContext<ThemeContextValue | null>(null);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const preference = useThemePreference();
  const { theme, isDark, explicit, setTheme, toggleTheme, resetToSystem } = preference;

  const value = useMemo(
    () => ({ theme, isDark, explicit, setTheme, toggleTheme, resetToSystem }),
    [theme, isDark, explicit, setTheme, toggleTheme, resetToSystem],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export type { ThemeMode };
