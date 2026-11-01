/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Textarea } from "./Textarea";

const meta = {
  title: "Controls/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { label: "Description", description: "Markdown isn't rendered." },
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: { defaultValue: "x", error: "Write at least 10 characters so others know what this repository holds." },
};

export const Dark: Story = { ...Error, globals: { theme: "dark" } };

export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const box = within(canvasElement).getByRole("textbox", { name: "Description" });
    await userEvent.tab();
    await expect(box).toHaveFocus();
    await userEvent.keyboard("Images for the payments API");
    await expect(box).toHaveValue("Images for the payments API");
  },
};
