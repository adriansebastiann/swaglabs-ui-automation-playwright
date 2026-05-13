import { Page } from '@playwright/test';
import { BasePage } from '@adriansebastiann/playwright-test-core';

export class ProductsPage extends BasePage {
  private readonly titleSelector = '.title';
  private readonly sortDropdown = '.product_sort_container';
  private readonly productNames = '.inventory_item_name';
  private readonly addToCartButtons = '.btn_inventory';
  private readonly removeButtons = '.btn_secondary';

  constructor(page: Page) {
    super(page);
  }

  async isTitleDisplayed(): Promise<boolean> {
    return await this.isElementVisible(this.titleSelector);
  }

  async getTitleText(): Promise<string> {
    return await this.getText(this.titleSelector);
  }

  async sortBy(optionValue: string): Promise<void> {
    await this.page.locator(this.sortDropdown).selectOption(optionValue);
  }

  async getProductNames(): Promise<string[]> {
    return await this.page.locator(this.productNames).allInnerTexts();
  }

  async addProductToCart(productIndex: number): Promise<void> {
    const buttons = this.page.locator(this.addToCartButtons);
    await buttons.nth(productIndex).click();
  }

  async removeProduct(productIndex: number): Promise<void> {
    const buttons = this.page.locator(this.removeButtons);
    await buttons.nth(productIndex).click();
  }
}