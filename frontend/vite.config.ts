import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "path";

export default defineConfig({
  clearScreen: false,
  server: {
    strictPort: true,
    host: true,
  },
  envPrefix: ["VITE_", "TAURI_"],
  define: {
    "process.env.NODE_ENV": JSON.stringify("local"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@catalyst": path.resolve(__dirname, "src/components/Catalyst"),
    },
  },
  build: {
    target: process.env.TAURI_PLATFORM == "windows" ? "chrome105" : "safari13",
    minify: !process.env.TAURI_DEBUG ? "esbuild" : false,
    sourcemap: !!process.env.TAURI_DEBUG,
    manifest: true,
  },
  plugins: [
    TanStackRouterVite({ autoCodeSplitting: true, target: "react" }),
    react(),
  ],
});
