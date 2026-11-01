/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { token } from "../../utils/storyColors";
import { Icon } from "./Icon";

const meta = {
  title: "Brand/Icon",
  component: Icon,
  tags: ["autodocs"],
  args: { className: "size-24" },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

const fills = (canvasElement: HTMLElement) => {
  const [kiln, flame] = [
    canvasElement.querySelector("g")!,
    canvasElement.querySelector(`[data-part="flame"] > path`)!,
  ];
  return [getComputedStyle(kiln).fill, getComputedStyle(flame).fill];
};

/** DSN-7: brand-700 with a white flame in the light theme. */
export const Color: Story = {
  globals: { theme: "light" },
  play: async ({ canvasElement }) => {
    await expect(fills(canvasElement)).toEqual([token("brand-700"), token("white")]);
  },
};

/** DSN-7: brand-300 with an accent-200 flame in the dark theme. */
export const Dark: Story = {
  globals: { theme: "dark" },
  play: async ({ canvasElement }) => {
    await expect(fills(canvasElement)).toEqual([token("brand-300"), token("accent-200")]);
  },
};

/** The flame is cut out, so the surface behind shows through. */
export const Mono: Story = {
  args: { variant: "mono" },
  render: (args) => (
    <div className="flex gap-6">
      <span className="rounded-lg bg-brand-50 p-3">
        <Icon {...args} />
      </span>
      <span className="rounded-lg bg-accent-100 p-3">
        <Icon {...args} />
      </span>
    </div>
  ),
};

export const MonoDark: Story = { ...Mono, globals: { theme: "dark" } };

/** DSN-8: decorative without a label; an image named by it with one. */
export const Labelled: Story = {
  args: { label: "Bulmer Kiln" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("img", { name: "Bulmer Kiln" })).toBeVisible();
  },
};

export const Decorative: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    await expect(within(canvasElement).queryByRole("img")).toBeNull();
  },
};

/** The loading mark (SpinnerOverlay uses it): the flame sways and the ember inside it glows. */
export const Animated: Story = {
  args: { animated: true },
  render: (args) => (
    <div className="flex gap-6">
      <span data-theme="light" className="rounded-xl bg-white p-4">
        <Icon {...args} />
      </span>
      <span data-theme="dark" className="rounded-xl bg-ash-950 p-4">
        <Icon {...args} />
      </span>
    </div>
  ),
};
