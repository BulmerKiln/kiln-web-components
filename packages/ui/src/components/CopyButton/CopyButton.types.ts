/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ButtonSize, ButtonVariant } from "@bulmerkiln/design";

export interface CopyButtonProps {
  /** The text copied to the clipboard. */
  value: string;
  /** Names the button and shows in its tooltip: "Copy digest". */
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Placement only. */
  className?: string;
}
