import React from "react";

export default function ProjectsLoading() {
  return (
    <div className="bg-bg flex min-h-screen flex-col">
      {/* Header skeleton */}
      <header className="border-line bg-bg/90 border-b">
        <div className="max-w-maxw mx-auto flex items-center justify-between px-6 py-4">
          <div className="h-4 w-20 animate-pulse rounded bg-[#E5E5E2]"></div>
          <div className="flex gap-6">
            <div className="h-3 w-12 animate-pulse rounded bg-[#E5E5E2]"></div>
            <div className="h-3 w-12 animate-pulse rounded bg-[#E5E5E2]"></div>
            <div className="h-3 w-12 animate-pulse rounded bg-[#E5E5E2]"></div>
          </div>
        </div>
      </header>

      <main className="max-w-maxw mx-auto w-full flex-1 space-y-12 px-6 py-14">
        {/* Title skeleton */}
        <div className="space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-[#E5E5E2]"></div>
          <div className="h-8 w-3/4 animate-pulse rounded bg-[#E5E5E2]"></div>
          <div className="h-4 w-1/2 animate-pulse rounded bg-[#E5E5E2]"></div>
        </div>

        {/* Filter bar skeleton */}
        <div className="flex flex-wrap gap-2 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-20 animate-pulse rounded-[4px] bg-[#E5E5E2]"></div>
          ))}
        </div>

        {/* Contributions list skeleton */}
        <div className="space-y-3 pt-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="bg-surface border-line flex animate-pulse items-start justify-between gap-4 rounded-md border p-[18px_20px]"
            >
              <div className="flex-1 space-y-3">
                <div className="h-4 w-2/5 rounded bg-[#E5E5E2]"></div>
                <div className="h-3.5 w-4/5 rounded bg-[#E5E5E2]"></div>
              </div>
              <div className="h-6 w-14 shrink-0 rounded-[4px] bg-[#E5E5E2]"></div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
