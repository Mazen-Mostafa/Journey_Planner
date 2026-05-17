import { PLACEHOLDER_IMAGE } from "../constants/images";

/** Returns a displayable HTTPS URL, or fallback for storage paths that won't load in the browser. */
export function resolveImageUrl(path, fallback = PLACEHOLDER_IMAGE) {
  if (!path || typeof path !== "string") return fallback;

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // gs:// and other storage paths need a server; use city/placeholder image instead.
  return fallback;
}

export function resolveImageUrls(paths, fallback = PLACEHOLDER_IMAGE) {
  if (!Array.isArray(paths)) {
    return fallback ? [fallback] : [];
  }

  const urls = paths
    .map((path) => resolveImageUrl(path, fallback))
    .filter((url, index, array) => url && array.indexOf(url) === index);

  return urls.length > 0 ? urls : fallback ? [fallback] : [];
}
