/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor, within } from "storybook/test";
import { Avatar } from "./Avatar";
import type { AvatarSize } from "./Avatar.types";

// An inline image, so the story needs no network.
const photo =
  "data:image/svg+xml," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><rect width="40" height="40" fill="#7c4dd2"/><circle cx="20" cy="16" r="7" fill="#e2daf3"/><rect x="8" y="26" width="24" height="16" rx="8" fill="#e2daf3"/></svg>',
  );

const meta = {
  title: "Data display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Ada Lovelace" },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-38: initials stand in for a picture, and the avatar is named by the person. */
export const Initials: Story = {
  play: async ({ canvasElement }) => {
    const avatar = within(canvasElement).getByRole("img", { name: "Ada Lovelace" });
    await expect(avatar).toHaveTextContent("AL");
  },
};

export const Image: Story = {
  args: { src: photo },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole("img", { name: "Ada Lovelace" }).tagName).toBe("IMG");
  },
};

/** DSN-38: an image that fails to load falls back to the initials. */
export const BrokenImage: Story = {
  args: { src: "data:image/png;base64,broken" },
  play: async ({ canvasElement }) => {
    await waitFor(() => expect(within(canvasElement).getByRole("img", { name: "Ada Lovelace" })).toHaveTextContent("AL"));
  },
};

/** DSN-38: beside the written name it's decorative. */
export const Decorative: Story = {
  render: () => (
    <span className="inline-flex items-center gap-2 text-sm">
      <Avatar name="Ada Lovelace" size="sm" decorative />
      Ada Lovelace
    </span>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).queryByRole("img")).toBeNull();
  },
};

const sizes: AvatarSize[] = ["xs", "sm", "md", "lg"];
const names = ["Ada Lovelace", "Grace Hopper", "acme", "Platform Team", "Linus", "Margaret Hamilton"];

const All = () => (
  <div className="flex flex-col gap-4">
    {sizes.map((size) => (
      <div key={size} className="flex items-center gap-2">
        {names.map((name, i) => (
          <Avatar key={name} name={name} size={size} shape={i === 2 ? "square" : "circle"} />
        ))}
        <Avatar name="Ada Lovelace" src={photo} size={size} />
      </div>
    ))}
  </div>
);

export const Sizes: Story = { globals: { theme: "light" }, render: All };

export const Dark: Story = { globals: { theme: "dark" }, render: All };
