/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { ErrorState } from "./ErrorState";

const meta = {
  title: "Feedback/ErrorState",
  component: ErrorState,
  tags: ["autodocs"],
  args: {
    title: "Scan results didn't load",
    description: "The request timed out. Try again, or check the instance's status page.",
    onRetry: fn(),
  },
} satisfies Meta<typeof ErrorState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Try again" }));
    await expect(args.onRetry).toHaveBeenCalledOnce();
  },
};

export const Dark: Story = { globals: { theme: "dark" } };
