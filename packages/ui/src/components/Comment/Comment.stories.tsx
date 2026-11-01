/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { Comment } from "./Comment";

const now = new Date("2026-11-01T12:00:00Z");

const meta = {
  title: "Data display/Comment",
  component: Comment,
  tags: ["autodocs"],
  args: {
    author: { name: "Ada Lovelace" },
    createdAt: new Date("2026-11-01T10:00:00Z"),
    body: "2.13.1 is unsigned because the key rotated mid-build. Tag `2.13.2` instead of re-running.",
    now,
  },
  render: (args) => (
    <div className="max-w-xl">
      <Comment {...args} />
    </div>
  ),
} satisfies Meta<typeof Comment>;

export default meta;

type Story = StoryObj<typeof meta>;

/** UI-11: an article named by its author and when, with the full date on the time. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const article = within(canvasElement).getByRole("article", { name: "Ada Lovelace 2 hours ago" });
    await expect(article.querySelector("time")).toHaveAttribute("datetime", "2026-11-01T10:00:00.000Z");
  },
};

/** UI-11: Edit swaps the body for a composer in place; Save sends the new Markdown. */
export const Edit: Story = {
  args: { onEdit: fn(), onDelete: fn(), onReply: fn(), editedAt: new Date("2026-11-01T11:00:00Z") },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(canvas.getByRole("button", { name: "Actions for Ada Lovelace's comment" }));
    await userEvent.click(await page.findByRole("menuitem", { name: "Edit" }));
    const editor = await canvas.findByRole("textbox", { name: "Edit Ada Lovelace's comment" });
    await waitFor(() => expect(editor).toHaveFocus());
    await userEvent.keyboard(" Done.");
    await userEvent.click(canvas.getByRole("button", { name: "Save" }));
    await expect(args.onEdit).toHaveBeenCalledWith(expect.stringMatching(/Done\.$/));
    await waitFor(() => expect(canvas.queryByRole("textbox")).toBeNull());
  },
};

export const Dark: Story = { args: { onReply: fn(), onEdit: fn() }, globals: { theme: "dark" } };
