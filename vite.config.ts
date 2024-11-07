import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

import { nodePolyfills } from "vite-plugin-node-polyfills";
import commonjs from "vite-plugin-commonjs";
const staticDir = "assets";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(), // 使用 Node.js polyfill
    commonjs(),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  define: {
    global: "window", // 将 global 定义为 window 对象
  },
  build: {
    sourcemap: true,
    target: ["chrome120", "firefox120", "safari16", "edge120"],
    commonjsOptions: {
      ignoreTryCatch: false,
    },
    outDir: "dist",
    assetsDir: staticDir,
    copyPublicDir: true,
    reportCompressedSize: true, // gzip压缩大小报告
    chunkSizeWarningLimit: 10, // 单位为KB,
    rollupOptions: {
      output: {
        chunkFileNames: `${staticDir}/js/[name]-[hash].js`,
        entryFileNames: `${staticDir}/js/[name]-[hash].js`,
        assetFileNames: `${staticDir}/[ext]/[name]-[hash].[ext]`,
      },
    },
  },
  resolve: {
    extensions: [".tsx", ".ts", ".mjs", ".js", ".mts", ".jsx", ".json"],
    alias: [
      { find: /^~/, replacement: "" },
      { find: "crypto", replacement: "crypto-browserify" },
      {
        find: "buffer",
        replacement: resolve(__dirname, "buffer/"),
      },
      { find: "@app", replacement: resolve(__dirname, "src/app") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
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
