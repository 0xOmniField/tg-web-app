import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: [".tsx", ".ts", ".mjs", ".js", ".mts", ".jsx", ".json"],
    alias: [
      { find: /^~/, replacement: "" },
      { find: "@app", replacement: resolve(__dirname, "src/app") },
      { find: "@assets", replacement: resolve(__dirname, "src/assets") },
      { find: "@api", replacement: resolve(__dirname, "src/api") },
      { find: "@features", replacement: resolve(__dirname, "src/features") },
      { find: "@pages", replacement: resolve(__dirname, "src/pages") },
      { find: "@routes", replacement: resolve(__dirname, "src/routes") },
      { find: "@store", replacement: resolve(__dirname, "src/store") },
      { find: "@utils", replacement: resolve(__dirname, "src/utils") },
      { find: "@src", replacement: resolve(__dirname, "src") },
    ],
  },
  server: {
    host: "0.0.0.0",
  },
});
