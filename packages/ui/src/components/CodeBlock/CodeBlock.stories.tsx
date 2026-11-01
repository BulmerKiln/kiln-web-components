/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, spyOn, userEvent, waitFor, within } from "storybook/test";
import { CodeBlock } from "./CodeBlock";

const manifest = `{
  "schemaVersion": 2,
  "mediaType": "application/vnd.oci.image.manifest.v1+json",
  "config": {
    "mediaType": "application/vnd.oci.image.config.v1+json",
    "digest": "sha256:9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
    "size": 1470
  },
  "layers": []
}`;

const meta = {
  title: "Data display/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  args: {
    code: "docker pull kiln.example.com/acme/api:2.14.0",
    language: "shell",
    title: "Pull command",
    copyLabel: "Copy pull command",
  },
  render: (args) => (
    <div className="max-w-xl">
      <CodeBlock {...args} />
    </div>
  ),
} satisfies Meta<typeof CodeBlock>;

export default meta;

type Story = StoryObj<typeof meta>;

/** UI-3: the region is named by its title and colored once the grammar loads; Copy copies the code. */
export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const region = canvas.getByRole("region", { name: "Pull command" });
    await waitFor(() => expect(region.querySelector("[style*='--token']")).not.toBeNull());
    const write = spyOn(navigator.clipboard, "writeText").mockResolvedValue(undefined);
    await userEvent.click(canvas.getByRole("button", { name: "Copy pull command" }));
    await expect(write).toHaveBeenCalledWith(args.code);
    write.mockRestore();
  },
};

/** UI-3: line numbers are shown but hidden from assistive technology, so they aren't read or copied as code. */
export const Manifest: Story = {
  args: { code: manifest, language: "json", title: "manifest.json", lineNumbers: true, copyLabel: "Copy manifest" },
  play: async ({ canvasElement }) => {
    const region = within(canvasElement).getByRole("region", { name: "manifest.json" });
    const numbers = region.querySelectorAll("[aria-hidden='true']");
    await expect(numbers).toHaveLength(manifest.split("\n").length);
    for (const number of numbers) await expect(number).toHaveClass("select-none");
  },
};

/** UI-3: the code scrolls sideways, so the region takes focus and scrolls by keyboard. */
export const Keyboard: Story = {
  args: { code: manifest, language: "json", title: "manifest.json" },
  render: (args) => (
    <div className="w-72">
      <CodeBlock {...args} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.tab();
    await userEvent.tab();
    const region = canvas.getByRole("region", { name: "manifest.json" });
    await expect(region).toHaveFocus();
    await expect(region.scrollWidth).toBeGreaterThan(region.clientWidth);
  },
};

/** An unknown language shows the code uncolored. */
export const Plain: Story = {
  args: { code: "kiln login kiln.example.com\nkiln push acme/api ./dist", language: "not-a-language", title: undefined, copyable: false },
};

export const Dark: Story = { args: Manifest.args, globals: { theme: "dark" } };
