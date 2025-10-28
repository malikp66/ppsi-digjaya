"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface PTabsProps {
  tabs: { value: string; label: string }[];
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}

export const PTabs = ({ tabs, value, onValueChange, children }: PTabsProps) => (
  <div className="w-full">
    <div className="flex flex-wrap gap-2 rounded-full bg-heritage/10 p-1">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onValueChange(tab.value)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition",
            value === tab.value
              ? "bg-white text-heritage shadow-soft"
              : "text-heritage/70 hover:text-heritage",
          )}
          aria-pressed={value === tab.value}
        >
          {tab.label}
        </button>
      ))}
    </div>
    <div className="mt-6">{children}</div>
  </div>
);
