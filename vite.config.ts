import { defineConfig } from 'vitest/config';

// Dev server settings let the app work inside GitHub Codespaces.
export default defineConfig({
  server: {
    host: true,
    port: 5173,
    allowedHosts: ['.app.github.dev'],
  },
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
  },
});
