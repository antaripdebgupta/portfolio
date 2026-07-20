"use client";

import React, { useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#opensource", label: "Open Source" },
  { href: "/#recent", label: "Log" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-bg/95 supports-[backdrop-filter]:bg-bg/90 border-line sticky top-0 z-10 border-b px-4 supports-[backdrop-filter]:backdrop-blur-md sm:px-8 md:px-14 xl:px-60 2xl:px-80">
      <div className="max-w-maxw mx-auto flex items-center justify-between py-4">
        <Link href="/" className="text-ink font-mono text-[15px] font-bold tracking-wide">
          antarip<span className="text-accent">.dev</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="m-0 flex list-none gap-6 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-muted hover:text-ink font-mono text-[13px] tracking-wider transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="text-ink focus-visible:outline-accent -mr-1 rounded p-1 font-mono focus-visible:outline-2 focus-visible:outline-offset-2 sm:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile nav drawer */}
      {open && (
        <nav id="mobile-nav" aria-label="Primary mobile">
          <ul className="m-0 flex list-none flex-col gap-1 p-0 pb-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-muted hover:text-ink block py-2 font-mono text-[13px] tracking-wider transition-colors duration-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
