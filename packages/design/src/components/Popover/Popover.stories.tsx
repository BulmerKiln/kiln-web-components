/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";
import { Popover } from "./Popover";

const meta = {
  title: "Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: {
    trigger: (
      <Button variant="secondary">
        Formats
        <ChevronDownIcon className="size-4" />
      </Button>
    ),
    children: (
      <div className="flex flex-col gap-3">
        <p className="font-medium">Show repositories for</p>
        <Checkbox label="OCI images" defaultChecked />
        <Checkbox label="npm packages" defaultChecked />
        <Checkbox label="Maven artifacts" />
        <div className="flex justify-end">
          <Button size="sm">Apply</Button>
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="h-72">
      <Popover {...args} />
    </div>
  ),
} satisfies Meta<typeof Popover>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** DSN-42: Enter opens it and focus moves in; Escape closes it and focus returns to the button. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Formats" });
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const first = await within(document.body).findByRole("checkbox", { name: "OCI images" });
    await waitFor(() => expect(first).toHaveFocus());
    await userEvent.keyboard("{Escape}");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(trigger).toHaveFocus());
  },
};

const open = async ({ canvasElement }: { canvasElement: HTMLElement }) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: "Formats" }));
  await within(document.body).findByRole("checkbox", { name: "OCI images" });
};

export const Light: Story = { globals: { theme: "light" }, play: open };

export const Dark: Story = { globals: { theme: "dark" }, play: open };
