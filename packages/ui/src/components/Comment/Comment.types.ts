/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { ReactNode } from "react";

export interface CommentAuthor {
  name: string;
  /** An image URL; initials show without one. */
  avatarSrc?: string;
}

export interface CommentProps {
  author: CommentAuthor;
  createdAt: Date;
  /** When it was last edited; shows "edited". */
  editedAt?: Date;
  /** Markdown, shown with `RichTextContent`. */
  body: string;
  /** Shows a Reply button. */
  onReply?: () => void;
  /** Offers Edit; called with the new Markdown, and may return a promise as `CommentComposer` takes. */
  onEdit?: (markdown: string) => void | Promise<void>;
  /** Offers Delete. The app confirms and removes it. */
  onDelete?: () => void;
  /** What sits under the comment: its replies, or a reply being written. */
  children?: ReactNode;
  /** The time "now" is measured from; tests and stories pin it. */
  now?: Date;
  /** Placement only. */
  className?: string;
}
