"use client";

/**
 * AppProvider — tiny global client wrapper
 *
 * Walkthrough:
 * - Wraps the whole app inside `layout.tsx`.
 * - Disables browser scroll restoration and scrolls to top on mount so navigations feel like a SPA dashboard.
 * - Extend here for theme providers, analytics, etc., without touching every page.
 */
import { useEffect, type ReactNode } from "react";

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  useEffect(() => {
    // Disable browser scroll restoration so the page always starts at the top.
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return <>{children}</>;
}
