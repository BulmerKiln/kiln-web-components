/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { CommentThread } from "./CommentThread";
import type { CommentThreadComment } from "./CommentThread.types";

const now = new Date("2026-11-01T12:00:00Z");
const ada = { name: "Ada Lovelace" };
const grace = { name: "Grace Hopper" };
const at = (hoursAgo: number) => new Date(now.getTime() - hoursAgo * 3600 * 1000);

const comments: CommentThreadComment[] = [
  {
    id: "c1",
    author: ada,
    createdAt: at(26),
    body: "Why is **2.13.1** unsigned?",
    replies: [
      { id: "r1", author: grace, createdAt: at(25), body: "The signing key rotated mid-build.", canEdit: true, canDelete: true },
      { id: "r2", author: ada, createdAt: at(24), body: "Should we re-run it?" },
      { id: "r3", author: grace, createdAt: at(23), body: "No: tag `2.13.2` instead." },
      { id: "r4", author: ada, createdAt: at(22), body: "Done. Verified with `kiln verify`." },
      { id: "r5", author: grace, createdAt: at(21), body: "Thanks!" },
    ],
  },
  { id: "c2", author: grace, createdAt: at(2), body: "Retention keeps 2.13.1 until the 50-version limit.", canEdit: true },
];

const meta = {
  title: "Data display/CommentThread",
  component: CommentThread,
  tags: ["autodocs"],
  args: { comments, label: "Comments on 2.14.0", now, onReply: fn(), onEdit: fn(), onDelete: fn() },
  render: (args) => (
    <div className="max-w-2xl">
      <CommentThread {...args} />
    </div>
  ),
} satisfies Meta<typeof CommentThread>;

export default meta;

type Story = StoryObj<typeof meta>;

/** UI-12: a named list of comments, replies listed under each; long replies fold, and the toggle keeps focus. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("list", { name: "Comments on 2.14.0" })).toBeVisible();
    const replies = canvas.getByRole("list", { name: "Replies to Ada Lovelace" });
    await expect(within(replies).getAllByRole("article")).toHaveLength(3);
    const more = canvas.getByRole("button", { name: "Show 2 more replies" });
    await userEvent.click(more);
    await expect(within(replies).getAllByRole("article")).toHaveLength(5);
    await expect(more).toHaveFocus();
    await expect(more).toHaveAttribute("aria-expanded", "true");
  },
};

/** UI-12: Reply opens a composer under the comment, focused; sending calls `onReply` and closes it. */
export const Reply: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getAllByRole("button", { name: "Reply" })[1]);
    const editor = await canvas.findByRole("textbox", { name: "Reply to Grace Hopper" });
    await waitFor(() => expect(editor).toHaveFocus());
    await userEvent.keyboard("Good to know.");
    // The composer's own Reply button comes last.
    await userEvent.click(canvas.getAllByRole("button", { name: "Reply" }).at(-1)!);
    await expect(args.onReply).toHaveBeenCalledWith("c2", "Good to know.");
    await waitFor(() => expect(canvas.queryByRole("textbox")).toBeNull());
  },
};

/** UI-12: only comments the viewer may change offer Edit and Delete. */
export const Permissions: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Show 2 more replies" }));
    await expect(canvas.getAllByRole("button", { name: /^Actions for/ })).toHaveLength(2);
  },
};

export const Dark: Story = { globals: { theme: "dark" } };
