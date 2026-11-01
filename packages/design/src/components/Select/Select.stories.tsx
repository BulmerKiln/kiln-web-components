/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Select } from "./Select";
import type { SelectOption, SelectProps } from "./Select.types";

const formats: SelectOption<string>[] = [
  { value: "oci", label: "OCI images" },
  { value: "npm", label: "npm packages" },
  { value: "maven", label: "Maven artifacts" },
  { value: "cargo", label: "Cargo crates", disabled: true },
];

function Demo(props: Partial<SelectProps<string>>) {
  const [value, setValue] = useState<string | null>(props.value ?? null);
  return (
    <Select
      label="Format"
      options={formats}
      {...props}
      value={value}
      onChange={setValue}
      className="max-w-xs"
    />
  );
}

const meta = {
  title: "Controls/Select",
  component: Select,
  tags: ["autodocs"],
  args: { label: "Format", options: formats, value: null, onChange: () => {} },
  render: (args) => <Demo {...(args as Partial<SelectProps<string>>)} />,
} satisfies Meta<typeof Select<string>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Chosen: Story = { args: { value: "npm" } };

export const Error: Story = { args: { error: "Choose a format for the repository." } };

/** DSN-14: the option list opens over the page; axe checks it open in dark. */
export const Dark: Story = {
  globals: { theme: "dark" },
  args: { value: "npm" },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: /Format/ }));
    const listbox = await within(document.body).findByRole("listbox");
    await waitFor(() => expect(listbox).toBeVisible());
  },
};

/** DSN-14: Space or Arrow Down opens, arrows move, Enter chooses and closes. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const button = within(canvasElement).getByRole("button", { name: /Format/ });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await within(document.body).findByRole("listbox");
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(button).toHaveTextContent("npm packages");
  },
};
