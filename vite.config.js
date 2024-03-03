import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: resolve(__dirname, 'public'),
  root: resolve(__dirname, 'src'),
  build: {
    emptyOutDir: true,
    outDir: resolve(__dirname, 'dist'),
  },
  server: {
    port: 3001,
    open: true,
  },
});
