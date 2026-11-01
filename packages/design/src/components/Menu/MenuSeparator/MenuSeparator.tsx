/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuSeparator as HeadlessMenuSeparator } from "@headlessui/react";

/** A line between groups of menu items. */
export function MenuSeparator() {
  return (
    <HeadlessMenuSeparator className="mx-1 my-1 h-px bg-ash-200 dark:bg-ash-800" />
  );
}
