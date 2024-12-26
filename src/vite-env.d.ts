/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite-plugin-svg-sprite/client" />

interface ImportMetaEnv {
  readonly VITE_ENV: string;
  readonly VITE_ALLOW_SEARCH_ENGINES: 'true' | undefined;
  readonly VITE_GTM_ID: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
