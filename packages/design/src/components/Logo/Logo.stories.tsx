/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { token } from "../../utils/storyColors";
import { Logo } from "./Logo";

const meta = {
  title: "Brand/Logo",
  component: Logo,
  tags: ["autodocs"],
  args: { size: "lg" },
} satisfies Meta<typeof Logo>;

export default meta;

type Story = StoryObj<typeof meta>;

const pageColor = () => getComputedStyle(document.documentElement).backgroundColor;

/** DSN-8: the wordmark is the name; the mark beside it is hidden. DSN-9: the canvas is white in light. */
export const Horizontal: Story = {
  globals: { theme: "light" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText("Kiln")).toBeVisible();
    await expect(canvasElement.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    await expect(pageColor()).toBe(token("white"));
  },
};

export const Stacked: Story = { args: { layout: "stacked" } };

export const Mono: Story = { args: { variant: "mono" } };

/** DSN-9: the canvas follows the theme toolbar, ash-950 in dark. */
export const Dark: Story = {
  globals: { theme: "dark" },
  render: (args) => (
    <div className="flex flex-wrap items-end gap-12">
      <Logo {...args} />
      <Logo {...args} layout="stacked" size="md" />
      <Logo {...args} variant="mono" size="md" />
    </div>
  ),
  play: async () => {
    await expect(pageColor()).toBe(token("ash-950"));
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-6">
      <Logo {...args} size="sm" />
      <Logo {...args} size="md" />
      <Logo {...args} size="lg" />
    </div>
  ),
};
