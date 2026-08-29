/**
 * Resolve a bundled asset path (e.g. "/images/sphinx.webp") against the PWA base
 * path, so it works both in local dev ("/") and under GitHub Pages ("/antiquity/").
 * One home for the base-path idiom, shared by every place that renders a bundled
 * image.
 */
export function assetUrl(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}
