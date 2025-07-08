/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_EMAIL_API_URL_PROD: string;
  readonly PUBLIC_EMAIL_API_URL_DEV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}