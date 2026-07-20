"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface CopyButtonProps {
  textToCopy: string;
  ariaLabel: string;
}

export default function CopyButton({ textToCopy, ariaLabel }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback implementation
      const ta = document.createElement("textarea");
      ta.value = textToCopy;
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      } catch {
        // ignore
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label={ariaLabel}
      className={`shrink-0 cursor-pointer rounded-[4px] border bg-transparent px-2.5 py-1.5 font-mono text-[11px] tracking-[0.02em] transition-colors duration-200 ${
        copied
          ? "bg-accent-dim border-accent text-accent"
          : "border-line text-muted hover:border-ink hover:text-ink"
      }`}
    >
      <span aria-live="polite" className="inline-block min-w-[40px]">
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.span
              key="copied"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              Copied
            </motion.span>
          ) : (
            <motion.span
              key="copy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              Copy
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </button>
  );
}
