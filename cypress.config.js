import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: '5n2b71',
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
  video: false,
  defaultCommandTimeout: 30000,
});
