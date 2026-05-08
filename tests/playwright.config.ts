import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig, devices } from '@playwright/test';

const configDirectory = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(configDirectory, '..');
const frontendPort = 5173;
const backendPort = 3001;

export default defineConfig({
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  retries: process.env.CI ? 2 : 0,
  testDir: '.',
  timeout: 30_000,
  use: {
    baseURL: `http://127.0.0.1:${frontendPort}`,
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  webServer: [
    {
      command: 'npm run dev --workspace backend',
      cwd: repoRoot,
      env: {
        ...process.env,
        CLIENT_URL: `http://127.0.0.1:${frontendPort}`,
        HOST: '127.0.0.1',
        PORT: String(backendPort),
      },
      reuseExistingServer: !process.env.CI,
      stderr: 'pipe',
      stdout: 'ignore',
      url: `http://127.0.0.1:${backendPort}/health`,
    },
    {
      command: 'npm run dev --workspace frontend -- --host 127.0.0.1 --port 5173',
      cwd: repoRoot,
      env: {
        ...process.env,
        VITE_API_BASE_URL: `http://127.0.0.1:${backendPort}`,
      },
      reuseExistingServer: !process.env.CI,
      stderr: 'pipe',
      stdout: 'ignore',
      url: `http://127.0.0.1:${frontendPort}`,
    },
  ],
  projects: [
    {
      name: 'api',
      testDir: './api',
      use: {
        baseURL: `http://127.0.0.1:${backendPort}/`,
      },
    },
    {
      name: 'ui-chromium',
      testDir: './ui',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
