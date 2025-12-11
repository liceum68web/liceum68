import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    environment: "jsdom",
    projects: [
      {
        extends: true,
        plugins: [react(), tsconfigPaths()],
        test: {
          root: "./lib",
          environment: "node",
          include: ["**/*.test.ts"],
        },
      },
      {
        extends: true,
        plugins: [react(), tsconfigPaths()],
        test: {
          root: "./lib",
          css: true,
          environment: "jsdom",
          setupFiles: "./setupTests.js",
          include: ["**/*.test.tsx"],
        },
      },
    ],
  },
});
