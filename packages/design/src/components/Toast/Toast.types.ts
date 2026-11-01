/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";
import type { FeedbackVariant } from "../../types/feedback";

export interface ToastProps {
  variant?: FeedbackVariant;
  title: ReactNode;
  description?: ReactNode;
  /**
   * Milliseconds before it closes itself, paused while hovered or focused.
   * `null` keeps it until dismissed; danger toasts default to that.
   */
  duration?: number | null;
  onDismiss: () => void;
}

export type ToastOptions = Omit<ToastProps, "onDismiss">;
