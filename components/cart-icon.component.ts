import { Locator } from '@playwright/test';
import { BaseComponent } from '@adriansebastiann/playwright-test-core';

export class CartIconComponent extends BaseComponent {
  private itemCountLocator: Locator;

  constructor(root: Locator) {
    super(root);
    this.itemCountLocator = root.locator('.shopping_cart_badge');
  }

  async getItemCount(): Promise<number> {
    if (!(await this.itemCountLocator.isVisible())) return 0;
    const text = await this.itemCountLocator.innerText();
    return text ? parseInt(text) : 0;
  }

  async clickCartIcon(): Promise<void> {
    await this.click();
  }
}