import { imageCache } from '@/lib/image-cache';
import { useState } from 'react';

type AppImageProps = {
  src?: string;
  className?: string;
  alt?: string;
  fallbackSrc?: string;
};

export default function AppImage({
  src,
  alt,
  className,
  fallbackSrc,
}: AppImageProps) {
  const isCached = Boolean(src && imageCache.has(src));
  const [loaded, setLoaded] = useState(isCached);
  const [error, setError] = useState(false);

  const finalSrc = !src || error ? fallbackSrc : src;

  return (
    <div className="relative overflow-hidden">
      <img
        src={finalSrc}
        alt={alt}
        className={`${className}  object-cover rounded-lg transition-opacity duration-200 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading={isCached ? 'eager' : 'lazy'}
        onLoad={() => {
          if (!src) return;
          imageCache.add(src);
          setLoaded(true);
        }}
        onError={() => {
          setError(true);
          setLoaded(true);
        }}
      />
    </div>
  );
}
