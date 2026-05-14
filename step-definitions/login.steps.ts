import { Given, When, Then, Before, After } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { expect } from '@playwright/test';
import { config as dotenvConfig } from 'dotenv';
import { resolve } from 'path';

dotenvConfig({ path: resolve(process.cwd(), '.env') });

import { LoginPage } from '../pages/login.page';
import { ProductsPage } from '../pages/products.page';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let productsPage: ProductsPage;

Before(async () => {
  browser = await chromium.launch();
  page = await browser.newPage();
  loginPage = new LoginPage(page);
  productsPage = new ProductsPage(page);
});

Given('I am on the login page', async () => {
  await loginPage.navigate();
});

When('I login with valid credentials', async () => {
  await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASS!);
});

When('I login with locked out credentials', async () => {
  await loginPage.login(process.env.LOCKED_USER!, process.env.LOCKED_PASS!);
});

When('I login with username {string} and password {string}', async (username: string, password: string) => {
  await loginPage.login(username, password);
});

Then('I should see the products page', async () => {
  await expect(productsPage.isTitleDisplayed()).resolves.toBeTruthy();
});

Then('I should see an error message containing {string}', async (text: string) => {
  await expect(loginPage.isErrorDisplayed()).resolves.toBeTruthy();
  await expect(loginPage.getErrorMessage()).resolves.toContain(text);
});

After(async () => {
  await browser.close();
});