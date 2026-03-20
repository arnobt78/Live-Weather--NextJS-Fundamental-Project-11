/**
 * lib/background.ts — SSR-friendly Unsplash “hero” URL
 *
 * Walkthrough:
 * - `unstable_cache` dedupes Unsplash calls per keyword for 300s (revalidate) — good for cost & rate limits.
 * - Maps OpenWeather `main` → search query via `WEATHER_UNSPLASH_QUERY`.
 */
import { unstable_cache } from "next/cache";
import { WEATHER_UNSPLASH_QUERY } from "@/data/constants";
import { searchUnsplash } from "@/lib/unsplash";

/**
 * Server helper to get a first-paint background image URL for any route.
 */
const getCachedBackgroundUrl = unstable_cache(
  async (query: string) => {
    const result = await searchUnsplash(query, 1);
    return result.photos[0]?.urls?.regular ?? null;
  },
  ["initial-background-url"],
  { revalidate: 300 },
);

export async function getInitialBackgroundUrl(
  weatherMain?: string | null,
): Promise<string | null> {
  const query = weatherMain
    ? (WEATHER_UNSPLASH_QUERY[weatherMain] ?? "weather")
    : "weather";
  return getCachedBackgroundUrl(query);
}
