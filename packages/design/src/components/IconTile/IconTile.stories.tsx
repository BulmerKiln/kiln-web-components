/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { token } from "../../utils/storyColors";
import { IconTile } from "./IconTile";

const meta = {
  title: "Brand/IconTile",
  component: IconTile,
  tags: ["autodocs"],
  args: { className: "size-56", label: "Bulmer Kiln" },
} satisfies Meta<typeof IconTile>;

export default meta;

type Story = StoryObj<typeof meta>;

const fills = (canvasElement: HTMLElement) =>
  [...canvasElement.querySelectorAll("svg > rect, svg g > g")].map(
    (element) => getComputedStyle(element).fill,
  );

/** DSN-7: a brand-700 tile with a brand-50 kiln in the light theme. */
export const Light: Story = {
  globals: { theme: "light" },
  play: async ({ canvasElement }) => {
    await expect(fills(canvasElement)).toEqual([token("brand-700"), token("brand-50")]);
  },
};

/** DSN-7: the tile stays light (brand-300) with an ash-950 kiln in the dark theme. */
export const Dark: Story = {
  globals: { theme: "dark" },
  play: async ({ canvasElement }) => {
    await expect(fills(canvasElement)).toEqual([token("brand-300"), token("ash-950")]);
  },
};

const ramp = ["size-32", "size-16", "size-12", "size-8", "size-4"];

/** The app-icon sizes: 128, 64, 48, 32 and 16 px. */
export const Sizes: Story = {
  args: { label: undefined },
  render: (args) => (
    <div className="flex items-end gap-10">
      {ramp.map((size) => (
        <IconTile key={size} {...args} className={size} />
      ))}
    </div>
  ),
};

export const SizesDark: Story = { ...Sizes, globals: { theme: "dark" } };
