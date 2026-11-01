/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { MagnifyingGlassIcon } from "../../icons/MagnifyingGlassIcon";
import { TextInput } from "./TextInput";

const meta = {
  title: "Controls/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  args: { label: "Token name", placeholder: "ci-deploy" },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: { description: "Shown in the audit log next to everything the token does." },
};

/** DSN-13: an error marks the field invalid, describes it, and is announced. */
export const Error: Story = {
  args: {
    defaultValue: "ci-deploy",
    error: "A token named ci-deploy already exists. Choose another name.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name: "Token name" });
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toHaveAccessibleDescription(/already exists/);
    await expect(canvas.getByRole("alert")).toHaveTextContent(/Choose another name/);
  },
};

export const Search: Story = {
  args: { label: "Search packages", type: "search", placeholder: "acme/api", leadingIcon: <MagnifyingGlassIcon /> },
};

export const Disabled: Story = { args: { disabled: true, defaultValue: "ci-deploy" } };

export const Required: Story = { args: { required: true } };

const States = () => (
  <div className="flex max-w-sm flex-col gap-5">
    <TextInput label="Token name" placeholder="ci-deploy" description="Shown in the audit log." />
    <TextInput label="Token name" defaultValue="ci-deploy" error="A token named ci-deploy already exists." />
    <TextInput label="Search packages" placeholder="acme/api" leadingIcon={<MagnifyingGlassIcon />} />
    <TextInput label="Token name" defaultValue="ci-deploy" disabled />
  </div>
);

export const Dark: Story = { globals: { theme: "dark" }, render: States };

export const Light: Story = { globals: { theme: "light" }, render: States };

export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("textbox", { name: "Token name" });
    await userEvent.tab();
    await expect(input).toHaveFocus();
    await userEvent.keyboard("release-bot");
    await expect(input).toHaveValue("release-bot");
  },
};
