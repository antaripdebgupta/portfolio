import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges classes and resolves Tailwind conflicts", () => {
    const classes = cn("px-2", "px-4", "text-sm", "text-lg", "font-bold", "font-semibold");

    expect(classes).toContain("px-4");
    expect(classes).toContain("text-lg");
    expect(classes).toContain("font-semibold");
    expect(classes).not.toContain("px-2");
    expect(classes).not.toContain("text-sm");
    expect(classes).not.toContain("font-bold");
  });
});
