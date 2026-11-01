/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge } from "../Badge/Badge";
import { Breadcrumb } from "../Breadcrumb/Breadcrumb";
import { Button } from "../Button/Button";
import { PageHeader } from "./PageHeader";

const meta = {
  title: "Layout/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
  args: {
    title: "acme/api",
    description: "Images for the payments API, built by GitHub Actions and verified on push.",
    breadcrumb: (
      <Breadcrumb
        items={[
          { label: "acme", href: "#org" },
          { label: "Repositories", href: "#repos" },
          { label: "acme/api" },
        ]}
      />
    ),
    meta: (
      <>
        <Badge tone="neutral">Private</Badge>
        <Badge tone="success">Verified</Badge>
      </>
    ),
    actions: (
      <>
        <Button variant="secondary">Settings</Button>
        <Button>Copy pull command</Button>
      </>
    ),
  },
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-31: the title is the page's only <h1>. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const headings = within(canvasElement).getAllByRole("heading", { level: 1 });
    await expect(headings).toHaveLength(1);
    await expect(headings[0]).toHaveTextContent("acme/api");
  },
};

/** In a narrow column the actions move under the title (a container query, not the viewport). */
export const Narrow: Story = {
  render: (args) => (
    <div className="max-w-sm">
      <PageHeader {...args} />
    </div>
  ),
};

export const Dark: Story = { globals: { theme: "dark" } };
