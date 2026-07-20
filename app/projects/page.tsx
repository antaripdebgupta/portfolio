"use client";

import React, { useState } from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProjectCard from "@/components/shared/ProjectCard";
import { featuredProjects } from "@/data/projects";

const projectFilters = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Extension", value: "extension" },
  { label: "Backend", value: "backend" },
  { label: "Library", value: "library" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects =
    activeFilter === "all"
      ? featuredProjects
      : featuredProjects.filter((project) => project.type?.toLowerCase() === activeFilter);

  return (
    <>
      <Header />

      <main
        id="main"
        className="max-w-maxw mx-auto w-full flex-1 px-4 py-14 sm:px-8 md:px-14 xl:px-40 2xl:px-80"
      >
        {/* Page Title */}
        <div className="mb-10">
          <p className="text-accent mb-2 font-mono text-[0.8125rem] tracking-[0.06em] uppercase select-none">
            Portfolio
          </p>

          <h1 className="text-ink mb-4 font-mono text-3xl font-bold">Projects</h1>

          <p className="text-muted max-w-[64ch] text-base leading-relaxed">
            A selection of projects I have built across different areas of software development.
          </p>
        </div>

        {/* Project Filters */}
        <div
          className="mb-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by type"
        >
          {projectFilters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveFilter(filter.value)}
                aria-pressed={isActive}
                className={`rounded-md border px-4 py-2 font-mono text-sm transition-colors ${
                  isActive
                    ? "bg-ink border-ink text-white"
                    : "text-muted border-line hover:text-ink hover:border-ink bg-transparent"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Projects Section */}
        <section aria-labelledby="projects-heading">
          <div className="border-line mb-6 flex items-center justify-between border-b pb-2.5">
            <h2 id="projects-heading" className="text-ink font-mono text-xl font-bold">
              {activeFilter === "all"
                ? "All Projects"
                : `${
                    projectFilters.find((filter) => filter.value === activeFilter)?.label
                  } Projects`}
            </h2>

            <span className="text-muted font-mono text-sm">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
            </span>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="flex flex-col gap-4">
              {filteredProjects.map((project) => {
                const slug = project.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "");

                return <ProjectCard key={slug} {...project} />;
              })}
            </div>
          ) : (
            <div className="border-line rounded-lg border p-8 text-center">
              <p className="text-muted">No projects found in this category.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
