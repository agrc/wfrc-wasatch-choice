/* eslint-env node */
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

function watchConfigFiles() {
  return {
    name: 'watch-config-files',
    enforce: 'post',
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.json') || file.endsWith('about.html')) {
        server.ws.send({
          type: 'full-reload',
          path: '*',
        });
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(
      process.env.npm_package_version,
    ),
  },
  plugins: [react(), watchConfigFiles()],
  test: {
    setupFiles: ['./setupTests.js'],
    environment: 'happy-dom',
    exclude: ['e2e/**', 'node_modules/**'],
  },
});
