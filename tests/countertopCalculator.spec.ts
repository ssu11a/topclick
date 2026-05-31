import { epic, feature, severity, step, story } from 'allure-js-commons';
import { test, expect } from '../fixtures/authFixture';
import { CountertopCalculatorPage } from '../pages/CountertopCalculatorPage';
import { CalculationReportPage } from '../pages/CalculationReportPage';

test('Переключатель "Скрыть столешницу" скрывает столешницу', async ({ authenticatedPage }) => {
  await epic('TopClick');
  await feature('Калькулятор столешниц');
  await story('Скрытие столешницы');
  await severity('normal');

  const calculatorPage = new CountertopCalculatorPage(authenticatedPage);

  await step('Включить переключатель "Скрыть столешницу"', async () => {
    await calculatorPage.hideCountertop();
  });

  await step('Проверить, что элементы столешницы скрыты', async () => {
    await expect(calculatorPage.countertop.getByText('Показать столешницу')).toBeVisible();
    await expect(calculatorPage.countertop.getByText('Толщина')).toBeHidden();
  });
});

test('Переключение на П-образную столешницу отображает П-образную столешницу', async ({ authenticatedPage }) => {
  await epic('TopClick');
  await feature('Калькулятор столешниц');
  await story('Выбор типа столешницы');
  await severity('normal');

  const calculatorPage = new CountertopCalculatorPage(authenticatedPage);

  await step('Выбрать П-образную столешницу', async () => {
    await calculatorPage.selectUShapedCountertop();
  });

  await step('Проверить отображение П-образной столешницы', async () => {
    await expect(calculatorPage.countertop.getByAltText('leftBottom')).toBeVisible();
    await expect(calculatorPage.countertop.getByAltText('rightBottom')).toBeVisible();
    await expect(calculatorPage.orderBlock.getByRole('heading', { name: 'П-образная столешница' })).toBeVisible();
  });
});

test('Сбор заказа с П-образной столешницей и проверка отчета расчета', async ({ authenticatedPage }) => {
  await epic('TopClick');
  await feature('Калькулятор столешниц');
  await story('Расчет заказа');
  await severity('critical');

  const calculatorPage = new CountertopCalculatorPage(authenticatedPage);

  await step('Собрать заказ с П-образной столешницей', async () => {
    await calculatorPage.buildUShapedOrder();
  });

  await step('Проверить состав заказа перед расчетом', async () => {
    await expect(calculatorPage.orderBlock).toContainText('Материал: Акрил Neomarm N-103 Gray Onix');
    await expect(calculatorPage.orderBlock).toContainText('Проточки для стока воды');
    await expect(calculatorPage.orderBlock).not.toContainText('С бортиком');
  });

  await step('Выполнить расчет и открыть отчет', async () => {
    await calculatorPage.calculate();
  });

  const reportPage = await calculatorPage.openCalculationReport();
  const calculationReportPage = new CalculationReportPage(reportPage);

  await step('Проверить страницу результатов расчета', async () => {
    await calculationReportPage.expectOpened();
    await calculationReportPage.expectCalculationResult();
  });
});
