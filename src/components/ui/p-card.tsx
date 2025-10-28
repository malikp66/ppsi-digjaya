import * as React from "react";
import { cn } from "@/lib/utils";

export const PCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "neumorphic border border-white/20 bg-white/80 p-6 shadow-soft backdrop-blur transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-white/5",
      className,
    )}
    {...props}
  />
));
PCard.displayName = "PCard";

export const PCardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mb-4 flex flex-col gap-2", className)} {...props} />
);

export const PCardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={cn(
      "font-display text-xl tracking-tight text-heritage dark:text-prestige",
      className,
    )}
    {...props}
  />
);

export const PCardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-sm text-ink/70", className)} {...props} />
);

export const PCardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-4", className)} {...props} />
);

export const PCardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-6 flex items-center justify-between", className)} {...props} />
);
