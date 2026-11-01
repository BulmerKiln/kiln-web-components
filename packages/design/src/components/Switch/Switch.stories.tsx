/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Switch } from "./Switch";

const meta = {
  title: "Controls/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    label: "Scan on push",
    description: "Every pushed image is scanned before it can be pulled.",
    onChange: fn(),
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const States = () => (
  <div className="flex flex-col gap-4">
    <Switch label="Off" />
    <Switch label="On" defaultChecked />
    <Switch label="Disabled" disabled />
  </div>
);

export const Light: Story = { globals: { theme: "light" }, render: States };

export const Dark: Story = { globals: { theme: "dark" }, render: States };

/** DSN-16: Space toggles it and its state is announced. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const toggle = within(canvasElement).getByRole("switch", { name: "Scan on push" });
    await userEvent.tab();
    await expect(toggle).toHaveFocus();
    await userEvent.keyboard(" ");
    await expect(toggle).toHaveAttribute("aria-checked", "true");
    await expect(args.onChange).toHaveBeenCalledWith(true);
  },
};
