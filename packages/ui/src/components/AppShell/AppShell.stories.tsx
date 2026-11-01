/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Badge,
  Button,
  Logo,
  PageHeader,
  SideNav,
  SideNavGroup,
  SideNavItem,
  ThemeProvider,
  ThemeToggle,
} from "@bulmerkiln/design";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { AppShell } from "./AppShell";

const nav = (
  <SideNav label="Organization">
    <SideNavGroup>
      <SideNavItem href="#repos" current>Repositories</SideNavItem>
      <SideNavItem href="#security" badge={<Badge tone="danger" size="sm">3</Badge>}>Security</SideNavItem>
      <SideNavItem href="#usage">Usage</SideNavItem>
    </SideNavGroup>
    <SideNavGroup label="Settings">
      <SideNavItem href="#members">Members</SideNavItem>
      <SideNavItem href="#tokens">Access tokens</SideNavItem>
    </SideNavGroup>
  </SideNav>
);

const meta = {
  title: "Layout/AppShell",
  component: AppShell,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen", docs: { story: { inline: false, iframeHeight: 480 } } },
  args: {
    brand: (
      <a href="#home" aria-label="Kiln home" className="rounded-sm focus-visible:outline-2 focus-visible:outline-brand-700">
        <Logo size="sm" />
      </a>
    ),
    nav,
    actions: <ThemeToggle />,
    children: (
      <PageHeader
        title="Repositories"
        description="Everything acme publishes, across formats."
        actions={<Button>New repository</Button>}
      />
    ),
  },
  decorators: [
    (Story) => (
      <ThemeProvider storageKey="kiln-theme-story">
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof AppShell>;

export default meta;

type Story = StoryObj<typeof meta>;

/** UI-1: a skip link first, then the header (banner), the navigation, and <main>, which the skip link targets. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    const skip = canvas.getByRole("link", { name: "Skip to main content" });
    await expect(skip).toHaveFocus();
    await expect(skip).toHaveAttribute("href", "#main");
    await expect(canvas.getByRole("main")).toHaveAttribute("id", "main");
    // The shell's header; PageHeader's <header> sits inside <main>, so it isn't a banner.
    await expect(canvasElement.querySelector(":scope header")).toBeVisible();
  },
};

/**
 * UI-1: on a narrow screen the navigation is a drawer behind a named menu
 * button, and following a link closes it.
 */
export const Narrow: Story = {
  globals: { viewport: { value: "mobile1", isRotated: false } },
  // The links stay put: following one would navigate the test page away. The
  // shell's own handler still sees the click first and closes the drawer.
  args: { nav: <div onClick={(event) => event.preventDefault()}>{nav}</div> },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Open navigation" }));
    const drawer = await within(document.body).findByRole("dialog", { name: "Navigation" });
    await userEvent.click(within(drawer).getByRole("link", { name: "Usage" }));
    await waitFor(() => expect(within(document.body).queryByRole("dialog")).toBeNull());
  },
};

export const Dark: Story = { globals: { theme: "dark" } };
