import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/bubble-tea-reading-app/",
  build: {
    outDir: "docs"
  },
  plugins: [react()]
});
