/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Button, classNames } from "@bulmerkiln/design";
import { ChevronDownIcon, ChevronUpIcon } from "@bulmerkiln/design/icons";
import { useState } from "react";
import { Comment } from "../Comment/Comment";
import { CommentComposer } from "../CommentComposer/CommentComposer";
import type { CommentThreadProps, CommentThreadReply } from "./CommentThread.types";

/**
 * Comments in order, each with its replies one level below. Long reply lists fold behind
 * "Show N more replies"; Reply opens a composer under the comment.
 */
export function CommentThread({
  comments,
  label,
  onReply,
  onEdit,
  onDelete,
  visibleReplies = 3,
  now,
  className,
}: CommentThreadProps) {
  const [replyingTo, setReplyingTo] = useState<string>();
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const toggle = (id: string) =>
    setExpanded((current) => {
      const next = new Set(current);
      if (!next.delete(id)) next.add(id);
      return next;
    });
  const actions = (item: CommentThreadReply) => ({
    onEdit: item.canEdit && onEdit ? (markdown: string) => onEdit(item.id, markdown) : undefined,
    onDelete: item.canDelete && onDelete ? () => onDelete(item.id) : undefined,
  });
  return (
    <ol aria-label={label} className={classNames("flex flex-col gap-6", className)}>
      {comments.map((comment) => {
        const replies = comment.replies ?? [];
        const open = expanded.has(comment.id);
        const shown = open ? replies : replies.slice(0, visibleReplies);
        const hidden = replies.length - visibleReplies;
        return (
          <li key={comment.id}>
            <Comment
              author={comment.author}
              createdAt={comment.createdAt}
              editedAt={comment.editedAt}
              body={comment.body}
              now={now}
              onReply={onReply ? () => setReplyingTo(comment.id) : undefined}
              {...actions(comment)}
            >
              {replies.length > 0 && (
                <ol
                  aria-label={`Replies to ${comment.author.name}`}
                  className="mt-3 flex flex-col gap-4 border-l-2 border-ash-200 pl-4 dark:border-ash-800"
                >
                  {shown.map((reply) => (
                    <li key={reply.id}>
                      <Comment
                        author={reply.author}
                        createdAt={reply.createdAt}
                        editedAt={reply.editedAt}
                        body={reply.body}
                        now={now}
                        {...actions(reply)}
                      />
                    </li>
                  ))}
                </ol>
              )}
              {hidden > 0 && (
                <div className="mt-2">
                  {/* Stays in place as it toggles, so focus isn't lost. */}
                  <Button variant="ghost" size="sm" aria-expanded={open} onClick={() => toggle(comment.id)} className="-ml-2.5">
                    {open ? <ChevronUpIcon className="size-4" /> : <ChevronDownIcon className="size-4" />}
                    {open ? "Show fewer replies" : `Show ${hidden} more ${hidden === 1 ? "reply" : "replies"}`}
                  </Button>
                </div>
              )}
              {replyingTo === comment.id && onReply && (
                <CommentComposer
                  label={`Reply to ${comment.author.name}`}
                  submitLabel="Reply"
                  autoFocus
                  className="mt-3"
                  onSubmit={async (markdown) => {
                    await onReply(comment.id, markdown);
                    setReplyingTo(undefined);
                  }}
                  onCancel={() => setReplyingTo(undefined)}
                />
              )}
            </Comment>
          </li>
        );
      })}
    </ol>
  );
}
