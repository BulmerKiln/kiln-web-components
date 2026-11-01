/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";
import type { FeedbackVariant } from "../../types/feedback";

export interface AlertProps {
  variant?: FeedbackVariant;
  /** A short summary in bold: "Push refused." */
  title?: ReactNode;
  /** What happened and what to do about it. */
  children?: ReactNode;
  /** Actions under the message, such as a Button. */
  actions?: ReactNode;
  /** Shows a close button that calls this. */
  onDismiss?: () => void;
  /**
   * Announce the alert when it appears: `role="alert"` for danger and warning,
   * `role="status"` otherwise. Leave off for alerts present when the page loads.
   */
  announce?: boolean;
  /** Placement only. */
  className?: string;
}
