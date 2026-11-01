/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";
import { RichTextEditor } from "./RichTextEditor";

const meta = {
  title: "Controls/RichTextEditor",
  component: RichTextEditor,
  tags: ["autodocs"],
  args: {
    label: "Comment",
    description: "Markdown works too: **bold**, `code`, - lists.",
    placeholder: "Add a note about this version",
    onChange: fn(),
  },
  render: (args) => (
    <div className="max-w-xl">
      <RichTextEditor {...args} />
    </div>
  ),
} satisfies Meta<typeof RichTextEditor>;

export default meta;

type Story = StoryObj<typeof meta>;

const textbox = (canvasElement: HTMLElement) => within(canvasElement).getByRole("textbox", { name: "Comment" });

const lastMarkdown = (onChange: unknown) => {
  const calls = (onChange as ReturnType<typeof fn>).mock.calls;
  return calls.at(-1)?.[0] as string | undefined;
};

export const Default: Story = {};

/** UI-6: formatting from the toolbar is reported as Markdown. */
export const Formatting: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(textbox(canvasElement));
    await userEvent.keyboard("Rotate the key");
    await userEvent.keyboard("{Control>}a{/Control}");
    await userEvent.click(canvas.getByRole("button", { name: "Bold" }));
    await expect(canvas.getByRole("button", { name: "Bold" })).toHaveAttribute("aria-pressed", "true");
    await waitFor(() => expect(lastMarkdown(args.onChange)).toBe("**Rotate the key**"));
  },
};

/** UI-6: Markdown typed as you go formats the text, and reads back as Markdown. */
export const MarkdownShortcuts: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(textbox(canvasElement));
    await userEvent.keyboard("## Steps{Enter}- Rotate the key{Enter}Push 2.13.2");
    await expect(textbox(canvasElement).querySelector("h2")).toHaveTextContent("Steps");
    await waitFor(() => expect(lastMarkdown(args.onChange)).toBe("## Steps\n\n- Rotate the key\n- Push 2.13.2"));
  },
};

/** UI-6: a controlled value loads as formatted text. */
export const WithValue: Story = {
  args: { value: "The **signing key** rotated. See [the runbook](https://docs.example.com/signing).\n\n```shell\nkiln verify acme/api:2.13.2\n```" },
  play: async ({ canvasElement }) => {
    const box = textbox(canvasElement);
    await expect(box.querySelector("strong, b, .font-semibold")).toHaveTextContent("signing key");
    await expect(box.querySelector("a")).toHaveAttribute("href", "https://docs.example.com/signing");
    await expect(box.querySelector("code")).toHaveTextContent("kiln verify");
  },
};

/** UI-7: the toolbar is one tab stop; the arrows move within it, and Tab moves on to the text. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("button", { name: /^Text style/ })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("button", { name: "Bold" })).toHaveFocus();
    await userEvent.keyboard("{End}");
    await expect(canvas.getByRole("button", { name: "Task list" })).toHaveFocus();
    await userEvent.tab();
    await expect(textbox(canvasElement)).toHaveFocus();
  },
};

/** UI-6: ⌘Enter / Ctrl+Enter calls `onSubmitShortcut` instead of starting a paragraph. */
export const SubmitShortcut: Story = {
  args: { onSubmitShortcut: fn() },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(textbox(canvasElement));
    await userEvent.keyboard("Ship it{Control>}{Enter}{/Control}");
    await expect(args.onSubmitShortcut).toHaveBeenCalledOnce();
    await expect(textbox(canvasElement).querySelectorAll("p")).toHaveLength(1);
  },
};

/** UI-8 abuse case: the link dialog refuses script links and accepts https. */
export const Links: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(textbox(canvasElement));
    await userEvent.keyboard("the runbook{Control>}a{/Control}");
    await userEvent.click(canvas.getByRole("button", { name: "Link" }));
    const address = await page.findByRole("textbox", { name: "Address" });
    await userEvent.type(address, "javascript:alert(document.cookie)");
    await userEvent.click(page.getByRole("button", { name: "Add link" }));
    await expect(page.getByRole("alert")).toHaveTextContent("starts with https://");
    await userEvent.clear(address);
    await userEvent.type(address, "https://docs.example.com/signing{Enter}");
    await waitFor(() => expect(lastMarkdown(args.onChange)).toBe("[the runbook](https://docs.example.com/signing)"));
    const link = textbox(canvasElement).querySelector("a");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer nofollow ugc");
  },
};

/** UI-8 abuse case: a loaded value's script and data links become plain text. */
export const HostileValue: Story = {
  args: {
    defaultValue: "[Open the report](javascript:alert(document.cookie)) and [this](data:text/html,<script>alert(1)</script>)",
  },
  play: async ({ canvasElement }) => {
    const box = textbox(canvasElement);
    await expect(box).toHaveTextContent("Open the report");
    await expect(box.querySelector("a")).toBeNull();
  },
};

