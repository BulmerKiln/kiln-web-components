/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Input } from "@headlessui/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { fieldControl } from "../../utils/fieldStyles";
import { FormField } from "./FormField";

/** The label, help and error frame every field uses; wrap a Headless UI control in it for a custom field. */
const meta = {
  title: "Controls/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    label: "Registry URL",
    description: "Where clients push and pull, such as https://kiln.example.com.",
    children: <Input className={fieldControl} />,
  },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-13: the label names the control and the help text describes it. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Registry URL" });
    await expect(input).toHaveAccessibleDescription(/Where clients push and pull/);
  },
};

export const Required: Story = { args: { required: true } };

export const Dark: Story = { globals: { theme: "dark" } };
