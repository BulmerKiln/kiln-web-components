/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ExclamationTriangleIcon } from "../../icons/ExclamationTriangleIcon";
import { InformationCircleIcon } from "../../icons/InformationCircleIcon";
import { MagnifyingGlassIcon } from "../../icons/MagnifyingGlassIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { StoryRouterLink } from "../../utils/StoryRouterLink";
import { Badge } from "../Badge/Badge";
import { SideNav } from "./SideNav";
import { SideNavGroup } from "./SideNavGroup/SideNavGroup";
import { SideNavItem } from "./SideNavItem/SideNavItem";

const meta = {
  title: "Navigation/SideNav",
  component: SideNav,
  tags: ["autodocs"],
  args: {
    label: "Organization",
    children: (
      <>
        <SideNavGroup>
          <SideNavItem href="#repos" icon={<MagnifyingGlassIcon />} current>Repositories</SideNavItem>
          <SideNavItem href="#security" icon={<ExclamationTriangleIcon />} badge={<Badge tone="danger" size="sm">3</Badge>}>
            Security
          </SideNavItem>
          <SideNavItem href="#usage" icon={<InformationCircleIcon />}>Usage</SideNavItem>
        </SideNavGroup>
        <SideNavGroup label="Settings">
          <SideNavItem href="#members">Members</SideNavItem>
          <SideNavItem href="#teams">Teams</SideNavItem>
          <SideNavItem href="#tokens" badge="12">Access tokens</SideNavItem>
          <SideNavItem href="#publishers" icon={<PlusIcon />}>Trusted publishers</SideNavItem>
        </SideNavGroup>
      </>
    ),
  },
  decorators: [(Story) => <div className="w-60"><Story /></div>],
} satisfies Meta<typeof SideNav>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-39: a named landmark; the current page is marked, and a group's heading names its list. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nav = canvas.getByRole("navigation", { name: "Organization" });
    await expect(within(nav).getByRole("link", { name: "Repositories" })).toHaveAttribute("aria-current", "page");
    await expect(within(nav).getByRole("list", { name: "Settings" })).toBeVisible();
    await userEvent.tab();
    await expect(within(nav).getByRole("link", { name: "Repositories" })).toHaveFocus();
  },
};

export const Dark: Story = { globals: { theme: "dark" } };

/** DSN-39: items render the app's router link through `as`. */
export const WithRouterLinks: Story = {
  args: {
    children: (
      <SideNavGroup>
        <SideNavItem as={StoryRouterLink} href="/acme" current>Repositories</SideNavItem>
        <SideNavItem as={StoryRouterLink} href="/acme/usage">Usage</SideNavItem>
      </SideNavGroup>
    ),
  },
  play: async ({ canvasElement }) => {
    for (const link of within(canvasElement).getAllByRole("link")) {
      await expect(link).toHaveAttribute("data-router-link");
    }
  },
};
