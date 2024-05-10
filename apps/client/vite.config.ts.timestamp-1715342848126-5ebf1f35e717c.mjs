// vite.config.ts
import path from "path";
import { defineConfig } from "file:///home/jabah/Desktop/programs/pricing-project/node_modules/vite/dist/node/index.js";
import solid from "file:///home/jabah/Desktop/programs/pricing-project/node_modules/vite-plugin-solid/dist/esm/index.mjs";
import commonjs from "file:///home/jabah/Desktop/programs/pricing-project/node_modules/@rollup/plugin-commonjs/dist/es/index.js";
import solidPlugin from "file:///home/jabah/Desktop/programs/pricing-project/node_modules/vite-plugin-solid/dist/esm/index.mjs";
var __vite_injected_original_dirname = "/home/jabah/Desktop/programs/pricing-project/apps/client";
var vite_config_default = defineConfig({
  plugins: [
    solid(),
    solidPlugin({
      babel: {
        plugins: [["@locator/babel-jsx/dist"]]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      plugins: [commonjs()]
    }
  },
  optimizeDeps: {
    include: ["api-contract/**/*"]
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9qYWJhaC9EZXNrdG9wL3Byb2dyYW1zL3ByaWNpbmctcHJvamVjdC9hcHBzL2NsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvamFiYWgvRGVza3RvcC9wcm9ncmFtcy9wcmljaW5nLXByb2plY3QvYXBwcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvamFiYWgvRGVza3RvcC9wcm9ncmFtcy9wcmljaW5nLXByb2plY3QvYXBwcy9jbGllbnQvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCBzb2xpZCBmcm9tIFwidml0ZS1wbHVnaW4tc29saWRcIjtcbmltcG9ydCBjb21tb25qcyBmcm9tIFwiQHJvbGx1cC9wbHVnaW4tY29tbW9uanNcIjtcbmltcG9ydCBzb2xpZFBsdWdpbiBmcm9tIFwidml0ZS1wbHVnaW4tc29saWRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHNvbGlkKCksXG4gICAgc29saWRQbHVnaW4oe1xuICAgICAgYmFiZWw6IHtcbiAgICAgICAgcGx1Z2luczogW1tcIkBsb2NhdG9yL2JhYmVsLWpzeC9kaXN0XCJdXSxcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBwbHVnaW5zOiBbY29tbW9uanMoKV0sXG4gICAgfSxcbiAgfSxcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1wiYXBpLWNvbnRyYWN0LyoqLypcIl0sXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHByb3h5OiB7XG4gICAgICBcIi9hcGlcIjoge1xuICAgICAgICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwVixPQUFPLFVBQVU7QUFDM1csU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sY0FBYztBQUNyQixPQUFPLGlCQUFpQjtBQUp4QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTixZQUFZO0FBQUEsTUFDVixPQUFPO0FBQUEsUUFDTCxTQUFTLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztBQUFBLE1BQ3ZDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsU0FBUyxDQUFDLFNBQVMsQ0FBQztBQUFBLElBQ3RCO0FBQUEsRUFDRjtBQUFBLEVBQ0EsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLG1CQUFtQjtBQUFBLEVBQy9CO0FBQUEsRUFDQSxRQUFRO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDaEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
