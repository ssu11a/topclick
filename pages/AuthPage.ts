import { expect, Locator, Page } from '@playwright/test';

export class AuthPage {
  readonly page: Page;
  readonly loginInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginInput = this.page.getByPlaceholder('логин');
    this.passwordInput = this.page.getByPlaceholder('пароль');
    this.loginButton = this.page.getByRole('button', { name: 'Войти' });
  }

  async goto() {
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        await this.page.goto('/', { waitUntil: 'domcontentloaded' });
        return;
      } catch (error) {
        if (attempt === 2) {
          throw error;
        }
      }
    }
  }

  async login(login: string, password: string) {
    await expect(this.loginInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await this.loginInput.fill(login, { force: true });
    await this.passwordInput.fill(password, { force: true });
    await this.loginButton.click();
  }
}
