/**
 * app/gallery/page.tsx — Gallery route (Server Component shell)
 *
 * Walkthrough:
 * - Renders the client `GalleryPage`, which fetches `/api/unsplash` based on current weather keyword from context.
 * - Full-screen background + navbar come from `layout.tsx` (same shell as home).
 */
import { GalleryPage as GalleryPageClient } from "@/Components/pages/gallery-page";

/**
 * Gallery: Unsplash photos by weather keyword.
 * WeatherBackground is rendered globally in layout.tsx.
 */
export default async function GalleryRoute() {
  return (
    <main className="mx-auto w-full max-w-9xl flex-1 px-4 py-6 sm:px-6">
      <GalleryPageClient />
    </main>
  );
}
