import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-forest/90 text-white shadow-soft",
        bronze: "bg-heritage/70 text-white",
        silver: "bg-prestige/40 text-heritage",
        gold: "bg-prestige text-heritage",
        outline: "border border-heritage/50 text-heritage",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface PBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const PBadge = ({ className, variant, ...props }: PBadgeProps) => (
  <span className={cn(badgeVariants({ variant }), className)} {...props} />
);
