/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Popover as HeadlessPopover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { Fragment } from "react";
import classNames from "../../utils/classNames";
import { popoverAnchor, popoverPanel } from "../../utils/popoverStyles";
import type { PopoverProps, PopoverSize } from "./Popover.types";

const sizeStyles: Record<PopoverSize, string> = {
  sm: "w-64",
  md: "w-80",
  lg: "w-96",
};

/**
 * A panel of interactive content under a button. It isn't modal: Tab moves
 * through it and on, and Escape or a click outside closes it, returning
 * focus to the button.
 */
export function Popover({ trigger, children, align = "start", size = "md" }: PopoverProps) {
  return (
    <HeadlessPopover>
      <PopoverButton as={Fragment}>{trigger}</PopoverButton>
      <PopoverPanel
        anchor={{ to: `bottom ${align}`, ...popoverAnchor }}
        transition
        focus
        className={classNames(
          popoverPanel,
          "p-3 text-sm text-ash-900 dark:text-ash-100",
          sizeStyles[size],
        )}
      >
        {children}
      </PopoverPanel>
    </HeadlessPopover>
  );
}
