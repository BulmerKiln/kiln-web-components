/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import type { FeedbackVariant } from "../../types/feedback";
import { Button } from "../Button/Button";
import { Alert } from "./Alert";

const meta = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    variant: "danger",
    title: "Push refused.",
    children: "The image's signature doesn't match the trusted publisher for acme/api.",
  },
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

const samples: Record<FeedbackVariant, [string, string]> = {
  info: ["Scanning is queued.", "Results usually arrive within a minute of a push."],
  success: ["Token created.", "Copy it now: it won't be shown again."],
  warning: ["Storage is 90% full.", "Pushes will be refused at 100%. Remove old versions or raise the quota."],
  danger: ["Push refused.", "The image's signature doesn't match the trusted publisher for acme/api."],
};

const All = () => (
  <div className="flex max-w-xl flex-col gap-3">
    {(Object.keys(samples) as FeedbackVariant[]).map((variant) => (
      <Alert key={variant} variant={variant} title={samples[variant][0]}>
        {samples[variant][1]}
      </Alert>
    ))}
  </div>
);

export const Variants: Story = { globals: { theme: "light" }, render: All };

export const Dark: Story = { globals: { theme: "dark" }, render: All };

export const WithActions: Story = {
  args: {
    variant: "warning",
    title: "Storage is 90% full.",
    children: "Pushes will be refused at 100%.",
    actions: (
      <>
        <Button size="sm">Raise quota</Button>
        <Button size="sm" variant="secondary">Review usage</Button>
      </>
    ),
  },
};

/** DSN-17: a dismissible alert has a named close button; an announced danger alert is role="alert". */
export const Dismissible: Story = {
  args: { onDismiss: fn(), announce: true },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent("Push refused.");
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss" }));
    await expect(args.onDismiss).toHaveBeenCalledOnce();
  },
};
