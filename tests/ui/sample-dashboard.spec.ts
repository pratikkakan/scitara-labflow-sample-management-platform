import { expect, test } from '../fixtures/test.fixture';

test('dashboard renders seeded sample data', async ({ sampleDashboardPage }) => {
  await sampleDashboardPage.goto();
  await sampleDashboardPage.expectReady();
  await sampleDashboardPage.expectSeededSample('Water Quality Control');

  expect(await sampleDashboardPage.rowCount()).toBeGreaterThanOrEqual(3);
});
