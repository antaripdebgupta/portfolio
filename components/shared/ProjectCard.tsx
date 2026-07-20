"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import StatusPill from "./StatusPill";
import Tag from "./Tag";

interface ProjectCardProps {
  title: string;
  status: string;
  description: string;
  tags: string[];
  features: string[];
}

export default function ProjectCard({
  title,
  status,
  description,
  tags,
  features,
}: ProjectCardProps) {
  const [canHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches
  );

  return (
    <motion.div
      whileHover={canHover ? { scale: 1.01, y: -2 } : undefined}
      transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="bg-surface border-line mb-5 rounded-lg border p-8 transition-shadow duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
    >
      <div className="mb-3.5 flex flex-wrap items-start justify-between gap-4">
        <h3 className="text-ink m-0 font-mono text-lg font-bold">{title}</h3>
        <StatusPill status={status} />
      </div>
      <p className="text-muted m-0 mb-5 max-w-[64ch] text-[15px] leading-relaxed">{description}</p>
      <div className="mb-5 flex flex-wrap gap-2">
        {tags.map((tag, i) => (
          <Tag key={`${tag}-${i}`}>{tag}</Tag>
        ))}
      </div>
      <ul className="text-ink m-0 grid list-none grid-cols-1 gap-x-5 gap-y-2 p-0 text-[13.5px] sm:grid-cols-2">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-1">
            <span className="text-accent font-mono select-none" suppressHydrationWarning>
              ›
            </span>
            <span suppressHydrationWarning>{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
