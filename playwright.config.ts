import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL: 'http://localhost:4321',
    channel: 'chromium',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'pnpm run build && pnpm run preview',
    url: 'http://localhost:4321',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
