/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Badge } from "../Badge/Badge";
import { Table } from "./Table";
import type { TableProps } from "./Table.types";
import { TableBody } from "./TableBody/TableBody";
import { TableCell } from "./TableCell/TableCell";
import { TableHead } from "./TableHead/TableHead";
import { TableHeader } from "./TableHeader/TableHeader";
import type { TableSortDirection } from "./TableHeader/TableHeader.types";
import { TableRow } from "./TableRow/TableRow";

interface Version {
  tag: string;
  digest: string;
  size: number;
  pushed: string;
  signed: boolean;
}

const versions: Version[] = [
  { tag: "2.14.0", digest: "sha256:9f86d081884c", size: 182.4, pushed: "2 hours ago", signed: true },
  { tag: "2.13.2", digest: "sha256:60303ae22b99", size: 181.9, pushed: "3 days ago", signed: true },
  { tag: "2.13.1", digest: "sha256:fd61a03af4f7", size: 179.2, pushed: "1 week ago", signed: false },
  { tag: "2.13.0", digest: "sha256:a4e624d686e0", size: 176.5, pushed: "2 weeks ago", signed: true },
];

function Versions({ density, caption = "Versions of acme/api", hideCaption }: Partial<TableProps>) {
  const [sort, setSort] = useState<{ key: "tag" | "size"; direction: TableSortDirection }>({
    key: "tag",
    direction: "descending",
  });
  const sorted = [...versions].sort((a, b) => {
    const order = sort.key === "size" ? a.size - b.size : a.tag.localeCompare(b.tag, undefined, { numeric: true });
    return sort.direction === "ascending" ? order : -order;
  });
  const sortBy = (key: "tag" | "size") => () =>
    setSort((current) => ({
      key,
      direction: current.key === key && current.direction === "descending" ? "ascending" : "descending",
    }));
  const directionOf = (key: "tag" | "size") => (sort.key === key ? sort.direction : "none");
  return (
    <Table caption={caption} hideCaption={hideCaption} density={density}>
      <TableHead>
        <TableRow>
          <TableHeader sort={directionOf("tag")} onSort={sortBy("tag")}>Tag</TableHeader>
          <TableHeader>Digest</TableHeader>
          <TableHeader numeric sort={directionOf("size")} onSort={sortBy("size")}>Size (MB)</TableHeader>
          <TableHeader>Pushed</TableHeader>
          <TableHeader>Signature</TableHeader>
        </TableRow>
      </TableHead>
      <TableBody>
        {sorted.map((version) => (
          <TableRow key={version.tag} selected={version.tag === "2.13.2"}>
            <TableHeader scope="row">{version.tag}</TableHeader>
            <TableCell mono>{version.digest}</TableCell>
            <TableCell numeric>{version.size.toFixed(1)}</TableCell>
            <TableCell>{version.pushed}</TableCell>
            <TableCell>
              {version.signed ? <Badge tone="success" size="sm">Verified</Badge> : <Badge tone="warning" size="sm">Unsigned</Badge>}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const meta = {
  title: "Data display/Table",
  component: Table,
  tags: ["autodocs"],
  args: { caption: "Versions of acme/api", children: null },
  render: (args) => <Versions {...args} />,
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

/** DSN-34: the caption, above the scroll region, names it and the table; the region takes focus. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("table", { name: "Versions of acme/api" })).toBeVisible();
    const region = canvas.getByRole("region", { name: "Versions of acme/api" });
    await expect(region).toHaveAttribute("tabindex", "0");
    // The caption sits above the region, so it doesn't scroll away with a wide table.
    await expect(region).not.toHaveTextContent("Versions of acme/api");
    await expect(canvas.getAllByRole("rowheader")).toHaveLength(4);
  },
};

export const Compact: Story = { args: { density: "compact", hideCaption: true } };

export const Dark: Story = { globals: { theme: "dark" } };

/** DSN-34: a sortable header is a button; the sorted column's header carries aria-sort. */
export const Sorting: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const [tag, size] = canvas.getAllByRole("columnheader").filter((th) => th.querySelector("button"));
    await expect(tag).toHaveAttribute("aria-sort", "descending");
    await expect(size).not.toHaveAttribute("aria-sort");
    await userEvent.tab();
    await userEvent.tab();
    await expect(within(tag).getByRole("button", { name: "Tag" })).toHaveFocus();
    await userEvent.tab();
    await userEvent.keyboard("{Enter}");
    await expect(size).toHaveAttribute("aria-sort", "descending");
    await expect(tag).not.toHaveAttribute("aria-sort");
    await expect(canvas.getAllByRole("rowheader")[0]).toHaveTextContent("2.14.0");
  },
};

/** Wider than its container, it scrolls sideways inside its focusable region. */
export const Narrow: Story = {
  render: (args) => (
    <div className="w-80">
      <Versions {...args} />
    </div>
  ),
};
