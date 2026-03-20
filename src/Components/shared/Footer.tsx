/** Simple site footer; sits above the fixed background via layout z-index stacking. */
import { Copyright } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative z-10 py-4 text-center">
      <p className="inline-flex items-center gap-1.5 text-sm text-white/90">
        <Copyright className="h-3.5 w-3.5" />
        {new Date().getFullYear()}. All rights reserved.
      </p>
    </footer>
  );
}
