import {Locator, Page} from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = this.page.getByPlaceholder('логин');
    this.passwordInput = this.page.getByPlaceholder('пароль');
    this.loginButton = this.page.getByText('логин');
  }

  async auth(login: string, password: string) {
    await this.loginInput.fill(login);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  } 
}