/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import type { CommentAuthor } from "../Comment/Comment.types";

export interface CommentThreadReply {
  id: string;
  author: CommentAuthor;
  createdAt: Date;
  editedAt?: Date;
  /** Markdown. */
  body: string;
  /** Whether the viewer may edit or delete it; the server decides, this only shows the actions. */
  canEdit?: boolean;
  canDelete?: boolean;
}

export interface CommentThreadComment extends CommentThreadReply {
  /** One level only: a reply to a reply joins the same list. */
  replies?: CommentThreadReply[];
}

export interface CommentThreadProps {
  comments: CommentThreadComment[];
  /** Names the list: "Comments on 2.14.0". */
  label: string;
  /** Offers Reply on each comment; called with the comment's id and the Markdown. */
  onReply?: (commentId: string, markdown: string) => void | Promise<void>;
  /** Called with the id and the new Markdown of a comment or reply the viewer can edit. */
  onEdit?: (id: string, markdown: string) => void | Promise<void>;
  /** Called with the id of a comment or reply the viewer can delete; the app confirms. */
  onDelete?: (id: string) => void;
  /** Replies shown before "Show N more replies". */
  visibleReplies?: number;
  /** The time "now" is measured from; tests and stories pin it. */
  now?: Date;
  /** Placement only. */
  className?: string;
}
