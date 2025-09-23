import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  use: {
    headless: true,
    baseURL: 'http://localhost:5174',
    viewport: { width: 1280, height: 720 },
  },
});
