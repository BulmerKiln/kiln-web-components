/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Controls/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Block pulls of images with critical findings", onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: "Pulls fail with a 403 until the finding is fixed or waived." },
};

const States = () => (
  <div className="flex flex-col gap-3">
    <Checkbox label="Unchecked" />
    <Checkbox label="Checked" defaultChecked />
    <Checkbox label="Some repositories" indeterminate />
    <Checkbox label="Disabled" disabled />
    <Checkbox label="Disabled and checked" disabled defaultChecked />
  </div>
);

export const Light: Story = { globals: { theme: "light" }, render: States };

export const Dark: Story = { globals: { theme: "dark" }, render: States };

/** DSN-16: Tab reaches it, Space toggles it, and its state is announced. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const box = within(canvasElement).getByRole("checkbox", { name: /Block pulls/ });
    await userEvent.tab();
    await expect(box).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(box).toHaveAttribute("aria-checked", "true");
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};

/** Clicking the label toggles it too, so the target is the whole row. */
export const LabelClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText(/Block pulls/));
    await expect(canvas.getByRole("checkbox")).toHaveAttribute("aria-checked", "true");
  },
};
