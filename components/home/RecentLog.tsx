import React from "react";
import Section from "../shared/Section";

const logs = [
  {
    id: "01",
    text: "Contributed features, bug fixes, and CI improvements to open source projects",
  },
  {
    id: "02",
    text: "Refactored legacy code without breaking production",
  },
  {
    id: "03",
    text: "Implemented design systems with Tailwind, Shadcn, and Ant Design",
  },
  {
    id: "04",
    text: "Exploring accessibility evaluation workflows and automated audit tooling",
  },
];

export default function RecentLog() {
  return (
    <Section id="recent" label="Log" title="Recent work">
      <ul className="m-0 flex list-none flex-col p-0">
        {logs.map((log) => (
          <li
            key={log.id}
            className="border-line text-muted flex gap-3.5 border-b border-dashed py-2.5 font-mono text-[13.5px] last:border-b-0"
          >
            <span className="text-accent shrink-0 select-none">{log.id}</span>
            <span className="text-ink">{log.text}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
