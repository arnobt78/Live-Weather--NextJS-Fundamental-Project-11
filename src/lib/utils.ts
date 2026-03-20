/**
 * lib/utils.ts — `cn()` className helper
 *
 * Walkthrough:
 * - `clsx` builds conditional class lists; `tailwind-merge` resolves conflicting Tailwind utilities (e.g. two paddings).
 * - Use in every UI primitive for consistent, conflict-free styling.
 */
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
