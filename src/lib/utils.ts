import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind and conditional class names using shadcn's helper pattern.
 */
export function cn(...inputs: Parameters<typeof clsx>) {
  return twMerge(clsx(inputs));
}
