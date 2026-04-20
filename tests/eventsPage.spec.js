import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await loginAsUser(page);
  await page.goto('/events');
});


// ============ Events Page Testing ============
test('Testing if typing in /events to address bar shows the events page', async ({ page }) => {
  await expect(page.locator('body')).toContainText('Public events directory');
});

test('Testing if navigating to a single event shows the event', async ({ page }) => {
  await page.getByRole('link', { name: 'Music May 14, 2026 Kingston' }).click();
  await expect(page.locator('h1')).toContainText('Kingston Spring Music Festival');
});