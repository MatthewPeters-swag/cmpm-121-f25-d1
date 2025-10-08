// vite.config.ts
import { defineConfig } from "npm:vite@4.4.5";

// Safely get repo name from CI or fallback
const repoName = Deno.env.get("GITHUB_REPO")?.split("/").at(-1) || "cmpm-121-f25-d1";
const basePath = `/${repoName}`;

export default defineConfig({
  base: basePath, // e.g. /cmpm-121-f25-d1
  root: ".",      // index.html is in root
  build: {
    outDir: "dist",
    target: "esnext",
    sourcemap: true,
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});