/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { Disclosure } from "./Disclosure";

const meta = {
  title: "Layout/Disclosure",
  component: Disclosure,
  tags: ["autodocs"],
  args: {
    title: "Why was this push refused?",
    children: "The image's signature doesn't match the trusted publisher configured for acme/api. Pushes from other workflows need a token with write access.",
  },
  decorators: [(Story) => <div className="max-w-lg"><Story /></div>],
} satisfies Meta<typeof Disclosure>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-41: the button says whether it's open, and Enter and Space toggle the panel. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Why was this push refused?" });
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await expect(button).toHaveAttribute("aria-expanded", "true");
    await waitFor(() => expect(canvas.getByText(/doesn't match the trusted publisher/)).toBeVisible());
    await userEvent.keyboard(" ");
    await expect(button).toHaveAttribute("aria-expanded", "false");
    await waitFor(() => expect(canvas.queryByText(/doesn't match the trusted publisher/)).toBeNull());
  },
};

const Faq = () => (
  <div>
    <Disclosure headingLevel={3} divided title="Which clients can push?" defaultOpen>
      docker, podman, oras, npm, pnpm, yarn, Maven and Gradle.
    </Disclosure>
    <Disclosure headingLevel={3} divided title="How long are untagged images kept?">
      14 days by default; set it per repository under Retention.
    </Disclosure>
    <Disclosure headingLevel={3} divided title="Can I mirror an upstream registry?">
      Yes: add a proxy repository and point clients at it.
    </Disclosure>
  </div>
);

/** DSN-41: in a run, each button sits in a heading, so the page outline lists them. */
export const Accordion: Story = {
  render: Faq,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getAllByRole("heading", { level: 3 })).toHaveLength(3);
  },
};

export const Dark: Story = { globals: { theme: "dark" }, render: Faq };
