import { test as base } from '@playwright/test';

import { SampleDashboardPage } from '../pages/sample-dashboard.page';
import { createSamplePayload } from '../utils/test-data';

type Fixtures = {
  sampleDashboardPage: SampleDashboardPage;
  samplePayload: ReturnType<typeof createSamplePayload>;
};

export const test = base.extend<Fixtures>({
  sampleDashboardPage: async ({ page }, use) => {
    await use(new SampleDashboardPage(page));
  },
  samplePayload: async ({}, use) => {
    await use(createSamplePayload());
  },
});

export { expect } from '@playwright/test';
