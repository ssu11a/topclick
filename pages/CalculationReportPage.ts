import { expect, Page } from '@playwright/test';

export class CalculationReportPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async expectOpened() {
    await expect(this.page).toHaveTitle('Результаты расчета');
    await expect(this.page.getByRole('heading', { name: 'Результаты расчета' })).toBeVisible();
  }

  async expectCalculationResult() {
    await expect(this.page.getByRole('row', { name: /Материал\s+acryl:Neomarm:N-103 Gray Onix/ })).toBeVisible();
    await expect(this.page.getByRole('row', { name: /Тип столешницы\s+П-образная/ })).toBeVisible();
    await expect(this.page.getByRole('row', { name: /Опции\s+Проточки для стока воды/ })).toBeVisible();
    await expect(this.page.getByRole('row', { name: /Стоимость итоговая\s+367400\.00 ₽/ })).toBeVisible();
  }
}
