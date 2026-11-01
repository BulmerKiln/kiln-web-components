/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Menu as HeadlessMenu,
  MenuButton,
  MenuItems,
} from "@headlessui/react";
import { Fragment } from "react";
import { popoverAnchor, popoverPanel } from "../../utils/popoverStyles";
import type { MenuProps } from "./Menu.types";

/** A list of actions behind a button. Arrows, Home, End and typing move; Escape closes. */
export function Menu({ trigger, children, align = "end" }: MenuProps) {
  return (
    <HeadlessMenu>
      <MenuButton as={Fragment}>{trigger}</MenuButton>
      <MenuItems
        anchor={{ to: `bottom ${align}`, ...popoverAnchor }}
        transition
        className={popoverPanel}
      >
        {children}
      </MenuItems>
    </HeadlessMenu>
  );
}
