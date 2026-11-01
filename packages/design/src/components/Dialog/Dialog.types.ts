/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export type DialogSize = "sm" | "md" | "lg";

export interface DialogProps {
  open: boolean;
  /** Called on Escape, a click outside, and the close button. */
  onClose: () => void;
  title: ReactNode;
  /** A sentence under the title, read when the dialog opens. */
  description?: ReactNode;
  children?: ReactNode;
  /** Buttons at the bottom; put the primary action last. */
  actions?: ReactNode;
  size?: DialogSize;
}
