/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode, Ref, TextareaHTMLAttributes } from "react";

export interface TextareaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  /** Placement only, on the field's wrapper. */
  className?: string;
  ref?: Ref<HTMLTextAreaElement>;
}
