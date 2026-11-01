/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useSyncExternalStore } from "react";

/*
 * A minimal client router for the demo: pushState and popstate. A real app
 * uses its framework's router; the libraries only need its link component.
 */
const listeners = new Set<() => void>();
const notify = () => listeners.forEach((listener) => listener());

window.addEventListener("popstate", notify);

export function navigate(to: string) {
  window.history.pushState(null, "", to);
  notify();
}

export function usePath(): string {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => window.location.pathname,
  );
}
