import { test, expect } from '@playwright/test';

// ============ 404 testing ============
test('Testing if typing an invalid location returns the 404 page', async ({ page }) => {
  await page.goto('/abcdef');
  await expect(page.getByText('404 page')).toBeVisible();
});

test('Testing if typing an invalid event id returns the 404 page', async ({ page }) => {
  await page.goto('/events/abcdef');
  await expect(page.getByText('404 page')).toBeVisible();
});

test('Testing if "Return Home" button on 404 page returns to landing page', async ({ page }) => {
  await page.goto('/abcdef');
  await page.getByRole('link', { name: 'Return Home' }).click();
  await expect(page.getByRole('heading', { name: 'Event Hub' })).toBeVisible();
});

test('Testing if "Browse Events" button on 404 page takes you to the event directory', async ({ page }) => {
  await page.goto('/abcdef');
  await page.getByRole('link', { name: 'Browse Events' }).click();
  await expect(page.getByText('Public events directory')).toBeVisible();
});