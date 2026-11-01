/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "../Button/Button";
import { Banner } from "./Banner";

const meta = {
  title: "Feedback/Banner",
  component: Banner,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: {
    variant: "warning",
    children: "This instance is read-only during maintenance until 14:00 UTC.",
  },
} satisfies Meta<typeof Banner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const All = () => (
  <div className="flex flex-col gap-2">
    <Banner variant="info" action={<Button size="sm" variant="secondary" href="#notes">Release notes</Button>}>
      Kiln 1.4 is installed.
    </Banner>
    <Banner variant="success">Backups are running again.</Banner>
    <Banner variant="warning">This instance is read-only during maintenance until 14:00 UTC.</Banner>
    <Banner variant="danger" onDismiss={() => {}}>The scanner hasn't reported for 2 hours. New pushes aren't being scanned.</Banner>
  </div>
);

export const Variants: Story = { globals: { theme: "light" }, render: All };

export const Dark: Story = { globals: { theme: "dark" }, render: All };

export const Dismissible: Story = {
  args: { onDismiss: fn() },
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole("button", { name: "Dismiss" }));
    await expect(args.onDismiss).toHaveBeenCalledOnce();
  },
};
