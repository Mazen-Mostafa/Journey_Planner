import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { PLACEHOLDER_IMAGE } from "../../constants/images";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

const ResolvedImage = ({
  src,
  fallback = PLACEHOLDER_IMAGE,
  className = "",
  alt = "",
  loaderSize = 80,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nextSrc = resolveImageUrl(src, fallback);
    setCurrentSrc(nextSrc);
    setLoading(true);
  }, [src, fallback]);

  const handleError = () => {
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
    }
    setLoading(false);
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <CircularProgress sx={{ color: "#869a90" }} size={loaderSize} />
        </div>
      )}
      <img
        {...props}
        src={currentSrc || fallback}
        alt={alt}
        className={className}
        onError={handleError}
        onLoad={handleLoad}
        loading="lazy"
      />
    </div>
  );
};

export default ResolvedImage;
