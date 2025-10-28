import * as React from "react";
import { cn } from "@/lib/utils";

export interface PInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const PInput = React.forwardRef<HTMLInputElement, PInputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-xl border border-heritage/20 bg-white/80 px-4 text-sm text-ink shadow-inset focus:border-prestige focus:outline-none focus:ring-2 focus:ring-prestige/70 dark:bg-white/10",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
PInput.displayName = "PInput";
