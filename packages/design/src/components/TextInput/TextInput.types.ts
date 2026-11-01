/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { InputHTMLAttributes, ReactNode, Ref } from "react";

export interface TextInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "size"> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  /** A decorative icon inside the start of the field, such as a search glass. */
  leadingIcon?: ReactNode;
  /** Placement only, on the field's wrapper. */
  className?: string;
  ref?: Ref<HTMLInputElement>;
}
