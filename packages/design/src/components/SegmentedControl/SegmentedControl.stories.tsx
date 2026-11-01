/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { SegmentedControl } from "./SegmentedControl";

const ranges = [
  { value: "24h", label: "24 hours" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days", disabled: true },
];

const meta = {
  title: "Controls/SegmentedControl",
  component: SegmentedControl,
  tags: ["autodocs"],
  args: { label: "Time range", options: ranges, defaultValue: "7d", onChange: fn() },
} satisfies Meta<typeof SegmentedControl<string>>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-40: a named radio group; Tab enters on the chosen option and the arrows change it. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("radiogroup", { name: "Time range" })).toBeVisible();
    await userEvent.tab();
    await expect(canvas.getByRole("radio", { name: "7 days" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("radio", { name: "30 days" })).toHaveAttribute("aria-checked", "true");
    await expect(args.onChange).toHaveBeenCalledWith("30d");
  },
};

export const Small: Story = { args: { size: "sm" } };

const Both = () => (
  <div className="flex flex-col items-start gap-3">
    <SegmentedControl label="Time range" options={ranges} defaultValue="7d" />
    <SegmentedControl label="Format" size="sm" options={[{ value: "oci", label: "OCI" }, { value: "npm", label: "npm" }, { value: "maven", label: "Maven" }]} defaultValue="npm" />
  </div>
);

export const Light: Story = { globals: { theme: "light" }, render: Both };

export const Dark: Story = { globals: { theme: "dark" }, render: Both };
