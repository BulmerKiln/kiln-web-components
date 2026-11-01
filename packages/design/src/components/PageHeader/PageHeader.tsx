/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import classNames from "../../utils/classNames";
import type { PageHeaderProps } from "./PageHeader.types";

/**
 * The top of a page: breadcrumb, the <h1>, a description and the page's
 * actions. It reads the width it's given (a named container), so actions move
 * beside the title once there's room, whatever the side navigation takes.
 */
export function PageHeader({ title, description, actions, breadcrumb, meta, className }: PageHeaderProps) {
  return (
    <header className={classNames("@container/page-header flex flex-col gap-3", className)}>
      {breadcrumb}
      <div className="flex flex-col gap-3 @xl/page-header:flex-row @xl/page-header:items-start @xl/page-header:justify-between">
        <div className="flex min-w-0 flex-col gap-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <h1 className="text-xl font-semibold tracking-tight text-ash-900 dark:text-ash-100">{title}</h1>
            {meta}
          </div>
          {description && <p className="max-w-prose text-sm text-ash-700 dark:text-ash-400">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
      </div>
    </header>
  );
}
