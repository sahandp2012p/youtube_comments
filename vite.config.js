import { defineConfig } from "vite";
import path from "path";
import tailwindcss from 'tailwindcss';
import autoprefixer from "autoprefixer";

export default defineConfig({
  root: "src",
  plugins: [
    {
      ...tailwindcss,
      postcss: {
        plugins: [
          autoprefixer
        ]
      }
    }
  ],
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
    },
    outDir: "../dist",
    emptyOutDir: true,
    minify: true,
    cssMinify: true,
  },
  server: {
    open: true, // Automatically open the browser
  },
});
