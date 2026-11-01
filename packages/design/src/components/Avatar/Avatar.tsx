/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import classNames from "../../utils/classNames";
import type { AvatarProps, AvatarShape, AvatarSize } from "./Avatar.types";
import { avatarTone, initials, type AvatarTone } from "./Avatar.utils";

const sizeStyles: Record<AvatarSize, string> = {
  xs: "size-5 text-[0.5625rem]",
  sm: "size-6 text-[0.625rem]",
  md: "size-8 text-xs",
  lg: "size-10 text-sm",
};

const shapeStyles: Record<AvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-md",
};

// Initials on their tint: 7.3:1 or better in both themes.
const toneStyles: Record<AvatarTone, string> = {
  brand: "bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-100",
  celadon: "bg-celadon-100 text-celadon-800 dark:bg-celadon-900 dark:text-celadon-100",
  accent: "bg-accent-100 text-accent-900 dark:bg-accent-900 dark:text-accent-100",
  ash: "bg-ash-100 text-ash-800 dark:bg-ash-800 dark:text-ash-100",
};

/** A person's or organization's picture, or their initials. */
export function Avatar({
  name,
  src,
  size = "md",
  shape = "circle",
  decorative = false,
  className,
}: AvatarProps) {
  const [failed, setFailed] = useState<string | undefined>(undefined);
  const frame = classNames(
    "inline-flex shrink-0 items-center justify-center overflow-hidden select-none",
    sizeStyles[size],
    shapeStyles[shape],
    className,
  );
  if (src && failed !== src) {
    return (
      <img
        src={src}
        alt={decorative ? "" : name}
        onError={() => setFailed(src)}
        className={classNames(frame, "bg-ash-100 object-cover dark:bg-ash-800")}
      />
    );
  }
  return (
    <span
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": name })}
      className={classNames(frame, "font-semibold", toneStyles[avatarTone(name)])}
    >
      {initials(name)}
    </span>
  );
}
