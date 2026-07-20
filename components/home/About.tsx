import Section from "../shared/Section";

const checklistItems = [
  "Responsive UIs with React, Next.js, and Vue",
  "Modern backend integrations",
  "Security-focused code review",
  "CI and automated quality gates",
  "Design systems and component architecture",
  "Accessibility audits and WCAG 2.2",
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Vue",
  "WCAG 2.2",
  "Section 508",
  "EN 301 549",
  "ARIA",
  "axe-core",
  "Playwright",
  "Pa11y",
  "NVDA",
  "VoiceOver",
  "Python",
  "FastAPI",
  "GitHub Actions",
];

export default function About() {
  return (
    <Section
      id="about"
      label="About"
      title="What I actually do"
      className="flex min-h-[100dvh] flex-col justify-center"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Large About Card */}
        <article className="border-line rounded-xl border p-6 sm:p-8 md:col-span-2 md:row-span-2">
          <div className="flex h-full flex-col justify-between gap-10">
            <div>
              <p className="text-muted mb-6 max-w-[62ch] text-[15.5px] leading-relaxed">
                I&apos;m a frontend developer who cares about{" "}
                <strong className="text-ink font-semibold">
                  system behavior and failure modes, not just features
                </strong>
                . Comfortable working in unfamiliar codebases and refactoring existing systems
                rather than only building from scratch.
              </p>

              <p className="text-muted max-w-[62ch] text-[15.5px] leading-relaxed">
                I&apos;ve spent the last stretch going deep on{" "}
                <strong className="text-ink font-semibold">
                  web accessibility and evaluation frameworks
                </strong>{" "}
                — building tools that help teams catch accessibility issues before they ship.
              </p>

              <p className="text-muted mt-6 max-w-[62ch] text-[15.5px] leading-relaxed">
                I&apos;m working toward an{" "}
                <strong className="text-ink font-semibold">Accessibility Engineer</strong> role,
                building expertise in WCAG, Playwright, and axe-core. My focus is making
                accessibility an integral part of modern frontend development.
              </p>
            </div>

            <span className="text-muted font-mono text-xs">
              Frontend engineering · Accessibility · Systems thinking
            </span>
          </div>
        </article>

        {/* Approach */}
        <article className="border-line rounded-xl border p-6">
          <p className="text-accent mb-4 font-mono text-xs tracking-wider uppercase">Approach</p>

          <h3 className="text-ink mb-3 font-mono text-lg font-semibold">
            Build for what happens next.
          </h3>

          <p className="text-muted text-sm leading-relaxed">
            I think about maintainability, edge cases, accessibility, and failure modes before they
            become someone else&apos;s problem.
          </p>
        </article>

        {/* Currently Building */}
        <article className="border-line rounded-xl border p-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-accent font-mono text-xs tracking-wider uppercase">In progress</p>

            <div className="flex items-center gap-2">
              <span className="sr-only">Currently active</span>
              <span className="bg-accent h-2 w-2 rounded-full" aria-hidden="true" />
            </div>
          </div>

          <h3 className="text-ink mb-3 font-mono text-lg font-semibold">
            Accessibility evaluation platform
          </h3>

          <p className="text-muted text-sm leading-relaxed">
            Combining automated testing with structured accessibility evaluation to help teams find
            and fix issues before production.
          </p>
        </article>

        {/* Core Capabilities */}
        <article className="border-line rounded-xl border p-6 md:col-span-3">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h3 className="text-ink font-mono text-lg font-semibold">Core capabilities</h3>

            <span className="text-muted font-mono text-xs">06 areas</span>
          </div>

          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
            {checklistItems.map((item) => (
              <li key={item} className="text-muted flex items-start gap-2.5 text-sm">
                <span className="text-accent mt-0.5 shrink-0 font-mono" aria-hidden="true">
                  →
                </span>

                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        {/* Tech Stack */}
        <article className="border-line rounded-xl border p-6 md:col-span-2">
          <div className="mb-6 flex items-baseline justify-between gap-4">
            <h3 className="text-ink font-mono text-lg font-semibold">Work With</h3>

            <span className="text-muted font-mono text-xs">frontend + a11y</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="border-line text-muted hover:border-accent hover:text-accent border px-3 py-1.5 font-mono text-xs transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </article>

        {/* Accessibility Focus */}
        <article className="border-line rounded-xl border p-6">
          <p className="text-accent mb-4 font-mono text-xs tracking-wider uppercase">Focus</p>

          <h3 className="text-ink mb-3 font-mono text-lg font-semibold">
            Accessibility engineering
          </h3>

          <p className="text-muted text-sm leading-relaxed">
            Manual testing, automated evaluation, WCAG-based workflows, and building tools that make
            accessibility part of the development process.
          </p>
        </article>
      </div>
    </Section>
  );
}
