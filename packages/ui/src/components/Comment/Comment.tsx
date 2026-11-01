/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Avatar, Button, classNames, IconButton, Menu, MenuItem } from "@bulmerkiln/design";
import { ChatBubbleLeftIcon, EllipsisHorizontalIcon, PencilIcon, TrashIcon } from "@bulmerkiln/design/icons";
import { useId, useState } from "react";
import { CommentComposer } from "../CommentComposer/CommentComposer";
import { RichTextContent } from "../RichTextContent/RichTextContent";
import type { CommentProps } from "./Comment.types";
import { fullDate, timeAgo } from "./Comment.utils";

/**
 * One comment: an article named by its author and time, its Markdown body, and Reply, Edit and
 * Delete when the app offers them. Editing swaps the body for a composer in place.
 */
export function Comment({
  author,
  createdAt,
  editedAt,
  body,
  onReply,
  onEdit,
  onDelete,
  children,
  now,
  className,
}: CommentProps) {
  const id = useId();
  const [editing, setEditing] = useState(false);
  // Read once, not on every render, so the times don't shift while it's shown.
  const [mounted] = useState(() => new Date());
  return (
    <article aria-labelledby={`${id}-author ${id}-time`} className={classNames("flex gap-3", className)}>
      <Avatar name={author.name} src={author.avatarSrc} size="sm" decorative className="mt-0.5" />
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-2">
          <span id={`${id}-author`} className="truncate text-sm font-semibold text-ash-900 dark:text-ash-100">
            {author.name}
          </span>
          <time
            id={`${id}-time`}
            dateTime={createdAt.toISOString()}
            title={fullDate.format(createdAt)}
            className="shrink-0 text-xs text-ash-700 dark:text-ash-400"
          >
            {timeAgo(createdAt, now ?? mounted)}
          </time>
          {editedAt && (
            <span title={`Edited ${fullDate.format(editedAt)}`} className="shrink-0 text-xs text-ash-700 dark:text-ash-400">
              · edited
            </span>
          )}
          {(onEdit || onDelete) && !editing && (
            <Menu
              align="end"
              trigger={
                <IconButton label={`Actions for ${author.name}'s comment`} size="sm" className="-my-1 ml-auto">
                  <EllipsisHorizontalIcon />
                </IconButton>
              }
            >
              {onEdit && (
                <MenuItem icon={<PencilIcon />} onClick={() => setEditing(true)}>
                  Edit
                </MenuItem>
              )}
              {onDelete && (
                <MenuItem icon={<TrashIcon />} danger onClick={onDelete}>
                  Delete
                </MenuItem>
              )}
            </Menu>
          )}
        </div>
        {editing && onEdit ? (
          <CommentComposer
            label={`Edit ${author.name}'s comment`}
            defaultValue={body}
            submitLabel="Save"
            autoFocus
            onSubmit={async (markdown) => {
              await onEdit(markdown);
              setEditing(false);
            }}
            onCancel={() => setEditing(false)}
          />
        ) : (
          <RichTextContent value={body} />
        )}
        {onReply && !editing && (
          <div>
            <Button variant="ghost" size="sm" onClick={onReply} className="-ml-2.5">
              <ChatBubbleLeftIcon className="size-4" />
              Reply
            </Button>
          </div>
        )}
        {children}
      </div>
    </article>
  );
}
