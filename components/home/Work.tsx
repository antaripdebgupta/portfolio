import Link from "next/link";
import Section from "../shared/Section";
import ProjectCard from "../shared/ProjectCard";
import { featuredProjects } from "@/data/projects";

export default function Work() {
  return (
    <Section
      id="work"
      label="Work"
      title="Featured project"
      className="flex min-h-[100dvh] flex-col justify-center"
    >
      <div className="flex flex-col gap-4">
        {featuredProjects.slice(0, 2).map((project) => {
          const slug = project.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

          return <ProjectCard key={slug} {...project} />;
        })}
      </div>

      <div className="mt-6 flex justify-end select-none">
        <Link
          href="/projects"
          className="text-accent hover:text-ink inline-flex items-center gap-1 font-mono text-[0.8125rem] transition-colors duration-200"
        >
          View all →
        </Link>
      </div>
    </Section>
  );
}
