import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    // Use threads locally for speed; forks on CI for stronger isolation/compat
    pool: process.env.CI ? 'forks' : 'threads',
  },
});
