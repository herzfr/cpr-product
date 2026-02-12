/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENVIRONMENT: string;
  readonly VITE_API_TIMEOUT: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
