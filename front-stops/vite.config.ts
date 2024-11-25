import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import path from "path";
import vue from "@vitejs/plugin-vue";

import federation from '@originjs/vite-plugin-federation';
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
      ],
      imports: ["vue", "vue-router", "pinia"],
      dts: true,
      vueTemplate: true,
      eslintrc: { enabled: true },
    }),
    federation({
      name: 'front-stops',
      filename: 'remoteEntry.js',
      exposes: {
        './AllStopsComponent': './src/components/AllStopsComponent.vue',
        './stores/stopsStore': './src/stores/stopsStore.ts',
      },
      shared: ['vue', 'pinia']
    }),
  ],
  server: {
    proxy: {
      '/backend': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
        secure: false,
        ws: true,
        rewrite: (path) => path.replace(/^\/backend/, ''),
      },
    },
    port: 5001,
    open: true
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
  },
});
