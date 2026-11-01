/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { token } from "../../utils/storyColors";
import { StoryRouterLink } from "../../utils/StoryRouterLink";
import { Button } from "./Button";
import type { ButtonSize, ButtonVariant } from "./Button.types";

const meta = {
  title: "Controls/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Save changes", onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

const variants: ButtonVariant[] = ["primary", "secondary", "ghost", "danger"];

export const Primary: Story = { args: { variant: "primary" } };

export const Secondary: Story = { args: { variant: "secondary" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Danger: Story = {
  args: { variant: "danger", children: "Delete repository" },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

const sizes: ButtonSize[] = ["sm", "md", "lg"];

/** Every variant at every size; capitalized labels as an app would write them. */
export const Variants: Story = {
  globals: { theme: "light" },
  render: (args) => (
    <div className="flex flex-col gap-4">
      {sizes.map((size) => (
        <div key={size} className="flex flex-wrap items-center gap-3">
          {variants.map((variant) => (
            <Button key={variant} {...args} variant={variant} size={size}>
              {variant[0].toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};

/** DSN-2: every variant and size in the dark theme, checked by axe like any other story. */
export const Dark: Story = { ...Variants, globals: { theme: "dark" } };

/** DSN-10: shows the pointer cursor, and a click calls onClick. */
export const Click: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button", { name: "Save changes" });
    await expect(getComputedStyle(button).cursor).toBe("pointer");
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

/** DSN-5: reachable with Tab, activated by Enter and by Space. */
export const Keyboard: Story = {
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button");
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    await expect(args.onClick).toHaveBeenCalledTimes(2);
  },
};

/** DSN-6: a disabled button is skipped by Tab and never calls onClick. DSN-10: it shows not-allowed. */
export const Disabled: Story = {
  args: { disabled: true },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole("button");
    await expect(button).toBeDisabled();
    await expect(getComputedStyle(button).cursor).toBe("not-allowed");
    await userEvent.click(button);
    await userEvent.tab();
    await expect(button).not.toHaveFocus();
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/** DSN-12: with `href` it renders a link, styled the same. */
export const AsLink: Story = {
  args: { href: "#docs", variant: "secondary", children: "Read the docs" },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Read the docs" });
    await expect(link).toHaveAttribute("href", "#docs");
  },
};

/** DSN-33: `as` renders the app's router link, styled as the button. */
export const AsRouterLink: Story = {
  globals: { theme: "light" },
  render: () => (
    <Button as={StoryRouterLink} href="/acme/api/settings" variant="primary">
      Repository settings
    </Button>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByRole("link", { name: "Repository settings" });
    await expect(link).toHaveAttribute("data-router-link");
    await expect(link).not.toHaveAttribute("type");
    await expect(getComputedStyle(link).backgroundColor).toBe(token("brand-700"));
  },
};
