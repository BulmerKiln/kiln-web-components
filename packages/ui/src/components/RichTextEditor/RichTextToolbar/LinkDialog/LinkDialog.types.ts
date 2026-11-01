/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LinkDialogProps {
  open: boolean;
  onClose: () => void;
  /** Called with a URL that's already been checked as safe. */
  onApply: (url: string) => void;
}
