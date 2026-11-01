/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StatCard } from "./StatCard";

const meta = {
  title: "Data display/StatCard",
  component: StatCard,
  tags: ["autodocs"],
  args: {
    label: "Pulls today",
    value: "12,410",
    change: { value: "8%", trend: "up", sentiment: "positive", period: "vs yesterday" },
  },
  decorators: [(Story) => <div className="max-w-xs"><Story /></div>],
} satisfies Meta<typeof StatCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-37: the label is the term and the figure its value; the change's direction is read as a word. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("term")).toHaveTextContent("Pulls today");
    await expect(canvas.getByRole("definition")).toHaveTextContent("12,410Up 8%vs yesterday");
  },
};

const Grid = () => (
  <div className="grid w-[44rem] grid-cols-3 gap-3">
    <StatCard label="Pulls today" value="12,410" change={{ value: "8%", trend: "up", sentiment: "positive", period: "vs yesterday" }} />
    <StatCard label="Storage" value="42.1 GB" description="of 50 GB" change={{ value: "3.2 GB", trend: "up", sentiment: "negative", period: "this week" }} />
    <StatCard label="Critical findings" value="0" change={{ value: "0", trend: "flat" }} />
  </div>
);

export const Group: Story = { globals: { theme: "light" }, render: Grid, decorators: [] };

export const Dark: Story = { globals: { theme: "dark" }, render: Grid, decorators: [] };
