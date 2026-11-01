/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useId } from "react";
import classNames from "../../utils/classNames";
import type { CardPadding, CardProps } from "./Card.types";

const paddingStyles: Record<CardPadding, string> = {
  none: "",
  sm: "px-3.5 py-3",
  md: "px-5 py-4",
};

/** A raised surface grouping related content. On the dark page it's ash-900, the raised surface. */
export function Card({
  title,
  description,
  actions,
  children,
  footer,
  headingLevel = 2,
  padding = "md",
  as: Element = "div",
  className,
}: CardProps) {
  const id = useId();
  const Heading = `h${headingLevel}` as const;
  const header = title !== undefined || actions !== undefined;
  const pad = paddingStyles[padding] || paddingStyles.md;
  return (
    <Element
      aria-labelledby={Element === "section" && title !== undefined ? id : undefined}
      className={classNames(
        "flex flex-col overflow-hidden rounded-xl bg-white text-ash-900 shadow-xs ring-1 ring-ash-200",
        "dark:bg-ash-900 dark:text-ash-100 dark:shadow-none dark:ring-ash-800",
        className,
      )}
    >
      {header && (
        <div className={classNames("flex items-start justify-between gap-4", pad, padding === "none" && "border-b border-ash-200 dark:border-ash-800")}>
          <div className="flex min-w-0 flex-col gap-0.5">
            {title !== undefined && (
              <Heading id={id} className="text-sm font-semibold">
                {title}
              </Heading>
            )}
            {description && <p className="text-sm text-ash-700 dark:text-ash-400">{description}</p>}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      {children !== undefined && (
        <div className={classNames("flex-1 text-sm", paddingStyles[padding], header && padding !== "none" && "pt-0")}>
          {children}
        </div>
      )}
      {footer && (
        <div className="border-t border-ash-200 bg-ash-50 px-5 py-2.5 text-sm dark:border-ash-800 dark:bg-ash-950/40">
          {footer}
        </div>
      )}
    </Element>
  );
}
