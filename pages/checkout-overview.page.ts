import { Page } from '@playwright/test';
import { BasePage } from '@adriansebastiann/playwright-test-core';

export class CheckoutOverviewPage extends BasePage {
  private readonly finishButton = '#finish';
  private readonly totalLabel = '.summary_total_label';

  constructor(page: Page) {
    super(page);
  }

  async finishCheckout(): Promise<void> {
    await this.page.locator(this.finishButton).click();
  }

  async getTotal(): Promise<string> {
    return await this.getText(this.totalLabel);
  }
}