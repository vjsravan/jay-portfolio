import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// VITE_BASE_PATH is injected by CI (e.g. /jay-portfolio/).
// Falls back to '/' for local dev and custom-domain deploys.
const base = process.env.VITE_BASE_PATH ?? '/';

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: false,
    target: 'es2020',
    // three.js is ~900 KB minified. It sits in its own chunk that only
    // the lazily loaded 3D scenes pull in, so it never blocks first paint.
    chunkSizeWarningLimit: 1200,
    rolldownOptions: {
      output: {
        codeSplitting: {
          // On by default, and it drags React into the three chunk, which
          // makes the entry import that chunk eagerly and defeats the split.
          includeDependenciesRecursively: false,
          groups: [{ name: 'three', test: /node_modules[\\/](three|@react-three)/ }],
        },
      },
    },
  },
});
