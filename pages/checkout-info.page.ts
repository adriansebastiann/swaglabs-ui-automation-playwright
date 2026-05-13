import { Page } from '@playwright/test';
import { BasePage } from 'playwright-test-core';

export class CheckoutInfoPage extends BasePage {
  private readonly firstNameInput = '#first-name';
  private readonly lastNameInput = '#last-name';
  private readonly postalCodeInput = '#postal-code';
  private readonly continueButton = '#continue';
  private readonly errorContainer = '.error-message-container';

  constructor(page: Page) {
    super(page);
  }

  async fillCheckoutInfo(firstName: string, lastName: string, zip: string): Promise<void> {
    await this.page.locator(this.firstNameInput).fill(firstName);
    await this.page.locator(this.lastNameInput).fill(lastName);
    await this.page.locator(this.postalCodeInput).fill(zip);
  }

  async continueCheckout(): Promise<void> {
    await this.page.locator(this.continueButton).click();
  }

  async isErrorDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.errorContainer);
  }

  async getErrorMessage(): Promise<string> {
    return await this.getText(this.errorContainer);
  }
}