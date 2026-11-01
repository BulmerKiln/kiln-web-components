/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Combobox } from "./Combobox";
import type { ComboboxOption, ComboboxProps } from "./Combobox.types";

const repositories: ComboboxOption<string>[] = [
  "acme/api",
  "acme/web",
  "acme/billing",
  "acme/payments-worker",
  "platform/base-images",
  "platform/maven-central-proxy",
].map((name) => ({ value: name, label: name }));

function Demo(props: Partial<ComboboxProps<string>>) {
  const [value, setValue] = useState<string | null>(props.value ?? null);
  return (
    <Combobox
      label="Repository"
      options={repositories}
      placeholder="Search repositories"
      {...props}
      value={value}
      onChange={setValue}
      className="max-w-xs"
    />
  );
}

const meta = {
  title: "Controls/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  args: { label: "Repository", options: repositories, value: null, onChange: () => {} },
  render: (args) => <Demo {...(args as Partial<ComboboxProps<string>>)} />,
} satisfies Meta<typeof Combobox<string>>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = { args: { error: "Choose the repository to grant access to." } };

/** DSN-15: typing filters the options; axe checks the open list in dark. */
export const Dark: Story = {
  globals: { theme: "dark" },
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole("combobox", { name: "Repository" }));
    await userEvent.keyboard("acme");
    await waitFor(() => expect(within(document.body).getAllByRole("option")).toHaveLength(4));
  },
};

/** DSN-15: type to filter, arrows to move, Enter to choose; nothing matching says so. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByRole("combobox", { name: "Repository" });
    await userEvent.click(input);
    await userEvent.keyboard("maven");
    await waitFor(() => expect(within(document.body).getAllByRole("option")).toHaveLength(1));
    await userEvent.keyboard("{ArrowDown}{Enter}");
    await expect(input).toHaveValue("platform/maven-central-proxy");
    await userEvent.clear(input);
    await userEvent.keyboard("zzz");
    await expect(await within(document.body).findByText("No matches")).toBeVisible();
  },
};
