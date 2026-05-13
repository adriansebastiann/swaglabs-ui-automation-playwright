import { test as coreTest, expect as coreExpect, Page } from '@playwright/test';

import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutInfoPage } from '../pages/checkout-info.page';
import { CheckoutOverviewPage } from '../pages/checkout-overview.page';
import { CheckoutCompletePage } from '../pages/checkout-complete.page';
import { CartIconComponent } from '../components/cart-icon.component';
import { loginAsStandardUser } from '../utils/test-flows';

type SwagLabsFixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutInfoPage: CheckoutInfoPage;
  checkoutOverviewPage: CheckoutOverviewPage;
  checkoutCompletePage: CheckoutCompletePage;
  cartIcon: CartIconComponent;
  authenticatedPage: ProductsPage;
};

export const test = coreTest.extend<SwagLabsFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutInfoPage: async ({ page }, use) => {
    await use(new CheckoutInfoPage(page));
  },
  checkoutOverviewPage: async ({ page }, use) => {
    await use(new CheckoutOverviewPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  cartIcon: async ({ page }, use) => {
    const cartIcon = new CartIconComponent(page.locator('#shopping_cart_container'));
    await use(cartIcon);
  },
  authenticatedPage: async ({ loginPage, productsPage }, use) => {
    await loginAsStandardUser(loginPage);
    await use(productsPage);
  }
});

export const expect = coreExpect;