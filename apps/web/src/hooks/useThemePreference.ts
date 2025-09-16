import { useCallback, useEffect, useState } from "react";

const THEME_STORAGE_KEY = "asi.theme";

export type ThemeMode = "light" | "dark";

const getStoredTheme = (): ThemeMode | null => {
  if (typeof window === "undefined") return null;
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
};

const getSystemTheme = (): ThemeMode => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const getInitialThemeState = () => {
  const stored = getStoredTheme();
  if (stored) {
    return { theme: stored as ThemeMode, explicit: true };
  }
  return { theme: getSystemTheme(), explicit: false };
};

export const useThemePreference = () => {
  const [state, setState] = useState(() => getInitialThemeState());

  const applyTheme = useCallback((nextTheme: ThemeMode, explicit: boolean) => {
    setState({ theme: nextTheme, explicit });
  }, []);

  const setTheme = useCallback(
    (nextTheme: ThemeMode) => {
      applyTheme(nextTheme, true);
    },
    [applyTheme],
  );

  const toggleTheme = useCallback(() => {
    applyTheme(state.theme === "dark" ? "light" : "dark", true);
  }, [applyTheme, state.theme]);

  const resetToSystem = useCallback(() => {
    applyTheme(getSystemTheme(), false);
  }, [applyTheme]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(state.theme);
  }, [state.theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (state.explicit) {
        localStorage.setItem(THEME_STORAGE_KEY, state.theme);
      } else {
        localStorage.removeItem(THEME_STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }, [state.theme, state.explicit]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (state.explicit) return;

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (event: MediaQueryListEvent) => {
      applyTheme(event.matches ? "dark" : "light", false);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handler);
    } else {
      // Safari
      mediaQuery.addListener(handler);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handler);
      } else {
        mediaQuery.removeListener(handler);
      }
    };
  }, [applyTheme, state.explicit]);

  return {
    theme: state.theme as ThemeMode,
    isDark: state.theme === "dark",
    explicit: state.explicit,
    setTheme,
    toggleTheme,
    resetToSystem,
  };
};

export type ThemePreference = ReturnType<typeof useThemePreference>;
