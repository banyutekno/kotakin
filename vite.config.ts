import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
      },
      '/repo-assets': {
        target: 'http://localhost:3000',
      },
    },
  },
  plugins: [react()],
  root: resolve(__dirname, 'web'),
});
