/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface FormFieldProps {
  label: ReactNode;
  /** Help text under the label, linked to the control. */
  description?: ReactNode;
  /** What went wrong and how to fix it; marks the control invalid and is announced. */
  error?: ReactNode;
  /** Shows a marker; the control itself must also be `required`. */
  required?: boolean;
  disabled?: boolean;
  /** One Headless UI control (`Input`, `Textarea`, `Listbox`, `Combobox`, `Select`). */
  children: ReactNode;
  /** Placement only. */
  className?: string;
}
