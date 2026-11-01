/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { token } from "../../utils/storyColors";
import { StoryRouterLink } from "../../utils/StoryRouterLink";
import { Link } from "./Link";

const meta = {
  title: "Navigation/Link",
  component: Link,
  tags: ["autodocs"],
  args: { href: "#tokens", children: "access tokens" },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-27: inside text a link is underlined, so it's told apart without color. */
export const Inline: Story = {
  render: (args) => (
    <p className="max-w-md text-sm">
      CI can push without stored secrets: set up trusted publishing, or create <Link {...args} /> scoped to
      one repository.
    </p>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "access tokens" });
    await expect(getComputedStyle(link).textDecorationLine).toBe("underline");
  },
};

export const Standalone: Story = { args: { variant: "standalone", children: "View all tokens" } };

/** DSN-27: an external link opens a new tab, safely, and says so to screen readers. */
export const External: Story = {
  args: { href: "https://docs.example.com/kiln", external: true, children: "Kiln documentation" },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Kiln documentation (opens in a new tab)" });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  },
};

const All = (args: Story["args"]) => (
  <div className="flex max-w-md flex-col gap-3 text-sm">
    <p>
      Create <Link href="#tokens">access tokens</Link> scoped to one repository.
    </p>
    <Link href="#all" variant="standalone">View all tokens</Link>
    <Link href="https://docs.example.com/kiln" external>Kiln documentation</Link>
    <span className="sr-only">{args?.children}</span>
  </div>
);

export const Light: Story = { globals: { theme: "light" }, render: All };

export const Dark: Story = { globals: { theme: "dark" }, render: All };

export const Keyboard: Story = {
  args: { variant: "standalone" },
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    await expect(within(canvasElement).getByRole("link")).toHaveFocus();
  },
};

/** DSN-33: `as` renders the app's router link, with the link's styles. */
export const AsRouterLink: Story = {
  globals: { theme: "light" },
  render: () => (
    <Link as={StoryRouterLink} href="/acme/tokens" variant="standalone">
      View all tokens
    </Link>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "View all tokens" });
    await expect(link).toHaveAttribute("data-router-link");
    await expect(link).toHaveAttribute("href", "/acme/tokens");
    await expect(getComputedStyle(link).color).toBe(token("brand-700"));
  },
};
