import {Locator, Page} from '@playwright/test';

export class CountertopCalculatorPage {
  readonly page: Page;
  readonly hideCountertopToggle: Locator;
  readonly straightCountertopButton: Locator;
  readonly LShapedCountertop: Locator;
  readonly UShapedCountertop: Locator;
  readonly calcButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.hideCountertopToggle = this.page.getByAltText('toggle');
    this.straightCountertopButton = this.page.getByTestId('countertop-type-q');
    this.LShapedCountertop = this.page.getByTestId('countertop-type-l');
    this.UShapedCountertop = this.page.getByTestId('countertop-type-u');
    this.calcButton = this.page.getByTestId('calc-button');
  }
}