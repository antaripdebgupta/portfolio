import React from "react";

interface TagProps {
  children: React.ReactNode;
}

export default function Tag({ children }: TagProps) {
  return (
    <span
      className="border-line text-muted rounded-[4px] border px-2.5 py-1 font-mono text-[11.5px]"
      suppressHydrationWarning
    >
      {children}
    </span>
  );
}
