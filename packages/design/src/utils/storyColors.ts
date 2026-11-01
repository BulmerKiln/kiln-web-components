/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

/** Stories only: a theme token or CSS color as the browser computes it, for comparing with a computed style. */
export function computedColor(color: string): string {
  const probe = document.createElement("span");
  probe.style.color = color;
  document.body.append(probe);
  const value = getComputedStyle(probe).color;
  probe.remove();
  return value;
}

export const token = (name: string) => computedColor(`var(--color-${name})`);
