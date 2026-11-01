/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, spyOn, userEvent, within } from "storybook/test";
import { CopyButton } from "./CopyButton";

const digest = "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08";

const meta = {
  title: "Controls/CopyButton",
  component: CopyButton,
  tags: ["autodocs"],
  args: { value: digest, label: "Copy digest" },
  render: (args) => (
    <div className="flex h-24 items-center gap-2 font-mono text-xs">
      {args.value.slice(0, 19)}…
      <CopyButton {...args} />
    </div>
  ),
} satisfies Meta<typeof CopyButton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** UI-2: named by its label; copies the value and announces "Copied". */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const write = spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Copy digest" }));
    await expect(write).toHaveBeenCalledWith(digest);
    await expect(await canvas.findByRole("status")).toHaveTextContent("Copied");
    write.mockRestore();
  },
};

/** UI-2: when the browser refuses, it says so and what to do instead. */
export const Refused: Story = {
  play: async ({ canvasElement }) => {
    const write = spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("denied"));
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Copy digest" }));
    await expect(await canvas.findByText(/Couldn't copy/, { selector: "[role=status]" })).toBeVisible();
    write.mockRestore();
  },
};

export const Dark: Story = { globals: { theme: "dark" } };
