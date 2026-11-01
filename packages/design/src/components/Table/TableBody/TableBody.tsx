/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { TableBodyProps } from "./TableBody.types";

export function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-ash-200 dark:divide-ash-800">{children}</tbody>
  );
}
