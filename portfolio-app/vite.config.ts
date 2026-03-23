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
    minify: true,        // uses rolldown's built-in minifier (Vite 8 default)
    sourcemap: false,
    target: 'es2020',
    chunkSizeWarningLimit: 900,
  },
});
