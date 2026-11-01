/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge } from "../Badge/Badge";
import { Link } from "../Link/Link";
import { DescriptionList } from "./DescriptionList";

const meta = {
  title: "Data display/DescriptionList",
  component: DescriptionList,
  tags: ["autodocs"],
  args: {
    items: [
      { term: "Digest", details: <span className="font-mono text-xs">sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08</span> },
      { term: "Pushed", details: "2 hours ago by ci-deploy" },
      { term: "Size", details: "182.4 MB in 9 layers" },
      { term: "Signature", details: <Badge tone="success" size="sm">Verified</Badge> },
      { term: "Source", details: <Link href="#source" external>github.com/acme/api</Link> },
    ],
  },
  decorators: [(Story) => <div className="max-w-2xl"><Story /></div>],
} satisfies Meta<typeof DescriptionList>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-36: a <dl> pairing each term with its details. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("term")).toHaveLength(5);
    await expect(canvas.getAllByRole("definition")).toHaveLength(5);
  },
};

export const Stacked: Story = { args: { layout: "stacked" } };

export const Narrow: Story = {
  decorators: [(Story) => <div className="w-72"><Story /></div>],
};

export const Dark: Story = { globals: { theme: "dark" } };
