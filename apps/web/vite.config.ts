import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_DEV_API_TARGET || "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: process.env.VITE_DEV_API_TARGET || "http://localhost:3001",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});

