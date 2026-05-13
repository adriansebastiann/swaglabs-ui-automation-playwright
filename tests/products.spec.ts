import { test, expect } from '../fixtures/swaglabs-fixtures';

test.describe('Products Page', () => {
  test.beforeEach(async ({ authenticatedPage }) => {
    await expect(authenticatedPage.isTitleDisplayed()).resolves.toBeTruthy();
  });

  test('should sort products by name (A to Z)', async ({ authenticatedPage }) => {
    await authenticatedPage.sortBy('az');
    const names = await authenticatedPage.getProductNames();
    const sorted = [...names].sort();
    expect(names).toEqual(sorted);
  });

  test('should add product to cart and update cart icon', async ({ authenticatedPage, cartIcon }) => {
    expect(await cartIcon.getItemCount()).toBe(0);
    await authenticatedPage.addProductToCart(0);
    expect(await cartIcon.getItemCount()).toBe(1);
  });

  test('should remove product from cart from products page', async ({ authenticatedPage, cartIcon }) => {
    await authenticatedPage.addProductToCart(0);
    expect(await cartIcon.getItemCount()).toBe(1);
    await authenticatedPage.removeProduct(0);
    expect(await cartIcon.getItemCount()).toBe(0);
  });
});