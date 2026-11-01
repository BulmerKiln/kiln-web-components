/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { Card } from "../Card/Card";
import { Skeleton } from "./Skeleton";

const meta = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: { lines: 3 },
  decorators: [(Story) => <div className="max-w-sm"><Story /></div>],
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

const parts = (canvasElement: HTMLElement) =>
  [...canvasElement.querySelectorAll<HTMLElement>('[data-part="skeleton"]')];

/** DSN-32: hidden from assistive technology, pulsing while it waits. */
export const Text: Story = {
  play: async ({ canvasElement }) => {
    await expect(canvasElement.querySelector('[aria-hidden="true"]')).not.toBeNull();
    await expect(getComputedStyle(parts(canvasElement)[0]).animationName).toBe("pulse");
  },
};

/** DSN-32: reduced motion holds it still. */
export const ReducedMotion: Story = {
  globals: { motion: "reduce" },
  play: async ({ canvasElement }) => {
    await expect(getComputedStyle(parts(canvasElement)[0]).animationName).toBe("none");
  },
};

const Loading = () => (
  // The region is named and busy; the loading message is text, read once.
  <section aria-busy="true" aria-label="Repository">
    <p className="sr-only">Loading repository</p>
    <Card>
      <div className="flex items-center gap-3">
        <Skeleton shape="circle" className="size-9" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="w-2/5" />
          <Skeleton className="w-3/5" />
        </div>
      </div>
      <Skeleton shape="block" className="mt-4 h-24" />
    </Card>
  </section>
);

export const InACard: Story = { globals: { theme: "light" }, render: Loading };

export const Dark: Story = { globals: { theme: "dark" }, render: Loading };
