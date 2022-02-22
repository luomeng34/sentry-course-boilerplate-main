import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteSentry from "vite-plugin-sentry";

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env.local") });

const viteSEntryConfig = {
  authToken: process.env.SENTRY_AUTH_TOKEN,
  org: "c3578ba366ce",
  project: "c3578ba366ce",
  release: `${process.env.npm_package_name}@${process.env.npm_package_version}`,
  setCommits: {
    auto: true,
  },
  sourceMaps: {
    include: ["./dist/assets"],
    ignore: ["node_modules"],
    urlPrefix: "~/assets",
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vue(), viteSentry(viteSEntryConfig)],
  build: {
    sourcemap: "hidden",
  },
  define: {
    __SENTRY_RELEASE__: `"${process.env.npm_package_name}@${process.env.npm_package_version}"`,
  }
});
