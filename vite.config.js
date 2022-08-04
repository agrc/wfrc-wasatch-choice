/* eslint-env node */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  plugins: [react()],
  test: {
    setupFiles: ['./setupTests.js'],
    environment: 'happy-dom',
  },
});
