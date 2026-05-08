import { expect, test } from '../fixtures/test.fixture';

test('user can create, update, and delete a sample', async ({
  page,
  sampleDashboardPage,
  samplePayload,
}) => {
  await sampleDashboardPage.goto();
  await sampleDashboardPage.expectReady();

  await page.getByTestId('create-sample-button').click();

  await expect(page.getByRole('heading', { name: 'Register a New Sample' })).toBeVisible();

  await page.getByLabel(/Sample Name/).fill(samplePayload.sampleName);
  await page.getByLabel(/Scientist/).fill(samplePayload.scientist);
  await page.getByRole('button', { name: 'Save Sample' }).click();

  await sampleDashboardPage.expectReady();

  const sampleRow = page.getByRole('row', { name: new RegExp(samplePayload.sampleName) });

  await expect(sampleRow).toBeVisible();

  await sampleRow.getByRole('button', { name: 'Edit Status' }).click();
  await expect(page.getByTestId('edit-status-modal')).toBeVisible();
  await page.getByTestId('status-option-processing').click();
  await page.getByTestId('save-status-button').click();

  await expect(sampleRow.getByText('Processing')).toBeVisible();

  await sampleRow.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByTestId('delete-sample-modal')).toBeVisible();
  await page.getByRole('button', { name: 'Delete Sample' }).click();

  await expect(sampleRow).toHaveCount(0);
});
