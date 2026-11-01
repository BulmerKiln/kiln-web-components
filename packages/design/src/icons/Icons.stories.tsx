/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import * as icons from "./index";

const entries = Object.entries(icons) as [string, (props: icons.SvgIconProps) => React.JSX.Element][];

const Gallery = ({ className }: { className?: string }) => (
  <ul className="grid grid-cols-[repeat(auto-fill,minmax(9rem,1fr))] gap-3 text-ash-900 dark:text-ash-100">
    {entries.map(([name, Glyph]) => (
      <li
        key={name}
        className="flex flex-col items-center gap-2 rounded-lg p-3 ring-1 ring-ash-200 ring-inset dark:ring-ash-800"
      >
        <Glyph className={className} />
        <span className="text-xs text-ash-700 dark:text-ash-400">{name}</span>
      </li>
    ))}
  </ul>
);

/** UI icons from `@bulmerkiln/design/icons`, sized with a `size-*` class and colored by the text. */
const meta = {
  title: "Foundations/Icons",
  component: Gallery,
  args: { className: "size-5" },
} satisfies Meta<typeof Gallery>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-11: decorative icons are hidden from assistive technology. */
export const All: Story = {
  play: async ({ canvasElement }) => {
    const svgs = canvasElement.querySelectorAll("svg");
    await expect(svgs.length).toBe(entries.length);
    for (const svg of svgs) await expect(svg).toHaveAttribute("aria-hidden", "true");
    await expect(within(canvasElement).queryByRole("img")).toBeNull();
  },
};

export const Small: Story = { args: { className: "size-4" } };

export const Dark: Story = { globals: { theme: "dark" } };
