"use client";

import React, { useState, useEffect, useRef } from "react";
import AccessibilityToolbar from "./AccessibilityToolbar";

export default function AccessibilityToolbarWrapper() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={containerRef}>
      <AccessibilityToolbar open={open} onToggle={() => setOpen((o) => !o)} />
    </div>
  );
}
