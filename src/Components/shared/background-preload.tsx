type BackgroundPreloadProps = {
  imageUrl: string | null;
};

/**
 * Renders `<link rel="preload" as="image">` in the document head (via layout children tree).
 * Browsers start downloading the hero background before JS paints the crossfade layers.
 */
export function BackgroundPreload({ imageUrl }: BackgroundPreloadProps) {
  if (!imageUrl) return null;
  return <link rel="preload" as="image" href={imageUrl} fetchPriority="high" />;
}
