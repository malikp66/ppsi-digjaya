"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "warning" | "danger";

type Toast = {
  id: number;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastContextValue = {
  toasts: Toast[];
  push: (toast: Omit<Toast, "id">) => void;
  dismiss: (id: number) => void;
};

const ToastContext = React.createContext<ToastContextValue | undefined>(
  undefined,
);

const variantStyles: Record<ToastVariant, string> = {
  success: "border-l-4 border-forest bg-forest/10 text-forest",
  warning: "border-l-4 border-prestige bg-prestige/10 text-heritage",
  danger: "border-l-4 border-accent bg-accent/10 text-accent",
};

export const PToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const push = React.useCallback((toast: Omit<Toast, "id">) => {
    setToasts((prev) => [...prev, { ...toast, id: Date.now() }]);
  }, []);

  const dismiss = React.useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, push, dismiss }}>
      {children}
      <div className="fixed bottom-6 right-6 z-toast flex w-80 flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "rounded-2xl p-4 shadow-soft backdrop-blur",
              variantStyles[toast.variant],
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold">{toast.title}</p>
                {toast.description ? (
                  <p className="mt-1 text-xs text-ink/70">{toast.description}</p>
                ) : null}
              </div>
              <button
                className="text-sm text-ink/60 hover:text-ink focus-ring"
                onClick={() => dismiss(toast.id)}
                aria-label="Dismiss notification"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within PToastProvider");
  return context;
};
