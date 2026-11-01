/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ElementType } from "react";
import { ArrowUpRightIcon } from "../../icons/ArrowUpRightIcon";
import classNames from "../../utils/classNames";
import type { LinkProps, LinkVariant } from "./Link.types";

// brand-700 on white 7.42:1, brand-300 on ash-950 8.36:1; hover one stop further from the page.
const base =
  "rounded-sm font-medium text-brand-700 decoration-1 underline-offset-2 " +
  "hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700 " +
  "dark:text-brand-300 dark:hover:text-brand-200 dark:focus-visible:outline-brand-300";

const variantStyles: Record<LinkVariant, string> = {
  inline: "underline decoration-brand-700/40 hover:decoration-current dark:decoration-brand-300/50",
  standalone: "no-underline hover:underline",
};

/** A link that navigates. For an action, use a Button; for a link styled as a button, Button with `href`. */
export function Link<E extends ElementType = "a">({
  as,
  variant = "inline",
  external = false,
  className,
  children,
  ...props
}: LinkProps<E>) {
  const Component: ElementType = as ?? "a";
  return (
    <Component
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
      className={classNames(base, variantStyles[variant], className)}
    >
      {children}
      {external && (
        <>
          <ArrowUpRightIcon className="ml-0.5 inline size-3.5 align-[-0.125em]" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </Component>
  );
}
