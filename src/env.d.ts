/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Domain registered in Plausible (e.g. "lop3z.com"). Leave empty to disable analytics. */
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  /** Optional custom/self-hosted Plausible script URL. */
  readonly PUBLIC_PLAUSIBLE_SRC?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
