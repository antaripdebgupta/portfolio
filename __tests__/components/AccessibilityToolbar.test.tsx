import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import AccessibilityToolbar from "@/components/layout/AccessibilityToolbar";
import AccessibilityProvider from "@/components/providers/AccessibilityProvider";

function ToolbarHarness() {
  const [open, setOpen] = useState(false);

  return (
    <AccessibilityProvider>
      <AccessibilityToolbar open={open} onToggle={() => setOpen((value) => !value)} />
    </AccessibilityProvider>
  );
}

describe("AccessibilityToolbar", () => {
  it("renders controls and updates accessibility settings", async () => {
    const user = userEvent.setup();

    render(<ToolbarHarness />);

    const trigger = screen.getByRole("button", { name: /accessibility options/i });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: /accessibility options/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText(/font size/i)).toBeInTheDocument();
    expect(screen.getByText(/high contrast/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset all/i })).toBeInTheDocument();

    const highContrastToggle = screen.getByRole("switch", { name: /high contrast/i });
    expect(highContrastToggle).toHaveAttribute("aria-checked", "false");

    await user.click(highContrastToggle);
    expect(highContrastToggle).toHaveAttribute("aria-checked", "true");
    expect(document.documentElement.classList.contains("a11y-high-contrast")).toBe(true);

    await user.click(screen.getByRole("button", { name: /reset all/i }));
    expect(highContrastToggle).toHaveAttribute("aria-checked", "false");
    expect(document.documentElement.classList.contains("a11y-high-contrast")).toBe(false);
  });
});
