import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { storage } from '../api/api';
import { KEYS } from '../constants';
import { PALETTES } from '../globalStyle/tokens';

const ThemeCtx = createContext(null);

/**
 * Light/dark theming, ported from the web store's `theme` field.
 *
 * The web defaults to light and only switches when the stored preference says
 * dark. Here the stored preference still wins, but with no preference saved we
 * follow the OS instead of forcing light — the native convention, and the
 * reason `system` is a distinct stored value rather than an absent one.
 */
export function ThemeProvider({ children }) {
  const system = useColorScheme();
  const [mode, setMode] = useState(() => storage.getString(KEYS.THEME) ?? 'system');

  const theme = mode === 'system' ? (system === 'dark' ? 'dark' : 'light') : mode;
  const colors = PALETTES[theme];

  const setTheme = useCallback(next => {
    setMode(next);
    storage.set(KEYS.THEME, next);
  }, []);

  const toggleTheme = useCallback(() => {
    setMode(current => {
      const resolved = current === 'system' ? (system === 'dark' ? 'dark' : 'light') : current;
      const next = resolved === 'dark' ? 'light' : 'dark';
      storage.set(KEYS.THEME, next);
      return next;
    });
  }, [system]);

  const value = useMemo(
    () => ({ theme, mode, colors, isDark: theme === 'dark', setTheme, toggleTheme }),
    [theme, mode, colors, setTheme, toggleTheme],
  );

  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}

/** Shorthand for the common case of only needing the palette. */
export function useColors() {
  return useTheme().colors;
}

/**
 * Builds a StyleSheet from the active palette and rebuilds it only when the
 * theme flips. `StyleSheet.create` can't hold dynamic colours, so every screen
 * defines `makeStyles(colors)` and calls this instead of a module-level sheet.
 */
export function useThemedStyles(factory) {
  const colors = useColors();
  return useMemo(() => factory(colors), [factory, colors]);
}

export default useTheme;
