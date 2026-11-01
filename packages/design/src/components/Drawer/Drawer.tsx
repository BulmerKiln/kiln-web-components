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
import type { DrawerProps, DrawerSide, DrawerSize } from "./Drawer.types";

const sizeStyles: Record<DrawerSize, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

const sideStyles: Record<DrawerSide, { frame: string; closed: string }> = {
  right: { frame: "right-0 justify-end pl-10", closed: "data-closed:translate-x-full" },
  left: { frame: "left-0 justify-start pr-10", closed: "data-closed:-translate-x-full" },
};

/** A modal panel from one edge, for detail and forms that need room. Behaves as Dialog. */
export function Drawer({
  open,
  onClose,
  title,
  description,
  children,
  actions,
  size = "md",
  side = "right",
}: DrawerProps) {
  return (
    <HeadlessDialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-ash-950/40 transition-opacity duration-200 data-closed:opacity-0 dark:bg-black/60"
      />
      <div className={classNames("fixed inset-y-0 flex w-full", sideStyles[side].frame)}>
        <DialogPanel
          transition
          className={classNames(
            "flex h-full w-full flex-col bg-white text-ash-900 shadow-xl ring-1 ring-ash-200",
            "transition duration-200 ease-out",
            sideStyles[side].closed,
            "dark:bg-ash-900 dark:text-ash-100 dark:shadow-black/50 dark:ring-ash-800",
            sizeStyles[size],
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-ash-200 px-5 py-4 dark:border-ash-800">
            <div className="flex flex-col gap-1">
              <DialogTitle className="text-base font-semibold">{title}</DialogTitle>
              {description && (
                <Description className="text-sm text-ash-700 dark:text-ash-400">
                  {description}
                </Description>
              )}
            </div>
            <IconButton label="Close" size="sm" onClick={onClose} className="-m-1">
              <XMarkIcon />
            </IconButton>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-4 text-sm">{children}</div>
          {actions && (
            <div className="flex flex-col-reverse gap-2 border-t border-ash-200 px-5 py-3 sm:flex-row sm:justify-end dark:border-ash-800">
              {actions}
            </div>
          )}
        </DialogPanel>
      </div>
    </HeadlessDialog>
  );
}
