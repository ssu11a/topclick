import { test, expect } from '../fixtures/authFixture';
import { CountertopCalculatorPage } from '../pages/CountertopCalculatorPage';
import { CalculationReportPage } from '../pages/CalculationReportPage';

test('Переключатель "Скрыть столешницу" скрывает столешницу', async ({ authenticatedPage }) => {
  const calculatorPage = new CountertopCalculatorPage(authenticatedPage);

  await calculatorPage.hideCountertop();

  await expect(calculatorPage.countertop.getByText('Показать столешницу')).toBeVisible();
  await expect(calculatorPage.countertop.getByText('Толщина')).toBeHidden();
});

test('Переключение на П-образную столешницу отображает П-образную столешницу', async ({ authenticatedPage }) => {
  const calculatorPage = new CountertopCalculatorPage(authenticatedPage);

  await calculatorPage.selectUShapedCountertop();

  await expect(calculatorPage.countertop.getByAltText('leftBottom')).toBeVisible();
  await expect(calculatorPage.countertop.getByAltText('rightBottom')).toBeVisible();
  await expect(calculatorPage.orderBlock.getByRole('heading', { name: 'П-образная столешница' })).toBeVisible();
});

test('Сбор заказа с П-образной столешницей и проверка отчета расчета', async ({ authenticatedPage }) => {
  const calculatorPage = new CountertopCalculatorPage(authenticatedPage);

  await calculatorPage.buildUShapedOrder();
  await expect(calculatorPage.orderBlock).toContainText('Материал: Акрил Neomarm N-103 Gray Onix');
  await expect(calculatorPage.orderBlock).toContainText('Проточки для стока воды');
  await expect(calculatorPage.orderBlock).not.toContainText('С бортиком');

  await calculatorPage.calculate();
  const reportPage = await calculatorPage.openCalculationReport();
  const calculationReportPage = new CalculationReportPage(reportPage);

  await calculationReportPage.expectOpened();
  await calculationReportPage.expectCalculationResult();
});
