"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type FontSize = "small" | "default" | "large" | "x-large";
export type LineSpacing = "normal" | "relaxed" | "loose";

interface A11ySettings {
  fontSize: FontSize;
  highContrast: boolean;
  reduceMotion: boolean;
  readableFont: boolean;
  underlineLinks: boolean;
  lineSpacing: LineSpacing;
  enhancedFocus: boolean;
}

const defaults: A11ySettings = {
  fontSize: "default",
  highContrast: false,
  reduceMotion: false,
  readableFont: false,
  underlineLinks: false,
  lineSpacing: "normal",
  enhancedFocus: false,
};

interface A11yContextValue extends A11ySettings {
  set: <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => void;
  reset: () => void;
}

const A11yContext = createContext<A11yContextValue | null>(null);

export function useA11y() {
  const ctx = useContext(A11yContext);
  if (!ctx) throw new Error("useA11y must be used within AccessibilityProvider");
  return ctx;
}

const fontSizeMap: Record<FontSize, string> = {
  small: "14px",
  default: "16px",
  large: "18px",
  "x-large": "20px",
};

export default function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<A11ySettings>(defaults);

  const set = useCallback(<K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }, []);

  const reset = useCallback(() => setSettings(defaults), []);

  useEffect(() => {
    const html = document.documentElement;
    const cls = html.classList;

    // Font size via CSS variable
    html.style.setProperty("--a11y-font-size", fontSizeMap[settings.fontSize]);

    // Toggle classes
    cls.toggle("a11y-high-contrast", settings.highContrast);
    cls.toggle("a11y-reduce-motion", settings.reduceMotion);
    cls.toggle("a11y-readable-font", settings.readableFont);
    cls.toggle("a11y-underline-links", settings.underlineLinks);
    cls.toggle("a11y-enhanced-focus", settings.enhancedFocus);

    // Line spacing
    cls.remove("a11y-spacing-normal", "a11y-spacing-relaxed", "a11y-spacing-loose");
    cls.add(`a11y-spacing-${settings.lineSpacing}`);
  }, [settings]);

  return (
    <A11yContext.Provider value={{ ...settings, set, reset }}>{children}</A11yContext.Provider>
  );
}
