/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ThemeProvider } from "../../context/ThemeContext";
import { ThemeToggle } from "./ThemeToggle";

/** Wrap the app in `ThemeProvider`; the toggle and `useTheme()` work anywhere inside it. */
const meta = {
  title: "Controls/ThemeToggle",
  component: ThemeToggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider storageKey="kiln-theme-story">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof ThemeToggle>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-43: a named radio group; light and dark set data-theme on <html>, system clears it. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const html = document.documentElement;
    await expect(canvas.getByRole("radiogroup", { name: "Color scheme" })).toBeVisible();
    await userEvent.click(canvas.getByRole("radio", { name: "Dark" }));
    await expect(html).toHaveAttribute("data-theme", "dark");
    await expect(window.localStorage.getItem("kiln-theme-story")).toBe("dark");
    await userEvent.click(canvas.getByRole("radio", { name: "Light" }));
    await expect(html).toHaveAttribute("data-theme", "light");
    await userEvent.click(canvas.getByRole("radio", { name: "System" }));
    await expect(html).not.toHaveAttribute("data-theme");
    await expect(window.localStorage.getItem("kiln-theme-story")).toBeNull();
  },
};

export const WithLabels: Story = { args: { showLabels: true, size: "md" } };
