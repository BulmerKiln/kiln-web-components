/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent, within } from "storybook/test";
import { StoryRouterLink } from "../../utils/StoryRouterLink";
import { Pagination } from "./Pagination";
import type { PaginationProps } from "./Pagination.types";

function Demo(props: Partial<PaginationProps>) {
  const [page, setPage] = useState(props.page ?? 6);
  const pageCount = props.pageCount ?? 20;
  return (
    <Pagination
      {...props}
      page={page}
      pageCount={pageCount}
      onPageChange={(next) => {
        setPage(next);
        props.onPageChange?.(next);
      }}
      summary={`${(page - 1) * 20 + 1}–${Math.min(page * 20, 391)} of 391 versions`}
    />
  );
}

const meta = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: { page: 6, pageCount: 20, onPageChange: fn() },
  render: (args) => <Demo {...args} />,
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

const pageButtons = (nav: HTMLElement) =>
  within(nav).getAllByRole("button").filter((b) => /^Page \d+$/.test(b.getAttribute("aria-label") ?? ""));

/** DSN-35: a named landmark; first, last, and the current page with its neighbors, the rest elided. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const nav = within(canvasElement).getByRole("navigation", { name: "Pagination" });
    await expect(pageButtons(nav).map((b) => b.textContent)).toEqual(["1", "5", "6", "7", "20"]);
    await expect(within(nav).getByRole("button", { name: "Page 6" })).toHaveAttribute("aria-current", "page");
  },
};

/** DSN-35: Next and Previous move a page and say so; Previous is disabled on the first page. */
export const Keyboard: Story = {
  args: { page: 1 },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("button", { name: "Previous page" })).toBeDisabled();
    await userEvent.click(canvas.getByRole("button", { name: "Next page" }));
    await expect(args.onPageChange).toHaveBeenCalledWith(2);
    await expect(canvas.getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
    await expect(pageButtons(canvas.getByRole("navigation")).map((b) => b.textContent)).toEqual(["1", "2", "3", "20"]);
  },
};

/** DSN-35: with `getHref`, the pages are links, rendered by `linkAs`. */
export const Links: Story = {
  render: () => (
    <Pagination page={3} pageCount={5} getHref={(page) => `/acme/api/versions?page=${page}`} linkAs={StoryRouterLink} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const page4 = canvas.getByRole("link", { name: "Page 4" });
    await expect(page4).toHaveAttribute("href", "/acme/api/versions?page=4");
    await expect(page4).toHaveAttribute("data-router-link");
    await expect(canvas.getByRole("link", { name: "Page 3" })).toHaveAttribute("aria-current", "page");
  },
};

/** In a narrow container the numbers give way to "Page 6 of 20". */
export const Narrow: Story = {
  render: (args) => (
    <div className="w-64">
      <Demo {...args} />
    </div>
  ),
};

export const Dark: Story = { globals: { theme: "dark" } };
