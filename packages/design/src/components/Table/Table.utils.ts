/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext, useContext } from "react";
import type { TableDensity } from "./Table.types";
import type { TableAlign } from "./TableHeader/TableHeader.types";

/** The table's density, read by its cells. */
export const TableDensityContext = createContext<TableDensity>("comfortable");

export const useTableDensity = () => useContext(TableDensityContext);

/** Header and cell alignment, shared by TableHeader and TableCell. */
export const alignStyles: Record<TableAlign, string> = {
  start: "text-left",
  end: "text-right",
  center: "text-center",
};
