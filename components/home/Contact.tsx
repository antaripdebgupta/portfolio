import React from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import Section from "../shared/Section";
import CopyButton from "../shared/CopyButton";

const contactMethods = [
  {
    id: "email",
    label: "Email",
    icon: <FiMail />,
    value: "mail7antarip@gmail.com",
    href: "mailto:mail7antarip@gmail.com",
    copyValue: "mail7antarip@gmail.com",
    ariaLabel: "Copy email address",
    external: false,
  },
  {
    id: "github",
    label: "GitHub",
    icon: <FiGithub />,
    value: "github.com/antaripdebgupta",
    href: "https://github.com/antaripdebgupta",
    copyValue: "https://github.com/antaripdebgupta",
    ariaLabel: "Copy GitHub URL",
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: <FiLinkedin />,
    value: "linkedin.com/in/antaripd",
    href: "https://www.linkedin.com/in/antaripd/",
    copyValue: "https://www.linkedin.com/in/antaripd/",
    ariaLabel: "Copy LinkedIn URL",
    external: true,
  },
];

export default function Contact() {
  return (
    <Section id="contact" label="Contact" title="Let's talk">
      <div className="flex flex-wrap gap-4">
        {contactMethods.map((method) => (
          <div
            key={method.id}
            className="border-line bg-surface min-w-[min(200px,100%)] flex-1 rounded-md border p-[18px_20px]"
          >
            <div className="mb-2 flex items-center gap-2.5">
              <span className="border-line bg-bg text-ink flex h-8 w-8 items-center justify-center rounded-full border">
                {method.icon}
              </span>
              <p className="text-muted m-0 font-mono text-[11px] tracking-[0.04em] uppercase select-none">
                {method.label}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2.5">
              <a
                href={method.href}
                target={method.external ? "_blank" : undefined}
                rel={method.external ? "noopener noreferrer" : undefined}
                className="border-line hover:border-ink text-ink border-b text-[15px] transition-colors duration-200"
              >
                {method.value}
              </a>
              <CopyButton textToCopy={method.copyValue} ariaLabel={method.ariaLabel} />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
