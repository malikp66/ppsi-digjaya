"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-transform duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-prestige disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "bg-forest text-white shadow-soft hover:scale-[1.01] hover:shadow-lg",
        secondary:
          "bg-heritage text-white shadow-soft hover:scale-[1.01] hover:shadow-lg",
        accent:
          "bg-accent text-white shadow-soft hover:scale-[1.01] hover:shadow-lg",
        outline:
          "border border-heritage/30 bg-white text-heritage hover:border-prestige hover:text-prestige",
        ghost:
          "bg-transparent text-heritage hover:bg-heritage/10",
      },
      size: {
        sm: "h-9 px-4 text-xs",
        md: "h-10 px-6 text-sm",
        lg: "h-12 px-8 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface PButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const PButton = React.forwardRef<HTMLButtonElement, PButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref as React.Ref<any>}
        {...props}
      />
    );
  },
);
PButton.displayName = "PButton";

export { PButton, buttonVariants };
