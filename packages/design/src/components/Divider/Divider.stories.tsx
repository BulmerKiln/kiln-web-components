/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Divider } from "./Divider";

const meta = {
  title: "Layout/Divider",
  component: Divider,
  tags: ["autodocs"],
  render: (args) => (
    <div className="flex max-w-sm flex-col gap-3 text-sm">
      <p>Pull command and digest</p>
      <Divider {...args} />
      <p>Provenance and scan results</p>
    </div>
  ),
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-31: a horizontal divider is a separator (<hr>). */
export const Horizontal: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("separator")).toBeVisible();
  },
};

/** DSN-31: a vertical one is a separator with vertical orientation. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-6 items-center gap-3 text-sm">
      <span>214 versions</span>
      <Divider {...args} />
      <span>3.1 GB</span>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  },
};

export const Dark: Story = { globals: { theme: "dark" } };
