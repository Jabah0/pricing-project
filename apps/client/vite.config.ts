import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [solid()],
  build: {
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
  optimizeDeps: {
    include: ["api-contract/**/*"],
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
