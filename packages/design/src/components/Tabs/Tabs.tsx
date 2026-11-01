/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import type { TabsProps } from "./Tabs.types";

// The selected tab's 2 px underline (brand-700 7.42:1 / brand-300 8.36:1) marks it beyond color.
const tab =
  "shrink-0 rounded-t-sm border-b-2 border-transparent px-1 pt-1 pb-2.5 text-sm font-medium whitespace-nowrap " +
  "text-ash-700 data-hover:text-ash-900 data-selected:border-brand-700 data-selected:text-ash-900 " +
  "data-disabled:opacity-50 focus:outline-none data-focus:outline-2 data-focus:outline-brand-700 " +
  "pointer-coarse:pb-3.5 " +
  "dark:text-ash-400 dark:data-hover:text-ash-100 dark:data-selected:border-brand-300 " +
  "dark:data-selected:text-ash-100 dark:data-focus:outline-brand-300";

/** Left and Right move between tabs, Home and End jump; the panel follows. */
export function Tabs({ tabs, className, ...props }: TabsProps) {
  return (
    <TabGroup {...props} className={className}>
      {/*
       * The baseline is an inset shadow, not a border, so the selected tab's underline can cover it
       * without a negative margin: one would overflow the list, and a list that scrolls sideways
       * scrolls up and down too.
       */}
      <TabList className="flex gap-5 overflow-x-auto px-0.5 shadow-[inset_0_-1px_0_0_var(--color-ash-200)] dark:shadow-[inset_0_-1px_0_0_var(--color-ash-800)]">
        {tabs.map((item) => (
          <Tab key={item.id} disabled={item.disabled} className={tab}>
            {item.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels className="pt-4">
        {tabs.map((item) => (
          <TabPanel
            key={item.id}
            className="rounded-sm focus:outline-none data-focus:outline-2 data-focus:outline-offset-4 data-focus:outline-brand-700 dark:data-focus:outline-brand-300"
          >
            {item.panel}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
}
