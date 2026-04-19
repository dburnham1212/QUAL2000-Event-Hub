import { test, expect } from '@playwright/test';
import { loginAsUser } from './utils/helper';

test.beforeEach(async ({ page }) => {
  await loginAsUser(page);
  await page.goto('/events/registrations/calendar');
});

test('Testing if we can navigate to the calendar page', async ({ page }) => {
  await expect(page.locator('body')).toContainText('Calendar view');
});

test('Testing if "Previous Month" button navigates to previous month', async ({ page }) => {
  await page.getByRole('link', { name: 'Previous Month' }).click();

  // Get last month name and year
  const date = new Date();
  date.setMonth(date.getMonth() - 1);

  const monthInfo = date.toLocaleString('default', { month: 'long', year: 'numeric' });
  await expect(page.locator('body')).toContainText(monthInfo);
});

test('Testing if "Next Month" button navigates to next month', async ({ page }) => {
  await page.getByRole('link', { name: 'Next Month' }).click();
  
  // Get next month name and year
  const date = new Date();
  date.setMonth(date.getMonth() + 1);

  const monthInfo = date.toLocaleString('default', { month: 'long', year: 'numeric' });
  await expect(page.locator('body')).toContainText(monthInfo);
});

test.fixme('BUG: Testing if "Current Month" button renavigates to current month', async ({ page }) => {
  await page.getByRole('link', { name: 'Previous Month' }).click();
  await page.getByRole('link', { name: 'Current Month' }).click();

  // Get next month name and year
  const date = new Date();
  date.setMonth(date.getMonth());

  const monthInfo = date.toLocaleString('default', { month: 'long', year: 'numeric' });

  await expect(page.locator('body')).toContainText(monthInfo);
});