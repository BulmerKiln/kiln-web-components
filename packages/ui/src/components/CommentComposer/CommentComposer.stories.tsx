/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { CommentComposer } from "./CommentComposer";

const meta = {
  title: "Controls/CommentComposer",
  component: CommentComposer,
  tags: ["autodocs"],
  args: { onSubmit: fn() },
  render: (args) => (
    <div className="max-w-xl">
      <CommentComposer {...args} />
    </div>
  ),
} satisfies Meta<typeof CommentComposer>;

export default meta;

type Story = StoryObj<typeof meta>;

const editor = (canvasElement: HTMLElement) => within(canvasElement).getByRole("textbox", { name: "Comment" });

export const Default: Story = {};

/** UI-10: submitting sends the Markdown, waits, then clears. */
export const Submit: Story = {
  args: { onSubmit: fn(() => new Promise<void>((resolve) => setTimeout(resolve, 200))) },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(editor(canvasElement));
    await userEvent.keyboard("Looks **good**");
    await userEvent.click(canvas.getByRole("button", { name: "Comment" }));
    await expect(args.onSubmit).toHaveBeenCalledWith("Looks **good**");
    await expect(canvas.getByRole("button", { name: /Comment/ })).toBeDisabled();
    await waitFor(() => expect(editor(canvasElement)).toHaveTextContent(""));
    await expect(canvas.getByRole("button", { name: "Comment" })).toBeEnabled();
  },
};

/** UI-10: when saving fails, the text stays and the composer says what to do. */
export const Rejected: Story = {
  args: { onSubmit: fn(() => Promise.reject(new Error("503"))) },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(editor(canvasElement));
    await userEvent.keyboard("Ship it{Control>}{Enter}{/Control}");
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Your text is still here");
    await expect(editor(canvasElement)).toHaveTextContent("Ship it");
  },
};

/** UI-10: an empty comment isn't sent; the composer says why. */
export const Empty: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Comment" }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Write something first");
    await expect(args.onSubmit).not.toHaveBeenCalled();
  },
};

export const WithCancel: Story = { args: { onCancel: fn(), submitLabel: "Reply", label: "Reply to Ada Lovelace" } };

export const Dark: Story = { globals: { theme: "dark" } };
