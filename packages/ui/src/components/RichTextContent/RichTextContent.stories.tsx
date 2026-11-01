/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { RichTextContent } from "./RichTextContent";

const note = `## Why 2.13.1 is unsigned

The **signing key** rotated mid-build, so the job pushed _before_ signing. ~~Re-run it~~ Don't re-run it: tag \`2.13.2\` instead.

1. Rotate the key in [the runbook](https://docs.example.com/runbooks/signing).
2. Push \`2.13.2\`.

> Retention keeps 2.13.1 until the 50-version limit.

\`\`\`shell
kiln verify kiln.example.com/acme/api:2.13.2
\`\`\``;

const meta = {
  title: "Data display/RichTextContent",
  component: RichTextContent,
  tags: ["autodocs"],
  args: { value: note },
  render: (args) => (
    <div className="max-w-xl">
      <RichTextContent {...args} />
    </div>
  ),
} satisfies Meta<typeof RichTextContent>;

export default meta;

type Story = StoryObj<typeof meta>;

/** UI-5: Markdown shows as elements: headings from h3, lists, quotes, links that open apart, code blocks. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("heading", { level: 4, name: "Why 2.13.1 is unsigned" })).toBeVisible();
    await expect(canvas.getByText("signing key").closest("strong")).not.toBeNull();
    await expect(canvas.getByRole("list")).toBeVisible();
    const link = canvas.getByRole("link", { name: /the runbook/ });
    await expect(link).toHaveAttribute("href", "https://docs.example.com/runbooks/signing");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer nofollow ugc");
    await expect(link).toHaveAttribute("target", "_blank");
    await waitFor(() => expect(canvas.getByRole("region", { name: "shell" }).querySelector("[style*='--token']")).not.toBeNull());
  },
};

/** UI-5 abuse case: script and data links keep their text but lose their target; HTML stays text. */
export const Hostile: Story = {
  args: {
    value: [
      "[Open the report](javascript:alert(document.cookie))",
      "[Download](data:text/html,<script>alert(1)</script>)",
      "[Relative](/admin)",
      '<img src="x" onerror="alert(1)"> <script>alert(2)</script>',
    ].join("\n\n"),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.queryByRole("link")).toBeNull();
    await expect(canvas.getByText("Open the report")).toBeVisible();
    await expect(canvasElement.querySelector("img, script")).toBeNull();
    await expect(canvas.getByText(/<img src="x" onerror="alert\(1\)">/)).toBeVisible();
  },
};

const checklist = `- [x] Rotate the signing key
- [ ] Push \`2.13.2\`

> [!NOTE]
> 2.13.1 stays until retention removes it.

> [!TIP]
> Pull by digest in production.

> [!IMPORTANT]
> Owners approve key rotations.

> [!WARNING]
> Re-running the job signs with the old key.

> [!CAUTION]
> Deleting 2.13.1 breaks deployments that pin it.`;

/** UI-14: task lists say what's done in words; callouts are notes named by their kind. */
export const TaskListsAndCallouts: Story = {
  args: { value: checklist },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole("listitem");
    await expect(items[0]).toHaveTextContent("Done: Rotate the signing key");
    await expect(items[1]).toHaveTextContent("To do: Push 2.13.2");
    await expect(canvas.queryByRole("checkbox")).toBeNull();
    for (const kind of ["Note", "Tip", "Important", "Warning", "Caution"]) {
      await expect(canvas.getByRole("note", { name: kind })).toBeVisible();
    }
    await expect(canvas.getByRole("note", { name: "Warning" })).toHaveTextContent("Re-running the job signs with the old key.");
  },
};

export const TaskListsAndCalloutsDark: Story = { args: { value: checklist }, globals: { theme: "dark" } };

export const Dark: Story = { globals: { theme: "dark" } };
