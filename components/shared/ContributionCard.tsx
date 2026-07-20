"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { PullRequest } from "@/types/github";
import StatusPill from "./StatusPill";
import Tag from "./Tag";

interface ContributionCardProps {
  pr: PullRequest;
}

export default function ContributionCard({ pr }: ContributionCardProps) {
  const [canHover] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches
  );

  return (
    <motion.li
      whileHover={canHover ? { scale: 1.005, y: -1 } : undefined}
      transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="bg-surface border-line flex flex-wrap items-start justify-between gap-4 rounded-md border p-[18px_20px]"
    >
      <div className="min-w-0 flex-1">
        <div className="mb-1">
          <a
            className="text-decoration-none text-ink hover:text-accent inline-flex items-center gap-2 font-mono text-[14.5px] font-bold transition-colors duration-200"
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {pr.repo}
            <StatusPill status={pr.state} />
          </a>
        </div>
        <p className="text-muted m-0 max-w-[58ch] text-[13.5px] leading-relaxed">{pr.title}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-2">
        <Tag>{pr.tag}</Tag>
        <span className="text-muted font-mono text-[11.5px]">
          {new Date(pr.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </motion.li>
  );
}
