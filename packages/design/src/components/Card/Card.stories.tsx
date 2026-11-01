/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { EllipsisHorizontalIcon } from "../../icons/EllipsisHorizontalIcon";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { Link } from "../Link/Link";
import { Card } from "./Card";

const meta = {
  title: "Layout/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    title: "Retention",
    description: "Old versions are removed nightly.",
    children: "Keeps the newest 50 versions of each package, and every release.",
    actions: <Button size="sm" variant="secondary">Edit</Button>,
    footer: <Link href="#history" variant="standalone">View removal history</Link>,
  },
  decorators: [(Story) => <div className="max-w-md"><Story /></div>],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-31: a section card is a region named by its title, at the heading level asked for. */
export const Default: Story = {
  args: { as: "section", headingLevel: 3 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("region", { name: "Retention" })).toBeVisible();
    await expect(canvas.getByRole("heading", { level: 3, name: "Retention" })).toBeVisible();
  },
};

export const Plain: Story = {
  args: { title: undefined, description: undefined, actions: undefined, footer: undefined },
};

export const EdgeToEdge: Story = {
  args: {
    padding: "none",
    title: "Recent pushes",
    description: undefined,
    footer: undefined,
    actions: (
      <IconButton label="Recent push actions" size="sm">
        <EllipsisHorizontalIcon />
      </IconButton>
    ),
    children: (
      <ul className="divide-y divide-ash-200 dark:divide-ash-800">
        {["acme/api:2.14.0", "acme/web:9.1.3", "acme/billing:1.0.0"].map((name) => (
          <li key={name} className="px-5 py-2.5 font-mono text-xs">{name}</li>
        ))}
      </ul>
    ),
  },
};

export const Dark: Story = { globals: { theme: "dark" } };
