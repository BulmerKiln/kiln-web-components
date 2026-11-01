/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/** A page number, or a gap standing for the pages between its neighbors. */
export type PageItem = number | "gap";

/**
 * The pages to show: always the first and last, the current one with one on
 * each side, and a gap where pages are left out. A gap never stands for a
 * single page: that page is shown instead.
 */
export function pageItems(page: number, pageCount: number): PageItem[] {
  const shown = new Set([1, pageCount, page - 1, page, page + 1]);
  const pages = [...shown].filter((p) => p >= 1 && p <= pageCount).sort((a, b) => a - b);
  const items: PageItem[] = [];
  for (const p of pages) {
    const previous = items.at(-1);
    if (typeof previous === "number" && p - previous === 2) items.push(p - 1);
    else if (typeof previous === "number" && p - previous > 2) items.push("gap");
    items.push(p);
  }
  return items;
}
