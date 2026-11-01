/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import type { SideNavProps } from "./SideNav.types";

/**
 * A vertical list of places, for an app's side column. It's only the list:
 * the app shell decides where it sits and when it moves into a drawer.
 */
export function SideNav({ label, children, className }: SideNavProps) {
  return (
    <nav aria-label={label} className={classNames("flex flex-col gap-5 text-sm", className)}>
      {children}
    </nav>
  );
}
