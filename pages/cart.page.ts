import { Page } from '@playwright/test';
import { BasePage } from '@adriansebastiann/playwright-test-core';
export class CartPage extends BasePage {
  private readonly cartItems = '.cart_item';
  private readonly continueShoppingButton = '[data-test="continue-shopping"]';
  private readonly checkoutButton = '[data-test="checkout"]';

  constructor(page: Page) {
    super(page);
  }

  async navigate(): Promise<void> {
    await this.page.goto('/cart.html');
  }

  async getCartItemCount(): Promise<number> {
    return await this.page.locator(this.cartItems).count();
  }

  async removeItem(index: number): Promise<void> {
    const removeButtons = this.page.locator('.cart_button');
    await removeButtons.nth(index).click();
  }

  async continueShopping(): Promise<void> {
    await this.page.locator(this.continueShoppingButton).click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.page.locator(this.checkoutButton).click();
  }
}