/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/** Up to two initials: the first letters of the first and last words ("Ada Lovelace" is AL, "acme" is A). */
export function initials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "?";
  const first = [...words[0]][0] ?? "";
  const last = words.length > 1 ? ([...words[words.length - 1]][0] ?? "") : "";
  return (first + last).toUpperCase();
}

export type AvatarTone = "brand" | "celadon" | "accent" | "ash";

const tones: AvatarTone[] = ["brand", "celadon", "accent", "ash"];

/** A tone picked from the name, so the same name always gets the same color. */
export function avatarTone(name: string): AvatarTone {
  let hash = 0;
  for (const char of name) hash = (hash * 31 + char.codePointAt(0)!) >>> 0;
  return tones[hash % tones.length];
}
