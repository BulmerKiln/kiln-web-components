/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, Kbd } from "@bulmerkiln/design";
import { ChartBarIcon, Cog6ToothIcon, ContainerIcon, CubeIcon, KeyIcon } from "@bulmerkiln/design/icons";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { CommandPalette } from "./CommandPalette";
import type { CommandPaletteProps } from "./CommandPalette.types";

const items: CommandPaletteProps["items"] = [
  { id: "repo-api", label: "acme/api", description: "OCI images", group: "Repositories", icon: <ContainerIcon /> },
  { id: "repo-web", label: "acme/web", description: "OCI images", group: "Repositories", icon: <ContainerIcon /> },
  { id: "repo-sdk", label: "@acme/sdk", description: "npm packages", group: "Repositories", icon: <CubeIcon /> },
  { id: "usage", label: "Usage", description: "Storage and transfer", group: "Pages", icon: <ChartBarIcon /> },
  { id: "tokens", label: "Access tokens", group: "Pages", icon: <KeyIcon />, keywords: ["credentials", "ci"] },
  { id: "settings", label: "Organization settings", group: "Pages", icon: <Cog6ToothIcon /> },
];

function Palette(props: Partial<CommandPaletteProps> & { onSelect: CommandPaletteProps["onSelect"] }) {
  const [open, setOpen] = useState(props.open ?? false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)} aria-keyshortcuts="Control+K Meta+K">
        Search <Kbd keys={["mod", "K"]} />
      </Button>
      <CommandPalette items={items} {...props} open={open} onOpenChange={setOpen} />
    </>
  );
}

const meta = {
  title: "Overlays/CommandPalette",
  component: CommandPalette,
  tags: ["autodocs"],
  args: { open: false, onOpenChange: fn(), items, onSelect: fn() },
  render: (args) => <Palette onSelect={args.onSelect} />,
} satisfies Meta<typeof CommandPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Open: Story = { render: (args) => <Palette onSelect={args.onSelect} open /> };

/** UI-4: ⌘K / Ctrl+K opens it on the search field; typing filters, the arrows move and Enter chooses. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.keyboard("{Control>}k{/Control}");
    const search = await page.findByRole("combobox", { name: "Search" });
    await expect(search).toHaveFocus();
    await userEvent.type(search, "acme ");
    await expect(page.getByRole("status")).toHaveTextContent("3 results");
    await userEvent.type(search, "npm");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(args.onSelect).toHaveBeenCalledWith(expect.objectContaining({ id: "repo-sdk" }));
    await waitFor(() => expect(page.queryByRole("dialog")).toBeNull());
  },
};

/** UI-4: a query that matches nothing says so, and Escape closes the palette. */
export const NoMatches: Story = {
  render: (args) => <Palette onSelect={args.onSelect} open />,
  play: async ({ canvasElement }) => {
    const page = within(canvasElement.ownerDocument.body);
    const search = await page.findByRole("combobox", { name: "Search" });
    await userEvent.type(search, "helm chart");
    await expect(page.getByRole("status")).toHaveTextContent("Nothing matches");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page.queryByRole("dialog")).toBeNull());
  },
};

export const Dark: Story = { ...Open, globals: { theme: "dark" } };
