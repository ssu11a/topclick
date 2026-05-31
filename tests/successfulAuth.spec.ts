import { epic, feature, severity, step, story } from 'allure-js-commons';
import { login, password } from '../const/consts';
import { test, expect } from '../fixtures/authFixture';

test('Успешная авторизация', async ({ authPage, calculatorPage }) => {
  await epic('TopClick');
  await feature('Авторизация');
  await story('Пользователь входит в личный кабинет');
  await severity('critical');

  await step('Открыть стенд разработчика', async () => {
    await authPage.goto();
  });

  await step('Авторизоваться тестовым пользователем', async () => {
    await authPage.login(login, password);
  });

  await step('Проверить, что открылся калькулятор', async () => {
    await expect(calculatorPage.calcButton).toBeVisible();
  });
});
