import path from "path";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import commonjs from "@rollup/plugin-commonjs";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
  plugins: [
    solid(),
    solidPlugin({
      babel: {
        plugins: [["@locator/babel-jsx/dist"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
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
