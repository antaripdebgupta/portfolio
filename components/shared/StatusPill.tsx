import React from "react";

interface StatusPillProps {
  status: string;
}

export default function StatusPill({ status }: StatusPillProps) {
  const normStatus = status.toLowerCase();

  let colorClasses = "";

  if (normStatus === "in progress" || normStatus === "merged" || normStatus === "live") {
    colorClasses = "bg-accent-dim text-accent";
  } else if (normStatus === "open") {
    colorClasses = "bg-[#FBF1DE] text-[#9A6B15]";
  } else if (normStatus === "issue" || normStatus === "closed") {
    colorClasses = "bg-[#F0EEF9] text-[#5B4EA6]";
  } else {
    colorClasses = "bg-accent-dim text-accent";
  }

  return (
    <span
      className={`rounded-[20px] px-2.5 py-1 font-mono text-[11px] tracking-[0.03em] whitespace-nowrap ${colorClasses}`}
      suppressHydrationWarning
    >
      {status}
    </span>
  );
}
