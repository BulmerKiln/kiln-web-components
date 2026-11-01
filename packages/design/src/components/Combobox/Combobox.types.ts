/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface ComboboxOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps<T> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  options: ComboboxOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  placeholder?: string;
  /** Shown when nothing matches what's typed. */
  emptyMessage?: string;
  required?: boolean;
  disabled?: boolean;
  name?: string;
  /** Placement only, on the field's wrapper. */
  className?: string;
}
