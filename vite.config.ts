import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteEjsPlugin } from 'vite-plugin-ejs';
import createSvgSpritePlugin from 'vite-plugin-svg-sprite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: packageJson.homepage,
  define: {
    'import.meta.env.VITE_NAME': JSON.stringify(packageJson.name),
    'import.meta.env.VITE_VERSION': JSON.stringify(packageJson.version),
  },
  plugins: [
    tsconfigPaths(),
    react(),
    svgr(),
    createSvgSpritePlugin({
      symbolId: 'sprite-icon-[name]-[hash]',
    }),
    ViteEjsPlugin(viteConfig => ({
      // viteConfig is the current Vite resolved config
      env: viteConfig.env,
    })),
  ],
  build: {
    outDir: packageJson.buildFolderName,
    sourcemap: true,
    target: 'esnext',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'esnext',
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    open: true,
  },
}));
