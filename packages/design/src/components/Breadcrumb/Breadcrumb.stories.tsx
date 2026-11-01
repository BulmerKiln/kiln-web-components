/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { StoryRouterLink } from "../../utils/StoryRouterLink";
import { Breadcrumb } from "./Breadcrumb";

const meta = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "acme", href: "#org" },
      { label: "Repositories", href: "#repos" },
      { label: "acme/api", href: "#repo" },
      { label: "2.14.0" },
    ],
  },
} satisfies Meta<typeof Breadcrumb>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-28: a navigation landmark with an ordered list; the current page is marked and isn't a link. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "Breadcrumb" });
    await expect(within(nav).getAllByRole("listitem")).toHaveLength(4);
    await expect(within(nav).getAllByRole("link")).toHaveLength(3);
    await expect(canvas.getByText("2.14.0")).toHaveAttribute("aria-current", "page");
  },
};

export const Dark: Story = { globals: { theme: "dark" } };

export const Narrow: Story = {
  render: (args) => (
    <div className="w-60">
      <Breadcrumb {...args} />
    </div>
  ),
};

/** DSN-33: `linkAs` renders every link with the app's router link. */
export const WithRouterLinks: Story = {
  args: { linkAs: StoryRouterLink },
  play: async ({ canvasElement }) => {
    const links = within(canvasElement).getAllByRole("link");
    await expect(links).toHaveLength(3);
    for (const link of links) await expect(link).toHaveAttribute("data-router-link");
  },
};
