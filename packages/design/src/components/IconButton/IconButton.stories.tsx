/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { EllipsisHorizontalIcon } from "../../icons/EllipsisHorizontalIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { XMarkIcon } from "../../icons/XMarkIcon";
import type { ButtonSize, ButtonVariant } from "../Button/Button.types";
import { StoryRouterLink } from "../../utils/StoryRouterLink";
import { IconButton } from "./IconButton";

const meta = {
  title: "Controls/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  args: { label: "More actions", children: <EllipsisHorizontalIcon />, onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: ButtonVariant[] = ["ghost", "secondary", "primary", "danger"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

export const Default: Story = {};

/** Every variant at every size; ghost is the default. */
export const Variants: Story = {
  globals: { theme: "light" },
  render: (args) => (
    <div className="flex flex-col gap-3">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-3">
          {variants.map((variant) => (
            <IconButton key={variant} {...args} variant={variant} size={size} label={`Add (${variant}, ${size})`}>
              {variant === "ghost" ? <XMarkIcon /> : <PlusIcon />}
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Dark: Story = { ...Variants, globals: { theme: "dark" } };

/** DSN-12: named by its label, reachable with Tab and activated by Enter and Space. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: "More actions" });
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/** DSN-33: with `href` it's a link named by its label; `as` swaps in the router's. */
export const AsRouterLink: Story = {
  render: () => (
    <IconButton as={StoryRouterLink} href="/acme/new" label="New repository" variant="secondary">
      <PlusIcon />
    </IconButton>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "New repository" });
    await expect(link).toHaveAttribute("data-router-link");
  },
};
