/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Description,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Dialog as HeadlessDialog,
} from "@headlessui/react";
import { XMarkIcon } from "../../icons/XMarkIcon";
import classNames from "../../utils/classNames";
import { IconButton } from "../IconButton/IconButton";
import type { DialogProps, DialogSize } from "./Dialog.types";

const sizeStyles: Record<DialogSize, string> = {
  sm: "sm:max-w-sm",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
};

/**
 * A modal dialog. Focus moves in and is trapped while it's open, Escape
 * closes it, and focus returns to what opened it. Sheets up from the bottom
 * on small screens.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = "md",
}: DialogProps) {
  return (
    <HeadlessDialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-ash-950/40 transition-opacity duration-150 data-closed:opacity-0 dark:bg-black/60"
      />
      <div className="fixed inset-0 flex w-screen items-end justify-center overflow-y-auto p-4 sm:items-center">
        <DialogPanel
          transition
          className={classNames(
            "w-full rounded-xl bg-white p-5 text-ash-900 shadow-xl ring-1 ring-ash-200",
            "transition duration-150 ease-out data-closed:translate-y-2 data-closed:opacity-0 sm:data-closed:translate-y-0 sm:data-closed:scale-95",
            "dark:bg-ash-900 dark:text-ash-100 dark:shadow-black/50 dark:ring-ash-800",
            sizeStyles[size],
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
            <IconButton label="Close" size="sm" onClick={onClose} className="-m-1">
              <XMarkIcon />
            </IconButton>
          </div>
          {description && (
            <Description className="mt-1 text-sm text-ash-700 dark:text-ash-400">
              {description}
            </Description>
          )}
          {children && <div className="mt-4 text-sm">{children}</div>}
          {actions && (
            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              {actions}
            </div>
          )}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}
