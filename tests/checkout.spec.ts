import { test, expect } from '../fixtures/swaglabs-fixtures';
import { faker } from '@faker-js/faker';

test.describe('Checkout', () => {
  test.beforeEach(async ({ authenticatedPage, productsPage, cartIcon, cartPage, checkoutInfoPage }) => {
    await productsPage.addProductToCart(0);
    await cartIcon.clickCartIcon();
    await cartPage.proceedToCheckout();
  });

  test('should complete checkout flow @smoke', async ({ checkoutInfoPage, checkoutOverviewPage, checkoutCompletePage, page }) => {
    await checkoutInfoPage.fillCheckoutInfo(faker.person.firstName(), faker.person.lastName(), faker.location.zipCode());
    await checkoutInfoPage.continueCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutOverviewPage.finishCheckout();
    expect(await checkoutCompletePage.isOrderComplete()).toBeTruthy();
  });

  test('should show error when missing first name @regression', async ({ checkoutInfoPage }) => {
    await checkoutInfoPage.fillCheckoutInfo('', 'Doe', '12345');
    await checkoutInfoPage.continueCheckout();
    expect(await checkoutInfoPage.isErrorDisplayed()).toBeTruthy();
  });
});