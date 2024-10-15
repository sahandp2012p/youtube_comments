import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  css: {
    preprocessorOptions: {
      sass: {
        // Configure global SASS settings if necessary
      }
    },
    postcss: {
      plugins: [
        require('cssnano')({
          preset: 'default',
        }),
      ],
    },
  },
  build: {
    sourcemap: true,  // Enable sourcemaps for both JS and CSS
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      }
    },
    minify: true,
    cssMinify: true
  },
  server: {
    open: true, // Automatically open the browser
  },
});
