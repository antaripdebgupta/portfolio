import React from "react";
import Link from "next/link";
import ScanLog from "./ScanLog";
import { FloatingDock } from "../ui/floating-dock";
import { FiLinkedin, FiGithub, FiMail } from "react-icons/fi";
import { RiMediumLine } from "react-icons/ri";
import { floatingDockItems, SocialIcon } from "@/data/content";

const iconMap: Record<SocialIcon, React.ReactNode> = {
  linkedin: <FiLinkedin />,
  medium: <RiMediumLine />,
  github: <FiGithub />,
  email: <FiMail />,
};

export default function Hero() {
  return (
    // Added 'flex flex-col justify-center' to vertically center the inner grid
    <section
      className="border-line flex min-h-[100dvh] flex-col justify-center border-b py-18"
      id="top"
    >
      <div className="grid w-full grid-cols-1 items-start gap-10 min-[760px]:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-accent mb-4 font-mono text-[13px] tracking-[0.06em] uppercase select-none">
            Frontend Developer — Accessibility Focus
          </p>
          <h1 className="text-ink mb-5 font-mono text-[clamp(28px,5vw,42px)] leading-[1.25] font-bold tracking-tight">
            I build web apps that scale, perform, and work for everyone using them.
          </h1>
          <p className="text-muted mb-8 max-w-[56ch] text-[17px] leading-relaxed">
            Writing production-ready code — not just code that works, but code that scales,
            performs, and can be maintained by teams. Increasingly focused on accessibility
            evaluation and WCAG-driven tooling.
          </p>
          <div className="mb-10 flex flex-wrap gap-3.5 select-none">
            <Link
              href="/#work"
              className="bg-ink text-bg hover:bg-accent inline-block rounded-[3px] px-4.5 py-2.5 font-mono text-[13px] tracking-wide transition-colors duration-200"
            >
              See the work
            </Link>
            <a
              href="/antarip-resume.pdf"
              download="antarip-resume.pdf"
              className="border-line text-ink hover:border-ink inline-block rounded-[3px] border px-4.5 py-2.5 font-mono text-[13px] tracking-wide transition-colors duration-200"
            >
              Download resume
            </a>
          </div>
        </div>

        <div className="flex w-full justify-start min-[760px]:justify-end">
          <ScanLog />
        </div>
      </div>
      <div className="mt-2 mb-10 flex h-12 justify-center align-middle sm:mt-20">
        <FloatingDock
          items={floatingDockItems.map((item) => ({
            ...item,
            icon: iconMap[item.icon],
          }))}
        />
      </div>
    </section>
  );
}
