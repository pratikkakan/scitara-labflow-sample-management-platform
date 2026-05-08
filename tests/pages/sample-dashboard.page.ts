import { expect, type Page } from '@playwright/test';

export class SampleDashboardPage {
  constructor(private readonly page: Page) {}

  async goto() {
    await this.page.goto('/samples');
  }

  async expectReady() {
    await expect(
      this.page.getByRole('heading', { name: 'Sample Management Overview' }),
    ).toBeVisible();
    await expect(this.page.getByTestId('sample-table')).toBeVisible();
  }

  async expectSeededSample(sampleName: string) {
    await expect(this.page.getByRole('cell', { name: sampleName })).toBeVisible();
  }

  async rowCount() {
    return this.page.getByTestId('sample-row').count();
  }
}
