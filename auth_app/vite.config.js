import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({

  plugins: [react()],

  server: {
    port: 5173,
    open: true,
  },

  build: {

    chunkSizeWarningLimit: 1000,

    rollupOptions: {

      output: {

        manualChunks: {

          reactVendor: [
            "react",
            "react-dom",
            "react-router-dom",
          ],

          charts: [
            "recharts",
          ],

          player: [
            "react-player",
          ],
        },
      },
    },
  },
});