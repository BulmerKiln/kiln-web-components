/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { SpinnerOverlay } from "./SpinnerOverlay";

const meta = {
  title: "Feedback/SpinnerOverlay",
  component: SpinnerOverlay,
  tags: ["autodocs"],
  args: { label: "Loading acme/api" },
  // It covers the window, so docs pages show it in its own frame.
  parameters: { layout: "fullscreen", docs: { story: { inline: false, iframeHeight: 360 } } },
} satisfies Meta<typeof SpinnerOverlay>;

export default meta;

type Story = StoryObj<typeof meta>;

const animations = (canvasElement: HTMLElement) =>
  canvasElement.ownerDocument.querySelectorAll('[data-part="flame"] animate');

/** DSN-23: announced by its label; the flame and ember morph. */
export const Default: Story = {
  globals: { theme: "light" },
  play: async ({ canvasElement }) => {
    const status = within(canvasElement.ownerDocument.body).getByRole("status");
    await expect(status).toHaveTextContent("Loading acme/api");
    const morphs = [...animations(canvasElement)].filter((a) => a.getAttribute("attributeName") === "d");
    await expect(morphs).toHaveLength(2);
  },
};

export const Dark: Story = { globals: { theme: "dark" } };

/** DSN-23: with reduced motion the mark is still. */
export const ReducedMotion: Story = {
  globals: { motion: "reduce" },
  play: async ({ canvasElement }) => {
    await waitFor(() => expect(animations(canvasElement)).toHaveLength(0));
    await expect(canvasElement.ownerDocument.querySelector('[data-part="ember"]')).not.toBeNull();
  },
};

/** Covering one region rather than the window. */
export const Contained: Story = {
  args: { contained: true, label: "Loading scan results" },
  render: (args) => (
    <div className="p-6">
      <div className="relative h-64 max-w-lg overflow-hidden rounded-xl ring-1 ring-ash-200 dark:ring-ash-800">
        <p className="p-4 text-sm">Scan results for 2.14.0</p>
        <SpinnerOverlay {...args} />
      </div>
    </div>
  ),
};
