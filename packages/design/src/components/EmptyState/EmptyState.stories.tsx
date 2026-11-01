/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { MagnifyingGlassIcon } from "../../icons/MagnifyingGlassIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { Button } from "../Button/Button";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "Feedback/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    icon: <PlusIcon />,
    title: "No repositories yet",
    description: "Push an image or publish a package and its repository appears here.",
    action: <Button>Create repository</Button>,
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("heading", { level: 2 })).toHaveTextContent("No repositories yet");
  },
};

export const NoResults: Story = {
  args: {
    icon: <MagnifyingGlassIcon />,
    title: "No packages match \u201cpaymnts\u201d",
    description: "Check the spelling, or search by namespace such as acme/.",
    action: <Button variant="secondary">Clear search</Button>,
    headingLevel: 3,
  },
};

export const Dark: Story = { globals: { theme: "dark" } };
