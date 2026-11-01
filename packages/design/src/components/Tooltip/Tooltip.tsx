/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  autoUpdate,
  flip,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from "@floating-ui/react";
import { cloneElement, useState, type CSSProperties, type Ref } from "react";
import type { TooltipProps } from "./Tooltip.types";

/**
 * Shows on hover and keyboard focus, stays while the pointer moves onto it,
 * and closes on Escape (WCAG 1.4.13). It renders in a portal on <body> and
 * flips or shifts to stay on screen, so no scrolling or clipped container
 * cuts it off. While it shows, it describes its trigger.
 */
export function Tooltip({ content, children, placement = "top" }: TooltipProps) {
  const [open, setOpen] = useState(false);
  const {
    refs: { setReference, setFloating },
    x,
    y,
    strategy,
    context,
  } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(6), flip(), shift({ padding: 8 })],
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, { delay: { open: 300, close: 100 }, handleClose: safePolygon() }),
    useFocus(context),
    useDismiss(context),
    useRole(context, { role: "tooltip" }),
  ]);
  const childRef = (children.props as { ref?: Ref<Element> }).ref;
  const ref = useMergeRefs([setReference, childRef]);
  // The position is a runtime value: CSS variables read by utilities, not raw styles.
  const position = { "--x": `${x}px`, "--y": `${y}px` } as CSSProperties;
  return (
    <>
      {cloneElement(children, getReferenceProps({ ...children.props, ref }))}
      {open && (
        <FloatingPortal>
          <div
            ref={setFloating}
            style={position}
            {...getFloatingProps()}
            className={`${strategy === "fixed" ? "fixed" : "absolute"} top-(--y) left-(--x) z-60 w-max max-w-xs rounded-md bg-ash-900 px-2 py-1 text-xs text-ash-50 shadow-md dark:bg-ash-100 dark:text-ash-900`}
          >
            {content}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
