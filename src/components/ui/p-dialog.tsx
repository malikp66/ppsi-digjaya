"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface PDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const PDialog = ({ open, onOpenChange, children }: PDialogProps) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-overlay flex items-center justify-center bg-black/40 p-6 transition-opacity",
        open ? "opacity-100" : "pointer-events-none opacity-0",
      )}
      role="dialog"
      aria-modal
    >
      <div className="relative w-full max-w-xl rounded-2xl bg-white/95 p-8 shadow-soft">
        <button
          className="absolute right-4 top-4 text-heritage/70 hover:text-accent focus-ring"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
