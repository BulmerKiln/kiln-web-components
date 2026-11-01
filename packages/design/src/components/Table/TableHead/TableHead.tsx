/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { TableHeadProps } from "./TableHead.types";

export function TableHead({ children }: TableHeadProps) {
  return (
    <thead className="border-b border-ash-200 dark:border-ash-800">{children}</thead>
  );
}
