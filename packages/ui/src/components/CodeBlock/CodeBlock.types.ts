/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

export interface CodeBlockProps {
  /** The code, shown exactly as given. */
  code: string;
  /**
   * A Shiki language id or alias (`shell`, `yaml`, `json`, `dockerfile`, `xml`, `toml`). Unknown or
   * omitted, the code is shown uncolored.
   */
  language?: string;
  /** A file name or caption above the code ("Dockerfile", "Pull command"); it names the code region. */
  title?: string;
  /** Numbers each line; the numbers aren't selected or copied. */
  lineNumbers?: boolean;
  /** Names the copy button: "Copy pull command". Copy is offered unless `copyable` is false. */
  copyLabel?: string;
  copyable?: boolean;
  /** Placement only. */
  className?: string;
}
