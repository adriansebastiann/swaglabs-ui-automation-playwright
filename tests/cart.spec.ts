import { test, expect } from '../fixtures/swaglabs-fixtures';

test.describe('Cart', () => {
  test.beforeEach(async ({ authenticatedPage, productsPage, cartPage, cartIcon }) => {
    await productsPage.addProductToCart(0);
    await productsPage.addProductToCart(2);
    await cartIcon.clickCartIcon();
    await expect(cartPage['page']).toHaveURL(/cart/);
  });

  test('should display added items', async ({ cartPage }) => {
    expect(await cartPage.getCartItemCount()).toBe(2);
  });

  test('should remove an item', async ({ cartPage, cartIcon }) => {
    await cartPage.removeItem(0);
    expect(await cartPage.getCartItemCount()).toBe(1);
    expect(await cartIcon.getItemCount()).toBe(1);
  });

  test('should continue shopping', async ({ cartPage, productsPage }) => {
    await cartPage.continueShopping();
    await expect(productsPage.isTitleDisplayed()).resolves.toBeTruthy();
  });
});