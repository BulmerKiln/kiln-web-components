/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem as HeadlessMenuItem } from "@headlessui/react";
import classNames from "../../../utils/classNames";
import { popoverItem } from "../../../utils/popoverStyles";
import type { MenuItemProps } from "./MenuItem.types";

// brick-700 is 6.40:1 on the focused ash-100 row; brick-300 is 5.88:1 on ash-800.
const danger = "text-brick-700 dark:text-brick-300";

export function MenuItem({
  children,
  icon,
  onClick,
  href,
  as: Anchor = "a",
  danger: isDanger,
  disabled,
}: MenuItemProps) {
  const className = classNames(popoverItem, isDanger && danger);
  const content = (
    <>
      {icon && (
        <span
          aria-hidden="true"
          className={classNames(
            "[&>svg]:size-4",
            !isDanger && "text-ash-700 dark:text-ash-400",
          )}
        >
          {icon}
        </span>
      )}
      {children}
    </>
  );
  return (
    <HeadlessMenuItem disabled={disabled}>
      {href ? (
        <Anchor href={href} className={className}>
          {content}
        </Anchor>
      ) : (
        <button type="button" onClick={onClick} className={className}>
          {content}
        </button>
      )}
    </HeadlessMenuItem>
  );
}
