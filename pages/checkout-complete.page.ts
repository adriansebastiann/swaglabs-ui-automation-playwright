import { Page } from '@playwright/test';
import { BasePage } from '@adriansebastiann/playwright-test-core';

export class CheckoutCompletePage extends BasePage {
  private readonly completeHeader = '.complete-header';
  private readonly backHomeButton = '#back-to-products';

  constructor(page: Page) {
    super(page);
  }

  async isOrderComplete(): Promise<boolean> {
    return await this.isElementVisible(this.completeHeader);
  }

  async getCompleteMessage(): Promise<string> {
    return await this.getText(this.completeHeader);
  }

  async backHome(): Promise<void> {
    await this.page.locator(this.backHomeButton).click();
  }
}