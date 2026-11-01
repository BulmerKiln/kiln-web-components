/*
 * Copyright The Bulmer Kiln Authors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { Toast } from "../components/Toast/Toast";
import type { ToastOptions } from "../components/Toast/Toast.types";

interface ToastApi {
  /** Shows a toast and returns its id. */
  show: (toast: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastApi | null>(null);

let nextId = 0;

/**
 * Holds the app's toasts, newest last, bottom right. The region is always in
 * the page, so screen readers announce a toast added to it.
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<(ToastOptions & { id: string })[]>([]);
  const dismiss = useCallback(
    (id: string) => setToasts((current) => current.filter((t) => t.id !== id)),
    [],
  );
  const show = useCallback((toast: ToastOptions) => {
    const id = `toast-${++nextId}`;
    setToasts((current) => [...current, { ...toast, id }]);
    return id;
  }, []);
  const api = useMemo(() => ({ show, dismiss }), [show, dismiss]);
  return (
    <ToastContext value={api}>
      {children}
      <section
        aria-label="Notifications"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-70 flex flex-col items-end gap-2 sm:left-auto"
      >
        {toasts.map(({ id, ...toast }) => (
          <Toast key={id} {...toast} onDismiss={() => dismiss(id)} />
        ))}
      </section>
    </ToastContext>
  );
}

export function useToast(): ToastApi {
  const api = useContext(ToastContext);
  if (!api) throw new Error("useToast needs a ToastProvider above it.");
  return api;
}
