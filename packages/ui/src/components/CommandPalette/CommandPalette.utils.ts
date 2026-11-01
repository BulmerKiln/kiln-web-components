/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CommandPaletteItem } from "./CommandPalette.types";

/** Items matching every word of the query, anywhere in their text, case-insensitively. */
export function filterItems(items: CommandPaletteItem[], query: string): CommandPaletteItem[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length === 0) return items;
  return items.filter((item) => {
    const text = [item.label, item.description, item.group, ...(item.keywords ?? [])].join(" ").toLowerCase();
    return words.every((word) => text.includes(word));
  });
}

/** The items by group, groups in the order they first appear; ungrouped items come first. */
export function groupItems(items: CommandPaletteItem[]): [string | undefined, CommandPaletteItem[]][] {
  const groups = new Map<string | undefined, CommandPaletteItem[]>([[undefined, []]]);
  for (const item of items) {
    const list = groups.get(item.group) ?? [];
    list.push(item);
    groups.set(item.group, list);
  }
  return [...groups].filter(([, list]) => list.length > 0);
}
