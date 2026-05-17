import { useEffect, useState } from "react";
import { PLACEHOLDER_IMAGE } from "../constants/images";
import { resolveImageUrl, resolveImageUrls } from "../utils/resolveImageUrl";

export function useResolvedImage(src, fallback = PLACEHOLDER_IMAGE) {
  const [url, setUrl] = useState(fallback);

  useEffect(() => {
    setUrl(resolveImageUrl(src, fallback));
  }, [src, fallback]);

  return url;
}

export function useResolvedImages(paths, fallback = PLACEHOLDER_IMAGE) {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    setUrls(resolveImageUrls(paths, fallback));
  }, [paths, fallback]);

  return urls;
}
