/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

/** The person's choice: follow the operating system, or force one theme. */
export type ThemeMode = "system" | "light" | "dark";

interface ThemeApi {
  mode: ThemeMode;
  /** What's showing: `mode`, or the operating system's preference under `system`. */
  resolved: "light" | "dark";
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeApi | null>(null);

const darkQuery = "(prefers-color-scheme: dark)";

const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(darkQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const systemDark = () => window.matchMedia(darkQuery).matches;

// Storage can be missing or throw (private windows, blocked site data): the theme still works.
function readStored(key: string): ThemeMode {
  try {
    const value = window.localStorage.getItem(key);
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}

function writeStored(key: string, mode: ThemeMode) {
  try {
    if (mode === "system") window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, mode);
  } catch {
    // Not remembered; the choice still applies to this page.
  }
}

/*
 * `light` and `dark` set data-theme on <html>; `system` removes it, and
 * theme.css's dark variant follows prefers-color-scheme without any script.
 */
function apply(mode: ThemeMode) {
  const html = document.documentElement;
  if (mode === "system") html.removeAttribute("data-theme");
  else html.setAttribute("data-theme", mode);
}

export interface ThemeProviderProps {
  children: ReactNode;
  /** Where the choice is remembered in localStorage. */
  storageKey?: string;
}

/**
 * Lets people pick light, dark or the system's theme, remembers the choice,
 * and applies it to <html>. Put it once, near the root; use ThemeToggle (or
 * `useTheme()`) inside it.
 */
export function ThemeProvider({ children, storageKey = "kiln-theme" }: ThemeProviderProps) {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const dark = useSyncExternalStore(subscribe, systemDark, () => false);

  // Read the stored choice after mount: storage doesn't exist during server rendering.
  useLayoutEffect(() => {
    const html = document.documentElement;
    const before = html.getAttribute("data-theme");
    const stored = readStored(storageKey);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only, mount-only read
    setModeState(stored);
    apply(stored);
    // Put back whatever theme was set before this provider, when it goes away.
    return () => {
      if (before === null) html.removeAttribute("data-theme");
      else html.setAttribute("data-theme", before);
    };
  }, [storageKey]);

  const setMode = useCallback(
    (next: ThemeMode) => {
      apply(next);
      writeStored(storageKey, next);
      setModeState(next);
    },
    [storageKey],
  );

  const resolved = mode === "system" ? (dark ? "dark" : "light") : mode;
  const api = useMemo(() => ({ mode, resolved, setMode }), [mode, resolved, setMode]);
  return <ThemeContext value={api}>{children}</ThemeContext>;
}

export function useTheme(): ThemeApi {
  const api = useContext(ThemeContext);
  if (!api) throw new Error("useTheme needs a ThemeProvider above it.");
  return api;
}
