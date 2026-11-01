/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Tabs } from "./Tabs";

const meta = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    tabs: [
      { id: "overview", label: "Overview", panel: <p className="text-sm">acme/api: 214 versions, 3.1 GB.</p> },
      { id: "versions", label: "Versions", panel: <p className="text-sm">The newest is 2.14.0, pushed 2 hours ago.</p> },
      { id: "security", label: "Security", panel: <p className="text-sm">2 high findings in 2.14.0.</p> },
      { id: "provenance", label: "Provenance", panel: <p className="text-sm">Built by GitHub Actions, verified.</p> },
      { id: "settings", label: "Settings", panel: <p className="text-sm">Owners only.</p>, disabled: true },
    ],
  },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Dark: Story = { globals: { theme: "dark" }, args: { defaultIndex: 2 } };

/** DSN-22: Tab reaches the selected tab, arrows change it, and the panel follows. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("tab", { name: "Overview" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Versions" })).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("2.14.0");
    await expect(args.onChange).toHaveBeenCalledWith(1);
  },
};

/** DSN-44: the list scrolls only sideways, and only when its tabs don't fit. */
export const Fits: Story = {
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("tablist");
    await expect(list.scrollWidth).toBe(list.clientWidth);
    await expect(list.scrollHeight).toBe(list.clientHeight);
  },
};

/** DSN-44: too narrow for its tabs, the list scrolls sideways but never up and down. */
export const Narrow: Story = {
  render: (args) => (
    <div className="w-60">
      <Tabs {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const list = within(canvasElement).getByRole("tablist");
    await expect(list.scrollWidth).toBeGreaterThan(list.clientWidth);
    await expect(list.scrollHeight).toBe(list.clientHeight);
  },
};
