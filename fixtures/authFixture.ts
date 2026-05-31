import { test as base, expect, Page } from '@playwright/test';
import { AuthPage } from '../pages/AuthPage';
import { CountertopCalculatorPage } from '../pages/CountertopCalculatorPage';
import { login, password } from '../const/consts';

type TopclickFixtures = {
  authPage: AuthPage;
  calculatorPage: CountertopCalculatorPage;
  authenticatedPage: Page;
};

export const test = base.extend<TopclickFixtures>({
  authPage: async ({ page }, use) => {
    await use(new AuthPage(page));
  },

  calculatorPage: async ({ page }, use) => {
    await use(new CountertopCalculatorPage(page));
  },

  authenticatedPage: async ({ page }, use) => {
    const authPage = new AuthPage(page);
    const calculatorPage = new CountertopCalculatorPage(page);

    await authPage.goto();
    await authPage.login(login, password);
    await calculatorPage.waitForLoaded();

    await use(page);
  },
});

export { expect };
