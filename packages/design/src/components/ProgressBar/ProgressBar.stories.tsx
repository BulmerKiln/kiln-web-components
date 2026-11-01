/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { token } from "../../utils/storyColors";
import { ProgressBar } from "./ProgressBar";
import type { ProgressSegment } from "./ProgressBar.types";

// Annotated, not `satisfies`: the props are a union, which `satisfies` narrows to never.
const meta: Meta<typeof ProgressBar> = {
  title: "Feedback/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
  args: { label: "Uploading acme/api:2.14.0", value: 40 },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

/** DSN-24: a progressbar named by its label, with its value and percentage. */
export const Progress: Story = {
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar", { name: "Uploading acme/api:2.14.0" });
    await expect(bar).toHaveAttribute("aria-valuenow", "40");
    await expect(within(canvasElement).getByText("40%")).toBeVisible();
  },
};

export const WithValueText: Story = {
  args: { label: "Pushing layers", value: 12, max: 40, valueText: "12 of 40 layers" },
};

/** DSN-24: unknown progress sweeps and has no value; reduced motion stops the sweep. */
export const Indeterminate: Story = {
  args: { label: "Scanning acme/api:2.14.0", value: undefined },
  play: async ({ canvasElement }) => {
    const bar = within(canvasElement).getByRole("progressbar");
    await expect(bar).not.toHaveAttribute("aria-valuenow");
    const fill = canvasElement.querySelector<HTMLElement>('[data-part="fill"]')!;
    await expect(getComputedStyle(fill).animationName).toBe("progress-sweep");
  },
};

export const IndeterminateReduced: Story = {
  ...Indeterminate,
  globals: { motion: "reduce" },
  play: async ({ canvasElement }) => {
    const fill = canvasElement.querySelector<HTMLElement>('[data-part="fill"]')!;
    await expect(getComputedStyle(fill).animationName).toBe("none");
  },
};

/** DSN-25: a meter, which turns warning and then danger at its thresholds. */
export const Meter: Story = {
  globals: { theme: "light" },
  render: () => (
    <div className="flex flex-col gap-5">
      <ProgressBar variant="meter" label="Storage" value={18} max={50} valueText="18 of 50 GB" warningAt={40} dangerAt={47.5} />
      <ProgressBar variant="meter" label="Storage" value={42} max={50} valueText="42 of 50 GB" warningAt={40} dangerAt={47.5} />
      <ProgressBar variant="meter" label="Storage" value={49} max={50} valueText="49 of 50 GB" warningAt={40} dangerAt={47.5} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const meters = within(canvasElement).getAllByRole("meter");
    await expect(meters).toHaveLength(3);
    await expect(meters[2]).toHaveAccessibleName("Storage");
    await expect(meters[2]).toHaveAttribute("aria-valuetext", "49 of 50 GB");
    const fill = (i: number) => getComputedStyle(meters[i].firstElementChild!).backgroundColor;
    await expect([fill(0), fill(1), fill(2)]).toEqual([token("brand-700"), token("accent-600"), token("brick-700")]);
  },
};

const findings: ProgressSegment[] = [
  { label: "Critical", value: 3, tone: "danger" },
  { label: "High", value: 15, tone: "danger", intensity: "medium" },
  { label: "Medium", value: 12, tone: "warning", intensity: "medium" },
  { label: "Low", value: 0, tone: "neutral", intensity: "medium" },
];

/** DSN-26: parts of a whole, with a legend that gives each part's count and share. */
export const Segmented: Story = {
  args: { variant: "segmented", label: "Findings in 2.14.0", segments: findings },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("group", { name: "Findings in 2.14.0" })).toBeVisible();
    const items = canvas.getAllByRole("listitem");
    await expect(items[0]).toHaveTextContent("Critical3 (10%)");
    await expect(items[1]).toHaveTextContent("High15 (50%)");
    await expect(canvasElement.querySelectorAll('[data-part="segment"]')).toHaveLength(3);
  },
};

/** DSN-26: without a legend the bar is one image named with every part. */
export const SegmentedCompact: Story = {
  args: { variant: "segmented", label: "Findings", segments: findings, hideLegend: true, hideLabel: true, size: "sm" },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("img")).toHaveAccessibleName(
      "Findings: Critical 3 (10%), High 15 (50%), Medium 12 (40%), Low 0 (0%)",
    );
  },
};

const All = () => (
  <div className="flex flex-col gap-6">
    <ProgressBar label="Uploading acme/api:2.14.0" value={40} />
    <ProgressBar label="Scanning" />
    <ProgressBar variant="meter" label="Storage" value={42} max={50} valueText="42 of 50 GB" warningAt={40} dangerAt={47.5} />
    <ProgressBar variant="meter" label="Seats" value={49} max={50} valueText="49 of 50" warningAt={40} dangerAt={47.5} />
    <ProgressBar
      variant="segmented"
      label="Storage by format"
      segments={[
        { label: "OCI", value: 31, tone: "brand" },
        { label: "npm", value: 9, tone: "success" },
        { label: "Maven", value: 6, tone: "warning", intensity: "medium" },
        { label: "Other", value: 2, tone: "neutral", intensity: "medium" },
      ]}
    />
    <ProgressBar variant="segmented" label="Findings in 2.14.0" segments={findings} />
  </div>
);

export const Light: Story = { globals: { theme: "light" }, render: All };

export const Dark: Story = { globals: { theme: "dark" }, render: All };
