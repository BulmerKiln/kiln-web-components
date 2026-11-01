/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Drawer, IconButton } from "@bulmerkiln/design";
import { Bars3Icon } from "@bulmerkiln/design/icons";
import { useState, type MouseEvent } from "react";
import type { AppShellProps } from "./AppShell.types";

const skipLink =
  "sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-80 focus:rounded-md focus:bg-brand-700 " +
  "focus:px-3 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:outline-2 focus:outline-offset-2 " +
  "focus:outline-brand-700 dark:focus:outline-brand-300";

/**
 * The frame of every page: a skip link, a sticky header, the side navigation
 * and <main>. Below `lg` (64rem) the navigation moves into a drawer from the
 * left, behind a menu button; following a link in it closes it. The shell
 * fills the viewport, so it uses screen queries, not container queries.
 */
export function AppShell({ brand, nav, navLabel = "Navigation", actions, banner, children }: AppShellProps) {
  const [open, setOpen] = useState(false);
  const closeOnLink = (event: MouseEvent) => {
    if ((event.target as HTMLElement).closest("a")) setOpen(false);
  };
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main" className={skipLink}>
        Skip to main content
      </a>
      {banner}
      <header className="sticky top-0 z-40 flex h-12 shrink-0 items-center gap-2 border-b border-ash-200 bg-white/90 px-3 backdrop-blur sm:px-4 dark:border-ash-800 dark:bg-ash-950/90">
        <IconButton label="Open navigation" onClick={() => setOpen(true)} className="lg:hidden">
          <Bars3Icon />
        </IconButton>
        <div className="flex min-w-0 items-center">{brand}</div>
        {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-60 shrink-0 border-r border-ash-200 lg:block dark:border-ash-800">
          <div className="sticky top-12 max-h-[calc(100dvh-3rem)] overflow-y-auto p-3">{nav}</div>
        </aside>
        {/* Focused only by the skip link, so it shows no outline of its own. */}
        <main id="main" tabIndex={-1} className="min-w-0 flex-1 px-4 py-6 focus:outline-none sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
      <Drawer open={open} onClose={() => setOpen(false)} title={navLabel} side="left" size="sm">
        <div onClickCapture={closeOnLink}>{nav}</div>
      </Drawer>
    </div>
  );
}
