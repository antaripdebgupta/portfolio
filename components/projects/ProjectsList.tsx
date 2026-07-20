"use client";

import React, { useState, useTransition } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PullRequest } from "@/types/github";
import ContributionCard from "../shared/ContributionCard";
import { staggerContainerVariants } from "@/lib/motion-variants";

interface ProjectsListProps {
  initialPrs: PullRequest[];
}

const filterOptions = [
  { id: "all", label: "All Contributions" },
  { id: "feature", label: "Features" },
  { id: "bug fix", label: "Bug Fixes" },
  { id: "CI", label: "CI/DevOps" },
  { id: "accessibility", label: "Accessibility" },
  { id: "refactor", label: "Refactoring" },
];

export default function ProjectsList({ initialPrs }: ProjectsListProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [, startTransition] = useTransition();

  const handleFilterChange = (filterId: string) => {
    startTransition(() => {
      setActiveFilter(filterId);
    });
  };

  const filteredPrs = initialPrs.filter((pr) => {
    if (activeFilter === "all") return true;
    return pr.tag === activeFilter;
  });

  return (
    <div className="space-y-8">
      {/* Keyboard-operable Filter Bar */}
      <div
        className="flex flex-wrap gap-2 pt-2"
        role="tablist"
        aria-label="Filter contributions by type"
      >
        {filterOptions.map((option) => {
          const isActive = activeFilter === option.id;
          return (
            <button
              key={option.id}
              role="tab"
              aria-selected={isActive}
              aria-controls="contributions-panel"
              onClick={() => handleFilterChange(option.id)}
              className={`focus-visible:outline-accent cursor-pointer rounded-[4px] border px-3.5 py-1.5 font-mono text-[12.5px] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 ${
                isActive
                  ? "bg-accent-dim border-accent text-accent animate-none font-medium"
                  : "border-line text-muted hover:border-ink hover:text-ink bg-transparent"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>

      {/* Contributions Panel */}
      <div
        id="contributions-panel"
        role="tabpanel"
        aria-label="Contributions list"
        className="min-h-[200px]"
      >
        <AnimatePresence mode="popLayout">
          {filteredPrs.length > 0 ? (
            <motion.ul
              key={activeFilter}
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
              className="m-0 flex list-none flex-col gap-3 p-0"
            >
              {filteredPrs.map((pr) => (
                <ContributionCard key={pr.id} pr={pr} />
              ))}
            </motion.ul>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="border-line text-muted rounded-md border border-dashed py-16 text-center font-mono text-[13.5px]"
            >
              No contributions found for this category.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
