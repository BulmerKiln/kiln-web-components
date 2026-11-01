/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Kbd } from "./Kbd";

const meta = {
  title: "Data display/Kbd",
  component: Kbd,
  tags: ["autodocs"],
  args: { keys: ["mod", "K"] },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * DSN-30: one <kbd> per key inside an outer <kbd>; `mod` is Ctrl off Apple
 * platforms (the test browser), and symbols are read by name.
 */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const outer = canvasElement.querySelector("kbd")!;
    await expect(outer.querySelectorAll("kbd")).toHaveLength(2);
    await expect(outer).toHaveTextContent("CtrlControl plus K");
  },
};

const All = () => (
  <div className="flex flex-col items-start gap-3 text-sm">
    <span>
      Search <Kbd keys={["mod", "K"]} />
    </span>
    <span>
      Next result <Kbd keys={["down"]} />, open <Kbd keys={["enter"]} />, close <Kbd keys={["escape"]} />
    </span>
    <span>
      Copy digest <Kbd keys={["mod", "shift", "C"]} />
    </span>
  </div>
);

export const Combinations: Story = { globals: { theme: "light" }, render: All };

export const Dark: Story = { globals: { theme: "dark" }, render: All };
