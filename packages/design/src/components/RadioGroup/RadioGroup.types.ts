/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface RadioGroupOption<T> {
  value: T;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps<T> {
  /** The group's legend. */
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  options: RadioGroupOption<T>[];
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  disabled?: boolean;
  name?: string;
  /** Placement only. */
  className?: string;
}
