declare global {
  interface Window {
    __IMAGE_CACHE__?: Set<string>;
  }
}

export const imageCache =
  typeof window !== 'undefined'
    ? (window.__IMAGE_CACHE__ ?? (window.__IMAGE_CACHE__ = new Set()))
    : new Set();
