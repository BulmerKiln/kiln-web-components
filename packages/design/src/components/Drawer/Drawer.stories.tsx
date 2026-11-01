/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Button } from "../Button/Button";
import { Switch } from "../Switch/Switch";
import { TextInput } from "../TextInput/TextInput";
import { Drawer } from "./Drawer";

function Demo() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Edit retention
      </Button>
      <Drawer
        open={open}
        onClose={close}
        title="Retention for acme/api"
        description="Old versions are removed nightly; releases are never removed."
        actions={
          <>
            <Button variant="secondary" onClick={close}>Cancel</Button>
            <Button onClick={close}>Save</Button>
          </>
        }
      >
        <div className="flex flex-col gap-5">
          <TextInput label="Keep the newest" type="number" defaultValue={50} description="Versions per package, not counting releases." />
          <TextInput label="Remove untagged after" defaultValue="14 days" />
          <Switch label="Keep anything pulled in the last 30 days" defaultChecked />
        </div>
      </Drawer>
    </>
  );
}

const meta = {
  title: "Overlays/Drawer",
  component: Drawer,
  tags: ["autodocs"],
  args: { open: false, onClose: () => {}, title: "Retention for acme/api" },
  render: () => <Demo />,
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

const openDrawer = async (canvasElement: HTMLElement) => {
  await userEvent.click(within(canvasElement).getByRole("button", { name: "Edit retention" }));
  return within(document.body).findByRole("dialog", { name: "Retention for acme/api" });
};

/** DSN-19: a drawer behaves as a dialog: Escape closes it and focus returns. */
export const Keyboard: Story = {
  play: async ({ canvasElement }) => {
    const trigger = within(canvasElement).getByRole("button", { name: "Edit retention" });
    await openDrawer(canvasElement);
    await userEvent.keyboard("{Escape}");
    await waitFor(() => expect(within(document.body).queryByRole("dialog")).toBeNull());
    await expect(trigger).toHaveFocus();
  },
};

export const Light: Story = {
  globals: { theme: "light" },
  play: async ({ canvasElement }) => {
    await openDrawer(canvasElement);
  },
};

export const Dark: Story = { ...Light, globals: { theme: "dark" } };

/** From the left, for navigation on small screens. */
export const Left: Story = {
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <Drawer open={open} onClose={() => setOpen(false)} title="Navigation" side="left" size="sm">
        <p>Repositories, Security, Usage</p>
      </Drawer>
    );
  },
};
