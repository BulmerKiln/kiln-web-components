/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface SelectOption<T> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface SelectProps<T> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  /** Shown while nothing is chosen. */
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  /** Submits the value with a form under this name. */
  name?: string;
  /** Placement only, on the field's wrapper. */
  className?: string;
}
