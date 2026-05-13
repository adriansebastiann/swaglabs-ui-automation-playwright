import { Page } from '@playwright/test';
import { BasePage, Logger } from '@adriansebastiann/playwright-test-core';

export class LoginPage extends BasePage {
  private readonly usernameSelector = '#user-name';
  private readonly passwordSelector = '#password';
  private readonly loginButtonSelector = '#login-button';
  private readonly errorSelector = 'h3[data-test="error"]';
  private logger: Logger;

  constructor(page: Page) {
    super(page);
    this.logger = new Logger('LoginPage');
  }

  async login(username: string, password: string): Promise<void> {
    this.logger.info(`Filling username field with value: ${username}`);
    await this.fillField(this.usernameSelector, username);
    
    this.logger.info('Filling password field');
    await this.fillField(this.passwordSelector, password);
    
    this.logger.info('Clicking login button');
    await this.click(this.loginButtonSelector);
    
    this.logger.info('Login action completed');
  }

  async getErrorMessage(): Promise<string> {
    this.logger.info('Retrieving error message');
    const error = await this.getText(this.errorSelector);
    this.logger.info(`Error message: ${error}`);
    return error;
  }

  async isErrorDisplayed(): Promise<boolean> {
    this.logger.info('Checking if error message is displayed');
    const visible = await this.isElementVisible(this.errorSelector);
    this.logger.info(`Error visible: ${visible}`);
    return visible;
  }
}