import React from "react";
import Link from "next/link";
import Section from "../shared/Section";
import ContributionCard from "../shared/ContributionCard";
import { fetchGithubContributions } from "@/lib/github";

export default async function OpenSourceSection() {
  const { prs, error } = await fetchGithubContributions();

  const previewPrs = prs.slice(0, 6);

  return (
    <Section
      id="opensource"
      label="Open Source"
      title="Contributions"
      className="flex min-h-[100dvh] flex-col justify-center"
    >
      {error ? (
        <p role="alert" className="font-mono text-[0.84rem] text-red-600">
          Failed to load contributions from GitHub.
        </p>
      ) : (
        <ul className="m-0 grid list-none grid-cols-1 gap-3 p-0 sm:grid-cols-2">
          {previewPrs.map((pr) => (
            <ContributionCard key={pr.id} pr={pr} />
          ))}
        </ul>
      )}

      <div className="mt-6 flex justify-end select-none">
        <Link
          href="https://github.com/antaripdebgupta/my-oss-contributions/blob/main/README.md"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:text-ink inline-flex items-center gap-1 font-mono text-[0.8125rem] transition-colors duration-200"
        >
          View all →
        </Link>
      </div>
    </Section>
  );
}
