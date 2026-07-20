export type ProjectType = "web" | "mobile" | "extension" | "backend" | "library";

export interface FeaturedProject {
  title: string;
  type: ProjectType;
  status: string;
  description: string;
  tags: string[];
  features: string[];
}

export const featuredProjects: FeaturedProject[] = [
  {
    title: "Accessibility Audit Extension",
    type: "extension",
    status: "In progress",
    description:
      "A browser extension that runs a full WCAG 2.0 / 2.1 / 2.2 audit on any page — combining an expanded axe-core rule set with custom checks, live simulators, and a manual-testing workflow, so teams can catch issues automated scanners alone would miss.",
    tags: ["axe-core", "WCAG 2.2", "Chrome Extension", "ARIA", "Custom rule authoring"],
    features: [
      "Auto-scan + interval re-scan for SPAs",
      "Severity-filtered violation reporting",
      "By-Rule and By-Component report views",
      "Full ARIA tree with live role badges",
      "Tab order, screen reader, and contrast simulators",
      "JSON / CSV / Markdown export",
    ],
  },

  {
    title: "Sentence Builder",
    type: "web",
    status: "In progress",
    description:
      "A real-time sign language recognition application that converts detected gestures into words and uses AI-assisted correction to build natural, grammatically correct sentences.",
    tags: ["React", "FastAPI", "MediaPipe", "Bi-LSTM", "Ollama"],
    features: [
      "Real-time hand and pose landmark detection",
      "Live sign language gesture recognition",
      "AI-assisted sentence correction",
      "Automatic sentence generation",
      "Local sentence history with SQLite",
      "Accessible and responsive interface",
    ],
  },

  {
    title: "Accessibility Platform",
    type: "backend",
    status: "In progress",
    description:
      "An AI-powered accessibility evaluation platform designed to support structured WCAG audits, automated testing, manual review workflows, and traceable accessibility reports.",
    tags: ["FastAPI", "PostgreSQL", "Redis", "Playwright", "axe-core"],
    features: [
      "WCAG-based accessibility evaluation workflow",
      "Automated browser-based testing",
      "Manual testing and review support",
      "Centralized audit logging",
      "Traceable accessibility reports",
      "Longitudinal accessibility monitoring",
    ],
  },

  {
    title: "Co-edit",
    type: "web",
    status: "Live",
    description:
      "A collaborative online workspace where multiple users can edit shared content in real time, making it easier for teams to work together without constantly sharing files or updates.",
    tags: ["Next.js", "TypeScript", "Liveblocks", "Tailwind CSS"],
    features: [
      "Real-time collaborative editing",
      "Multi-user presence indicators",
      "Shared workspace experience",
      "Responsive interface",
      "Optimistic UI updates",
      "Modern component-based architecture",
    ],
  },

  {
    title: "Web Accessibility Utilities",
    type: "library",
    status: "In progress",
    description:
      "A collection of reusable utilities and components for building more accessible web applications with practical support for keyboard navigation, ARIA patterns, and inclusive user experiences.",
    tags: ["TypeScript", "React", "ARIA", "WCAG"],
    features: [
      "Reusable accessibility utilities",
      "Keyboard navigation helpers",
      "ARIA pattern implementations",
      "Focus management utilities",
      "Accessible component primitives",
      "Developer-friendly API",
    ],
  },

  {
    title: "Mobile Sign Language Assistant",
    type: "mobile",
    status: "Planned",
    description:
      "A mobile-focused sign language assistant designed to provide real-time gesture recognition and accessible communication support directly from a smartphone.",
    tags: ["React Native", "Computer Vision", "MediaPipe", "Machine Learning"],
    features: [
      "Mobile camera-based gesture recognition",
      "Real-time prediction interface",
      "Offline-first experience",
      "Accessible interaction design",
      "Lightweight model inference",
      "Sentence construction support",
    ],
  },
];
