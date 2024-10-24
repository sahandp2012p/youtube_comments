import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        // Configure global SASS settings if necessary
      },
    },
  },
  build: {
    sourcemap: true, // Enable sourcemaps for both JS and CSS
    rollupOptions: {
      input: {
        main: path.resolve("src", "index.html"),
      },
      // output
    },
    minify: true,
    cssMinify: true,
  },
  server: {
    open: true, // Automatically open the browser
  },
});
