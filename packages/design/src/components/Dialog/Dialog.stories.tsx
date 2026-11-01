/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../Button/Button";
import { TextInput } from "../TextInput/TextInput";
import { Dialog } from "./Dialog";
import type { DialogProps } from "./Dialog.types";

function Demo({ initialOpen = false, ...props }: Partial<DialogProps> & { initialOpen?: boolean }) {
  const [open, setOpen] = useState(initialOpen);
  const close = () => setOpen(false);
  return (
    <>
      <Button variant="danger" onClick={() => setOpen(true)}>
        Delete repository
      </Button>
      <Dialog
        title="Delete acme/api?"
        description="Its 214 versions and their scan results are removed. Releases under retention block this."
        actions={
          <>
            <Button variant="secondary" onClick={close}>Cancel</Button>
            <Button variant="danger" onClick={close}>Delete repository</Button>
          </>
        }
        {...props}
        open={open}
        onClose={close}
      >
        <TextInput label="Type acme/api to confirm" autoComplete="off" />
      </Dialog>
    </>
  );
}

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: { open: false, onClose: () => {}, title: "Delete acme/api?" },
  render: () => <Demo />,
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const openDialog = async (canvasElement: HTMLElement) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: "Delete repository" }));
  return within(document.body).findByRole("dialog", { name: "Delete acme/api?" });
};

/** DSN-19: named by its title, described, focus moves in; Escape closes and focus returns. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Delete repository" });
    const dialog = await openDialog(canvasElement);
    await expect(dialog).toHaveAccessibleDescription(/214 versions/);
    await waitFor(() => expect(dialog.contains(document.activeElement)).toBe(true));
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(within(document.body).queryByRole("dialog")).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

export const Light: Story = {
  globals: { theme: "light" },
  play: async ({ canvasElement }) => {
    await openDialog(canvasElement);
  },
};

export const Dark: Story = { ...Light, globals: { theme: "dark" } };
