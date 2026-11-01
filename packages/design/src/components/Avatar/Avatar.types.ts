/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export type AvatarSize = "xs" | "sm" | "md" | "lg";
export type AvatarShape = "circle" | "square";

export interface AvatarProps {
  /** The person's or organization's name: the image's alternative, and the source of the initials. */
  name: string;
  /** An image URL; initials show without one, or if it fails to load. */
  src?: string;
  size?: AvatarSize;
  /** `circle` for people, `square` for organizations. */
  shape?: AvatarShape;
  /** Hides it from assistive technology when the name is already written beside it. */
  decorative?: boolean;
  /** Placement only. */
  className?: string;
}
