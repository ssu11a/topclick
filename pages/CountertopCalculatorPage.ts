import { expect, Locator, Page } from '@playwright/test';

export class CountertopCalculatorPage {
  readonly page: Page;
  readonly hideCountertopToggle: Locator;
  readonly straightCountertopButton: Locator;
  readonly lShapedCountertopButton: Locator;
  readonly uShapedCountertopButton: Locator;
  readonly countertop: Locator;
  readonly orderBlock: Locator;
  readonly calcButton: Locator;
  readonly reportButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hideCountertopToggle = this.page.getByTestId('hide-countertop');
    this.straightCountertopButton = this.page.getByTestId('countertop-type-q');
    this.lShapedCountertopButton = this.page.getByTestId('countertop-type-l');
    this.uShapedCountertopButton = this.page.getByTestId('countertop-type-u');
    this.countertop = this.page.getByTestId('countertop');
    this.orderBlock = this.page.getByTestId('order-block');
    this.calcButton = this.page.getByTestId('calc-button');
    this.reportButton = this.page.getByTestId('open-report-button');
  }

  async goto() {
    await this.page.goto('/');
  }

  async waitForLoaded() {
    await expect(this.calcButton).toBeVisible();
  }

  async hideCountertop() {
    await this.hideCountertopToggle.click();
  }

  async selectUShapedCountertop() {
    await this.uShapedCountertopButton.click();
  }

  async selectThickness(value: '2' | '4') {
    const thickness = this.countertop.getByTestId('select-thickness');
    await thickness.getByRole('button').first().click();
    await thickness.getByRole('button', { name: value }).click();
  }

  async disablePlinth() {
    const plinthButton = this.page.getByTestId('top-button').filter({ hasText: 'Плинтус' });
    await plinthButton.click();
  }

  async addIsland() {
    await this.page
      .getByTestId('product-item')
      .filter({ has: this.page.getByRole('heading', { name: 'Остров' }) })
      .click();
  }

  async addWaterDrainGrooves() {
    await this.page
      .getByTestId('options-item')
      .filter({ has: this.page.getByRole('heading', { name: 'Проточки для стока воды' }) })
      .click();
  }

  async selectStone(name: string) {
    await this.page.getByTestId('stone-block').filter({ hasText: name }).click();
  }

  async buildUShapedOrder() {
    await this.selectUShapedCountertop();
    await this.selectThickness('4');
    await this.disablePlinth();
    await this.addIsland();
    await this.addWaterDrainGrooves();
    await this.selectStone('N-103 Gray Onix');
  }

  async calculate() {
    await this.calcButton.click();
    await expect(this.reportButton).toBeVisible();
  }

  async openCalculationReport(): Promise<Page> {
    const reportPagePromise = this.page.waitForEvent('popup');
    await this.reportButton.click();
    const reportPage = await reportPagePromise;
    await reportPage.waitForLoadState('domcontentloaded');
    return reportPage;
  }
}