/** UI-8 abuse case: pasted HTML keeps its text but not what Markdown can't hold, nor script links. */
export const HostilePaste: Story = {
  play: async ({ canvasElement, args }) => {
    const box = textbox(canvasElement);
    await userEvent.click(box);
    const data = new DataTransfer();
    data.setData(
      "text/html",
      '<p><u>Under</u> <span style="color:red;font-size:40px">red</span> <a href="javascript:alert(1)">bad</a>' +
        '<img src="x" onerror="alert(2)"><script>alert(3)</script></p>',
    );
    data.setData("text/plain", "Under red bad");
    box.dispatchEvent(new ClipboardEvent("paste", { clipboardData: data, bubbles: true, cancelable: true }));
    await waitFor(() => expect(box).toHaveTextContent("Under red bad"));
    await expect(box.querySelector("u, a, img, script, [style*='color']")).toBeNull();
    await waitFor(() => expect(lastMarkdown(args.onChange)).toBe("Under red bad"));
  },
};

/** UI-9: past `maxLength` the field is invalid and says by how much, announced. */
export const TooLong: Story = {
  args: { maxLength: 20, defaultValue: "The signing key rotated mid-build." },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent("Shorten this by 14 characters");
    await expect(textbox(canvasElement)).toHaveAttribute("aria-invalid", "true");
  },
};

/** UI-9: an error marks the field invalid, describes it and is announced. */
export const Error: Story = {
  args: { error: "Add a note before resolving the hold: it's kept in the audit log." },
  play: async ({ canvasElement }) => {
    const box = textbox(canvasElement);
    await expect(box).toHaveAttribute("aria-invalid", "true");
    await expect(box).toHaveAccessibleDescription(/audit log/);
  },
};

/** UI-14: the Task list button starts `- [ ]` items; a click on an item's box ticks it. */
export const TaskList: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(textbox(canvasElement));
    await userEvent.click(canvas.getByRole("button", { name: "Task list" }));
    await userEvent.keyboard("Rotate the key{Enter}Push 2.13.2");
    await waitFor(() => expect(lastMarkdown(args.onChange)).toBe("- [ ] Rotate the key\n- [ ] Push 2.13.2"));
    const first = canvas.getByRole("checkbox", { name: "Rotate the key" });
    const box = first.getBoundingClientRect();
    await userEvent.pointer({ keys: "[MouseLeft]", target: first, coords: { clientX: box.left + 6, clientY: box.top + 10 } });
    await waitFor(() => expect(first).toHaveAttribute("aria-checked", "true"));
    await waitFor(() => expect(lastMarkdown(args.onChange)).toBe("- [x] Rotate the key\n- [ ] Push 2.13.2"));
  },
};

/** UI-14: a callout loads with its kind, its marker line gone from the text. */
export const CalloutValue: Story = {
  args: { defaultValue: "> [!WARNING]\n> Re-running signs with the old key." },
  play: async ({ canvasElement }) => {
    const quote = textbox(canvasElement).querySelector("blockquote");
    await expect(quote).toHaveAttribute("data-callout", "warning");
    await expect(quote).toHaveTextContent(/^Re-running signs with the old key\.$/);
  },
};

/** UI-14: the style menu makes a callout, written in GitHub's syntax. */
export const Callouts: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    await userEvent.click(textbox(canvasElement));
    await userEvent.keyboard("Pull by digest.");
    await userEvent.click(canvas.getByRole("button", { name: /^Text style/ }));
    await userEvent.click(await page.findByRole("option", { name: "Tip callout" }));
    await waitFor(() => expect(lastMarkdown(args.onChange)).toBe("> [!TIP]\n> Pull by digest."));
    await expect(canvas.getByRole("button", { name: "Text style: Tip callout" })).toBeVisible();
  },
};

/** UI-13: Preview shows the Markdown as readers will see it; Write comes back with the text and undo history. */
export const Preview: Story = {
  args: { preview: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: "Preview" }));
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("Nothing to preview yet.");
    await userEvent.click(canvas.getByRole("tab", { name: "Write" }));
    await userEvent.click(textbox(canvasElement));
    await userEvent.keyboard("See **the runbook** and `kiln verify`");
    await waitFor(() => expect(lastMarkdown(args.onChange)).toBe("See **the runbook** and `kiln verify`"));
    await userEvent.click(canvas.getByRole("tab", { name: "Preview" }));
    const panel = canvas.getByRole("tabpanel");
    await expect(panel.querySelector("strong")).toHaveTextContent("the runbook");
    await expect(panel.querySelector("code")).toHaveTextContent("kiln verify");
    await expect(canvas.queryByRole("toolbar")).toBeNull();
    await userEvent.click(canvas.getByRole("tab", { name: "Write" }));
    await expect(textbox(canvasElement)).toHaveTextContent("See the runbook and kiln verify");
    await expect(canvas.getByRole("button", { name: "Undo" })).toBeEnabled();
  },
};

/** UI-13: the Write and Preview tabs change with the arrow keys. */
export const PreviewKeyboard: Story = {
  args: { preview: true, defaultValue: "## Plan" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await expect(canvas.getByRole("tab", { name: "Write" })).toHaveFocus();
    await userEvent.keyboard("{ArrowRight}");
    await expect(canvas.getByRole("tab", { name: "Preview" })).toHaveAttribute("aria-selected", "true");
    await expect(canvas.getByRole("tabpanel").querySelector("h4")).toHaveTextContent("Plan");
  },
};

export const PreviewDark: Story = { args: { preview: true, ...WithValue.args }, globals: { theme: "dark" } };

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Holds can only be changed by owners." },
};

export const Dark: Story = { args: WithValue.args, globals: { theme: "dark" } };
