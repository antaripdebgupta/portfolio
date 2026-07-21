import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ProjectCard from "@/components/shared/ProjectCard";

describe("ProjectCard", () => {
  it("renders project information and feature details", () => {
    render(
      <ProjectCard
        title="Launchpad"
        status="Merged"
        description="A polished product experience for launching ideas."
        tags={["Next.js", "TypeScript"]}
        features={["Ship faster", "Accessible by default"]}
      />
    );

    expect(screen.getByRole("heading", { name: /launchpad/i })).toBeInTheDocument();
    expect(screen.getByText(/a polished product experience/i)).toBeInTheDocument();
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Ship faster")).toBeInTheDocument();
    expect(screen.getByText("Accessible by default")).toBeInTheDocument();
    expect(screen.getByText("Merged")).toBeInTheDocument();
  });
});
