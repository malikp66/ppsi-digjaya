"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "left" | "right";
  children: React.ReactNode;
}

export const PSheet = ({ open, onOpenChange, side = "right", children }: PSheetProps) => (
  <div
    className={cn(
      "fixed inset-0 z-overlay flex transition",
      open ? "pointer-events-auto" : "pointer-events-none",
    )}
  >
    <div
      className="flex-1 bg-black/30"
      onClick={() => onOpenChange(false)}
      aria-hidden
    />
    <div
      className={cn(
        "relative h-full w-full max-w-md bg-white/95 p-6 shadow-soft transition-transform",
        side === "right" ? "translate-x-0" : "-translate-x-0",
        open
          ? "translate-x-0"
          : side === "right"
            ? "translate-x-full"
            : "-translate-x-full",
      )}
    >
      <button
        className="absolute right-4 top-4 text-sm text-heritage/70 hover:text-accent focus-ring"
        onClick={() => onOpenChange(false)}
      >
        Tutup
      </button>
      {children}
    </div>
  </div>
);
