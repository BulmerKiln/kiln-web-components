/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";
import type { FeedbackVariant } from "../../types/feedback";

export interface BannerProps {
  variant?: FeedbackVariant;
  /** One line about the whole app or page: maintenance, a read-only instance, an expiring key. */
  children: ReactNode;
  /** A link or small button after the message. */
  action?: ReactNode;
  onDismiss?: () => void;
  /** Placement only. */
  className?: string;
}
