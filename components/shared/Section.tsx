"use client";

import React from "react";
import { motion } from "motion/react";
import { fadeUpVariants } from "@/lib/motion-variants";

interface SectionProps {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, label, title, children, className = "" }: SectionProps) {
  return (
    <motion.section
      id={id}
      suppressHydrationWarning
      className={`border-line border-b py-14 last:border-b-0 ${className}`}
      initial={false}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUpVariants}
    >
      <p
        className="text-accent mb-2 font-mono text-[13px] tracking-[0.06em] uppercase"
        suppressHydrationWarning
      >
        {label}
      </p>

      <h2 className="text-ink mb-8 font-mono text-2xl font-bold">{title}</h2>

      {children}
    </motion.section>
  );
}
