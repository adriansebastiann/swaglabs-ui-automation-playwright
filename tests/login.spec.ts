import { test, expect } from '../fixtures/swaglabs-fixtures';

const VALID_USERS = [
  { username: process.env.STANDARD_USER!, password: process.env.STANDARD_PASS! },
  { username: process.env.LOCKED_USER!, password: process.env.LOCKED_PASS! }
];

test.describe('Login', () => {
  
  test('should login with valid credentials @smoke', async ({ loginPage, productsPage }) => {
    await loginPage.navigate();
    await loginPage.login(process.env.STANDARD_USER!, process.env.STANDARD_PASS!);
    expect(await productsPage.isTitleDisplayed()).toBeTruthy();
  });

  test('should show error for invalid credentials @regression', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('invalid', 'wrong');
    expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    const errorText = await loginPage.getErrorMessage();
    expect(errorText).toContain('Username and password do not match');
  });

  for (const user of VALID_USERS) {
    test(`should show error for ${user.username} @regression`, async ({ loginPage }) => {
      await loginPage.navigate();
      await loginPage.login(user.username, user.password);
      expect(await loginPage.isErrorDisplayed()).toBeTruthy();
    });
  }

  test('should login via fixture @smoke', async ({ authenticatedPage }) => {
    expect(await authenticatedPage.isTitleDisplayed()).toBeTruthy();
  });
});