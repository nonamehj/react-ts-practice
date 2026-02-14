import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/react-tabs-project": {
        target: "https://course-api.com",
        changeOrigin: true,
        secure: true,
        rewrite: (path) =>
          path.replace(/^\/react-tabs-project/, "/react-tabs-project"),
      },
    },
  },
});
