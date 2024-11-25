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
        './stores/stopsStore': './src/@Stores/stopsStore.ts',
      },
      shared: ['vue', 'pinia']
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/@Pages"),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    emptyOutDir: true,
  },
});
