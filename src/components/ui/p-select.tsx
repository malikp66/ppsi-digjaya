import * as React from "react";
import { cn } from "@/lib/utils";

export interface PSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

export const PSelect = React.forwardRef<HTMLSelectElement, PSelectProps>(
  ({ className, options, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "h-11 w-full rounded-xl border border-heritage/20 bg-white/80 px-4 text-sm text-ink shadow-inset focus:border-prestige focus:outline-none focus:ring-2 focus:ring-prestige/70 dark:bg-white/10",
        className,
      )}
      {...props}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
);
PSelect.displayName = "PSelect";
