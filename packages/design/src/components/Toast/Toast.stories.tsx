/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { ToastProvider, useToast } from "../../context/ToastContext";
import { Button } from "../Button/Button";
import { Toast } from "./Toast";

function Triggers() {
  const toast = useToast();
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="secondary" onClick={() => toast.show({ variant: "success", title: "Token created", description: "ci-deploy can push to acme/api." })}>
        Show success
      </Button>
      <Button variant="secondary" onClick={() => toast.show({ variant: "info", title: "Scan queued" })}>
        Show info
      </Button>
      <Button variant="secondary" onClick={() => toast.show({ variant: "danger", title: "Couldn't delete acme/api", description: "It has releases under retention. Remove the hold first." })}>
        Show danger
      </Button>
    </div>
  );
}

/** Shown with `useToast().show(...)` inside a `ToastProvider`. */
const meta = {
  title: "Feedback/Toast",
  component: Toast,
  tags: ["autodocs"],
  args: { title: "Token created", onDismiss: () => {} },
  render: () => (
    <ToastProvider>
      <Triggers />
    </ToastProvider>
  ),
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** DSN-18: a toast is announced (status, or alert for danger) and can be dismissed. */
export const ShowAndDismiss: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Show success" }));
    const toast = await canvas.findByRole("status");
    await expect(toast).toHaveTextContent("Token created");
    await userEvent.click(canvas.getByRole("button", { name: "Dismiss notification" }));
    await waitFor(() => expect(canvas.queryByRole("status")).toBeNull());
    await userEvent.click(canvas.getByRole("button", { name: "Show danger" }));
    await expect(await canvas.findByRole("alert")).toHaveTextContent("Couldn't delete");
  },
};

const Stack = () => (
  <div className="flex flex-col items-end gap-2">
    <Toast variant="success" title="Token created" description="ci-deploy can push to acme/api." duration={null} onDismiss={() => {}} />
    <Toast variant="info" title="Scan queued" duration={null} onDismiss={() => {}} />
    <Toast variant="warning" title="Quota nearly reached" description="acme is at 92% of its storage." duration={null} onDismiss={() => {}} />
    <Toast variant="danger" title="Couldn't delete acme/api" description="It has releases under retention." onDismiss={() => {}} />
  </div>
);

export const Variants: Story = { globals: { theme: "light" }, render: Stack };

export const Dark: Story = { globals: { theme: "dark" }, render: Stack };
