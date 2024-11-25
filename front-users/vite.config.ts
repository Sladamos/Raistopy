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
      name: 'host',
      remotes: {
        'front-stops': 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: ['vue'],
    }),
  ],
  base: "./",
  resolve: {
    alias: {
      //Two methods available
      //Method 1 : using fireURLtoPath (keep adding other paths as needed)
      "@": fileURLToPath(new URL("./src", import.meta.url)),

      //Method 2: using path
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/@Pages"),
    },
  },
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
  },
  build: {
    target: 'esnext',
  },
});
