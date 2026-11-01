/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { XMarkIcon } from "../../icons/XMarkIcon";
import { IconButton } from "../IconButton/IconButton";
import { Tooltip } from "./Tooltip";

const meta = {
  title: "Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    content: "Revoke token",
    children: (
      <IconButton label="Revoke">
        <XMarkIcon />
      </IconButton>
    ),
  },
  render: (args) => (
    <div className="flex h-32 items-center justify-center">
      <Tooltip {...args} />
    </div>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Bottom: Story = { args: { placement: "bottom" } };

const page = () => within(document.body);

/** DSN-21: shows on keyboard focus, describes its trigger, and Escape hides it. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: "Revoke" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(await page().findByRole("tooltip")).toBeVisible();
    await expect(button).toHaveAccessibleDescription("Revoke token");
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(page().queryByRole("tooltip")).toBeNull());
  },
};

/** DSN-21: it renders in a portal on <body>, so a clipping container can't cut it off. */
export const InsideClippedContainer: Story = {
  render: (args) => (
    <div className="flex h-32 items-start">
      <div className="h-10 w-40 overflow-hidden rounded-lg p-1 ring-1 ring-ash-200 dark:ring-ash-800">
        <Tooltip {...args} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.tab();
    const tooltip = await page().findByRole("tooltip");
    await expect(tooltip).toBeVisible();
    await expect(canvasElement.contains(tooltip)).toBe(false);
  },
};

const show = async () => {
  await userEvent.tab();
  await expect(await page().findByRole("tooltip")).toBeVisible();
};

export const Light: Story = { globals: { theme: "light" }, play: show };

export const Dark: Story = { globals: { theme: "dark" }, play: show };
