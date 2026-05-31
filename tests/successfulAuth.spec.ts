import { login, password } from '../const/consts';
import { test, expect } from '../fixtures/authFixture';

test('Успешная авторизация', async ({ authPage, calculatorPage }) => {
  await authPage.goto();
  await authPage.login(login, password);

  await expect(calculatorPage.calcButton).toBeVisible();
});
