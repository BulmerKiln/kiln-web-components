/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface CheckboxProps {
  label: ReactNode;
  description?: ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  /** Some, not all, of what this box controls is checked. */
  indeterminate?: boolean;
  disabled?: boolean;
  name?: string;
  /** Submitted with the form when checked; defaults to "on". */
  value?: string;
  /** Placement only. */
  className?: string;
}
