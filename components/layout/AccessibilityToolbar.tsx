"use client";

import React, { useRef, useEffect, useCallback, useId } from "react";
import {
  MdAccessibility,
  MdClose,
  MdTextFields,
  MdContrast,
  MdMotionPhotosOff,
  MdFontDownload,
  MdLink,
  MdFormatLineSpacing,
  MdCenterFocusStrong,
  MdRestartAlt,
} from "react-icons/md";
import { useA11y, FontSize, LineSpacing } from "../providers/AccessibilityProvider";

const FONT_SIZES: FontSize[] = ["small", "default", "large", "x-large"];
const LINE_SPACINGS: LineSpacing[] = ["normal", "relaxed", "loose"];

interface Props {
  open: boolean;
  onToggle: () => void;
}

export default function AccessibilityToolbar({ open, onToggle }: Props) {
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const {
    fontSize,
    highContrast,
    reduceMotion,
    readableFont,
    underlineLinks,
    lineSpacing,
    enhancedFocus,
    set,
    reset,
  } = useA11y();

  // Return focus to trigger on close
  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
    } else {
      // Move focus into panel on open
      const firstFocusable = panelRef.current?.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusable?.focus();
    }
  }, [open]);

  // Focus trap + Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onToggle();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute("disabled"));

      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onToggle]
  );

  const fontIdx = FONT_SIZES.indexOf(fontSize);
  const spacingIdx = LINE_SPACINGS.indexOf(lineSpacing);

  return (
    <>
      {/* Floating trigger */}
      <button
        ref={triggerRef}
        aria-label="Accessibility options"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="border-line bg-surface text-ink hover:border-accent hover:text-accent focus-visible:outline-accent fixed right-5 bottom-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <MdAccessibility size={22} aria-hidden="true" />
      </button>

      {/* Panel */}
      {open && (
        <div
          id={panelId}
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility options"
          aria-modal="true"
          onKeyDown={handleKeyDown}
          className="border-line bg-surface fixed right-5 bottom-20 z-50 w-72 rounded-xl border p-4 shadow-lg"
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="text-accent font-mono text-xs font-semibold tracking-wider uppercase">
              Accessibility
            </span>
            <button
              aria-label="Close accessibility panel"
              onClick={onToggle}
              className="text-muted hover:text-ink focus-visible:outline-accent flex h-7 w-7 items-center justify-center rounded focus-visible:outline-2"
            >
              <MdClose size={16} aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col gap-3" aria-live="polite" aria-atomic="false">
            {/* 1. Font size */}
            <ControlRow icon={<MdTextFields size={16} aria-hidden="true" />} label="Font size">
              <StepControl
                value={fontIdx}
                max={FONT_SIZES.length - 1}
                label={fontSize}
                onDecrement={() => fontIdx > 0 && set("fontSize", FONT_SIZES[fontIdx - 1])}
                onIncrement={() =>
                  fontIdx < FONT_SIZES.length - 1 && set("fontSize", FONT_SIZES[fontIdx + 1])
                }
              />
            </ControlRow>

            {/* 2. High contrast */}
            <ToggleRow
              icon={<MdContrast size={16} aria-hidden="true" />}
              label="High contrast"
              checked={highContrast}
              onChange={(v) => set("highContrast", v)}
            />

            {/* 3. Reduce motion */}
            <ToggleRow
              icon={<MdMotionPhotosOff size={16} aria-hidden="true" />}
              label="Reduce motion"
              checked={reduceMotion}
              onChange={(v) => set("reduceMotion", v)}
            />

            {/* 4. Readable font */}
            <ToggleRow
              icon={<MdFontDownload size={16} aria-hidden="true" />}
              label="Readable font"
              checked={readableFont}
              onChange={(v) => set("readableFont", v)}
            />

            {/* 5. Underline links */}
            <ToggleRow
              icon={<MdLink size={16} aria-hidden="true" />}
              label="Underline links"
              checked={underlineLinks}
              onChange={(v) => set("underlineLinks", v)}
            />

            {/* 6. Line spacing */}
            <ControlRow
              icon={<MdFormatLineSpacing size={16} aria-hidden="true" />}
              label="Line spacing"
            >
              <StepControl
                value={spacingIdx}
                max={LINE_SPACINGS.length - 1}
                label={lineSpacing}
                onDecrement={() =>
                  spacingIdx > 0 && set("lineSpacing", LINE_SPACINGS[spacingIdx - 1])
                }
                onIncrement={() =>
                  spacingIdx < LINE_SPACINGS.length - 1 &&
                  set("lineSpacing", LINE_SPACINGS[spacingIdx + 1])
                }
              />
            </ControlRow>

            {/* 7. Enhanced focus */}
            <ToggleRow
              icon={<MdCenterFocusStrong size={16} aria-hidden="true" />}
              label="Enhanced focus"
              checked={enhancedFocus}
              onChange={(v) => set("enhancedFocus", v)}
            />

            {/* 8. Reset */}
            <button
              onClick={reset}
              className="border-line text-muted hover:border-accent hover:text-accent focus-visible:outline-accent mt-1 flex w-full items-center justify-center gap-2 rounded border py-1.5 font-mono text-xs transition-colors focus-visible:outline-2"
            >
              <MdRestartAlt size={15} aria-hidden="true" />
              Reset all
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function ControlRow({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted flex items-center gap-1.5 font-mono text-xs">
        {icon}
        {label}
      </span>
      {children}
    </div>
  );
}

function StepControl({
  value,
  max,
  label,
  onDecrement,
  onIncrement,
}: {
  value: number;
  max: number;
  label: string;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        aria-label={`Decrease ${label}`}
        onClick={onDecrement}
        disabled={value === 0}
        className="border-line text-muted hover:border-accent hover:text-accent focus-visible:outline-accent flex h-6 w-6 items-center justify-center rounded border font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:opacity-25"
      >
        −
      </button>
      <span className="text-ink w-14 text-center font-mono text-[11px] tabular-nums">{label}</span>
      <button
        aria-label={`Increase ${label}`}
        onClick={onIncrement}
        disabled={value === max}
        className="border-line text-muted hover:border-accent hover:text-accent focus-visible:outline-accent flex h-6 w-6 items-center justify-center rounded border font-mono text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 disabled:opacity-25"
      >
        +
      </button>
    </div>
  );
}

function ToggleRow({
  icon,
  label,
  checked,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-2">
      <label
        htmlFor={id}
        className="text-muted flex cursor-pointer items-center gap-1.5 font-mono text-xs"
      >
        {icon}
        {label}
      </label>
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className="focus-visible:outline-accent relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
        style={{
          background: checked ? "var(--accent)" : "var(--line)",
          border: "none",
        }}
      >
        <span
          aria-hidden="true"
          className="absolute top-1 h-4 w-4 rounded-full shadow-sm transition-transform duration-200"
          style={{
            left: "4px",
            background: "#fff",
            transform: checked ? "translateX(20px)" : "translateX(0)",
          }}
        />
      </button>
    </div>
  );
}
