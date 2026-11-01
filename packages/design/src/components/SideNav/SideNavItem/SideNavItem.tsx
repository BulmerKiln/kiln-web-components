/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType } from "react";
import classNames from "../../../utils/classNames";
import type { SideNavItemProps } from "./SideNavItem.types";

/*
 * The current page: a tint, medium weight and a 2 px brand bar (brand-700
 * 6.40:1 on ash-100, brand-300 5.96:1 on ash-800), so it isn't color alone.
 */
const item =
  "relative flex min-h-8 items-center gap-2.5 rounded-md px-2.5 text-ash-700 pointer-coarse:min-h-11 " +
  "hover:bg-ash-100 hover:text-ash-900 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 " +
  "aria-[current=page]:bg-ash-100 aria-[current=page]:font-medium aria-[current=page]:text-ash-900 " +
  "aria-[current=page]:before:absolute aria-[current=page]:before:inset-y-1.5 aria-[current=page]:before:-left-px " +
  "aria-[current=page]:before:w-0.5 aria-[current=page]:before:rounded-full aria-[current=page]:before:bg-brand-700 " +
  "dark:text-ash-400 dark:hover:bg-ash-800 dark:hover:text-ash-100 dark:focus-visible:outline-brand-300 " +
  "dark:aria-[current=page]:bg-ash-800 dark:aria-[current=page]:text-ash-100 dark:aria-[current=page]:before:bg-brand-300";

export function SideNavItem<E extends ElementType = "a">({
  as,
  children,
  icon,
  current = false,
  badge,
  className,
  ...props
}: SideNavItemProps<E>) {
  const Component: ElementType = as ?? "a";
  return (
    <li>
      <Component
        {...props}
        aria-current={current ? "page" : undefined}
        className={classNames(item, className)}
      >
        {icon && (
          <span aria-hidden="true" className="shrink-0 [&>svg]:size-4">
            {icon}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate">{children}</span>
        {badge !== undefined && <span className="shrink-0 text-xs tabular-nums">{badge}</span>}
      </Component>
    </li>
  );
}
