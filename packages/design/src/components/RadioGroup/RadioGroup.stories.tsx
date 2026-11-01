/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { RadioGroup } from "./RadioGroup";
import type { RadioGroupOption } from "./RadioGroup.types";

const visibility: RadioGroupOption<string>[] = [
  { value: "private", label: "Private", description: "Only members of the organization can pull." },
  { value: "internal", label: "Internal", description: "Anyone signed in to this instance can pull." },
  { value: "public", label: "Public", description: "Anyone can pull, signed in or not." },
];

const meta = {
  title: "Controls/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: { label: "Visibility", options: visibility, defaultValue: "private", onChange: fn() },
} satisfies Meta<typeof RadioGroup<string>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { defaultValue: undefined, error: "Choose who can pull from this repository." },
  play: async ({ canvasElement }) => {
    const group = within(canvasElement).getByRole("radiogroup");
    await expect(group).toHaveAccessibleDescription(/Choose who can pull/);
  },
};

export const Dark: Story = { globals: { theme: "dark" } };

/** DSN-16: Tab enters on the chosen option, arrows move the choice. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("radio", { name: "Private" })).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await expect(canvas.getByRole("radio", { name: "Internal" })).toHaveAttribute("aria-checked", "true");
    await expect(args.onChange).toHaveBeenCalledWith("internal");
  },
};
