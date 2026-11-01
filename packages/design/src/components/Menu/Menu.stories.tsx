/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { EllipsisHorizontalIcon } from "../../icons/EllipsisHorizontalIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { XMarkIcon } from "../../icons/XMarkIcon";
import { Button } from "../Button/Button";
import { IconButton } from "../IconButton/IconButton";
import { StoryRouterLink } from "../../utils/StoryRouterLink";
import { Menu } from "./Menu";
import { MenuItem } from "./MenuItem/MenuItem";
import { MenuSeparator } from "./MenuSeparator/MenuSeparator";

const copy = fn();

const meta = {
  title: "Overlays/Menu",
  component: Menu,
  tags: ["autodocs"],
  args: {
    trigger: (
      <IconButton label="Repository actions">
        <EllipsisHorizontalIcon />
      </IconButton>
    ),
    children: (
      <>
        <MenuItem onClick={copy}>Copy pull command</MenuItem>
        <MenuItem icon={<PlusIcon />} onClick={() => {}}>Add a tag</MenuItem>
        <MenuItem href="#settings">Settings</MenuItem>
        <MenuItem disabled>Transfer (owners only)</MenuItem>
        <MenuSeparator />
        <MenuItem danger icon={<XMarkIcon />} onClick={() => {}}>Delete repository</MenuItem>
      </>
    ),
  },
  render: (args) => (
    <div className="flex h-72 justify-center">
      <Menu {...args} />
    </div>
  ),
} satisfies Meta<typeof Menu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithButton: Story = {
  args: { trigger: <Button variant="secondary">Actions</Button>, align: "start" },
};

/** DSN-20: Enter opens on the first item, arrows move, Enter acts and closes, focus returns. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    copy.mockClear();
    const trigger = within(canvasElement).getByRole("button", { name: "Repository actions" });
    await userEvent.tab();
    await expect(trigger).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    const menu = await within(document.body).findByRole("menu");
    await expect(within(menu).getAllByRole("menuitem")).toHaveLength(5);
    // The menu keeps focus and points aria-activedescendant at the active item.
    const first = within(menu).getByRole("menuitem", { name: "Copy pull command" });
    await waitFor(() => expect(menu).toHaveAttribute("aria-activedescendant", first.id));
    await userEvent.keyboard("{Enter}");
    await expect(copy).toHaveBeenCalledOnce();
    await waitFor(() => expect(within(document.body).queryByRole("menu")).toBeNull());
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

const open = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: "Repository actions" }));
  await within(document.body).findByRole("menu");
};

export const Light: Story = { globals: { theme: "light" }, play: open };

export const Dark: Story = { globals: { theme: "dark" }, play: open };

/** DSN-33: a link item can be the app's router link. */
export const RouterLinkItem: Story = {
  args: {
    children: (
      <>
        <MenuItem href="/acme/api/settings" as={StoryRouterLink}>Settings</MenuItem>
        <MenuItem onClick={() => {}}>Copy pull command</MenuItem>
      </>
    ),
  },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Repository actions" }));
    const menu = await within(document.body).findByRole("menu");
    await expect(within(menu).getByRole("menuitem", { name: "Settings" })).toHaveAttribute("data-router-link");
  },
};
