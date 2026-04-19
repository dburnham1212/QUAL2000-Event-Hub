import { test, expect } from '@playwright/test';

// ============ Events Page Testing ============
test('Testing if typing in /events to address bar shows the events page', async ({ page }) => {
  await page.goto('http://localhost:3000/events');
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Testing if navigating to a single event shows the event', async ({ page }) => {
  await page.goto('http://localhost:3000/events');
  await page.getByRole('link', { name: 'Music May 14, 2026 Kingston' }).click();
  await expect(page.locator('h1')).toContainText('Kingston Spring Music Festival');
});