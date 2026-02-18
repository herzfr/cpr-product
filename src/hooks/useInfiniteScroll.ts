import { useEffect, useRef } from 'react';

type UseInfiniteScrollProps = {
  onLoadMore: () => void;
  enabled?: boolean;
  rootMargin?: string;
  threshold?: number;
  hasMore?: boolean;
  isFetching?: boolean;
  root?: Element | null;
};

export function useInfiniteScroll({
  onLoadMore,
  enabled = true,
  rootMargin = '200px',
  threshold = 0,
  hasMore = false,
  isFetching = false,
  root = null,
}: UseInfiniteScrollProps) {
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!enabled || !hasMore || isFetching) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          onLoadMore();
        }
      },
      {
        root,
        rootMargin,
        threshold,
      },
    );

    const current = triggerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
      observer.disconnect();
    };
  }, [onLoadMore, enabled, rootMargin, threshold, hasMore, isFetching, root]);

  return { triggerRef };
}
