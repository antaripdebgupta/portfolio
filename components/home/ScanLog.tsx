"use client";

import React, { useEffect, useState, useRef } from "react";
import { useA11y } from "../providers/AccessibilityProvider";

interface LogLine {
  text: string;
  cls: string;
}

const lines: LogLine[] = [
  { text: "> scanning page…", cls: "text-muted" },
  { text: "role: frontend developer — found", cls: "" },
  { text: "stack: react, next.js, vue — verified", cls: "" },
  { text: "focus order: intentional", cls: "text-accent" },
  { text: "contrast: AA+ across all text", cls: "text-accent" },
  { text: "reduced-motion: respected", cls: "text-accent" },
  { text: "status: open to remote roles", cls: "text-accent" },
];

export default function ScanLog() {
  const [displayedLines, setDisplayedLines] = useState<
    { text: string; cls: string; isComplete: boolean }[]
  >([]);
  const [caretVisible, setCaretVisible] = useState(true);
  const typingTimerRef = useRef<number | null>(null);
  const { reduceMotion } = useA11y();

  useEffect(() => {
    const clearTimer = () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };

    clearTimer();

    if (reduceMotion) {
      const reducedLines = lines.map((line) => ({
        text: line.text,
        cls: line.cls,
        isComplete: true,
      }));

      const applyReducedMotion = () => {
        setDisplayedLines(reducedLines);
        setCaretVisible(false);
      };

      applyReducedMotion();
      return clearTimer;
    }

    const startTyping = () => {
      setDisplayedLines([]);
      setCaretVisible(true);

      let lineIdx = 0;
      let charIdx = 0;
      let currentLinesState: { text: string; cls: string; isComplete: boolean }[] = [];

      const typeNextChar = () => {
        if (lineIdx >= lines.length) {
          setCaretVisible(false);
          return;
        }

        const currentLine = lines[lineIdx];

        if (charIdx === 0) {
          currentLinesState = [
            ...currentLinesState,
            { text: "", cls: currentLine.cls, isComplete: false },
          ];
        }

        if (charIdx < currentLine.text.length) {
          currentLinesState = currentLinesState.map((line, index) =>
            index === lineIdx ? { ...line, text: currentLine.text.slice(0, charIdx + 1) } : line
          );
          setDisplayedLines(currentLinesState);
          charIdx += 1;
          typingTimerRef.current = window.setTimeout(typeNextChar, 14);
          return;
        }

        currentLinesState = currentLinesState.map((line, index) =>
          index === lineIdx ? { ...line, isComplete: true } : line
        );
        setDisplayedLines(currentLinesState);
        lineIdx += 1;
        charIdx = 0;
        typingTimerRef.current = window.setTimeout(typeNextChar, 180);
      };

      typingTimerRef.current = window.setTimeout(typeNextChar, 250);
    };

    startTyping();
    return clearTimer;
  }, [reduceMotion]);

  return (
    <div
      className="bg-surface border-line w-full max-w-[520px] overflow-hidden rounded-md border"
      role="group"
      aria-label="Live page scan readout"
    >
      <div className="border-line flex items-center gap-1.5 border-b bg-[#FAFAF8] p-2.5 px-3.5">
        <span className="h-[9px] w-[9px] rounded-full bg-[#E5605A]"></span>
        <span className="h-[9px] w-[9px] rounded-full bg-[#E8B84B]"></span>
        <span className="h-[9px] w-[9px] rounded-full bg-[#1F7A5C]"></span>
        <span className="text-muted ml-1.5 font-mono text-xs select-none">scan.log</span>
      </div>
      <div
        className="text-ink flex min-h-[150px] flex-col gap-1.5 p-4 font-mono text-[12.5px]"
        aria-live="polite"
      >
        {displayedLines.map((line, i) => (
          <span key={i} className={`block whitespace-pre-wrap ${line.cls}`}>
            {line.text}
            {!line.isComplete && i === displayedLines.length - 1 && caretVisible && (
              <span className="caret ml-0.5" aria-hidden="true" />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
